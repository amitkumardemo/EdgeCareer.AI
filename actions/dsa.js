"use server";

import db from "@/lib/prisma";
import { getFirebaseUser } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";

/**
 * Helper to verify Admin context
 */
async function checkAdmin() {
    const firebaseUser = await getFirebaseUser();
    if (!firebaseUser) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where: { uid: firebaseUser.uid },
        select: { role: true }
    });

    if (user?.role !== "ADMIN") {
        throw new Error("Admin privileges required");
    }
    return firebaseUser.uid;
}

/**
 * Slugify a string
 */
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")     // Replace spaces with -
        .replace(/[^\w-]+/g, "")    // Remove all non-word chars
        .replace(/--+/g, "-");    // Replace multiple - with single -
}

/**
 * ADMIN: Get all questions
 */
export async function getAdminQuestions() {
    if (!db.question) {
        throw new Error("Prisma Client out of sync: 'Question' model not found. Please stop 'npm run dev' and run 'npx prisma generate'.");
    }
    await checkAdmin();

    return await db.question.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            _count: {
                select: { submissions: true }
            }
        }
    });
}

/**
 * ADMIN: Create a new question
 */
export async function createQuestion(data) {
    if (!db.question) {
        throw new Error("Prisma Client out of sync: 'Question' model not found. Please stop 'npm run dev' and run 'npx prisma generate'.");
    }
    await checkAdmin();

    const { title, description, difficulty, category, tags, constraints, inputFormat, outputFormat, starterCode, testCases } = data;

    const slug = slugify(title);

    const question = await db.question.create({
        data: {
            title,
            slug,
            description,
            difficulty,
            category,
            tags,
            constraints,
            inputFormat,
            outputFormat,
            starterCode: JSON.stringify(starterCode),
            testCases: {
                create: testCases.map(tc => ({
                    input: tc.input,
                    expectedOutput: tc.expectedOutput,
                    isHidden: tc.isHidden ?? true,
                    explanation: tc.explanation
                }))
            }
        }
    });

    revalidatePath("/admin/questions");
    revalidatePath("/dsa");
    return question;
}

/**
 * ADMIN: Update a question
 */
export async function updateQuestion(id, data) {
    if (!db.question) {
        throw new Error("Prisma Client out of sync: 'Question' model not found. Please stop 'npm run dev' and run 'npx prisma generate'.");
    }
    await checkAdmin();

    const { title, description, difficulty, category, tags, constraints, inputFormat, outputFormat, starterCode, published, testCases } = data;

    // Transaction to update question and replace test cases
    const updatedQuestion = await db.$transaction(async (tx) => {
        // Delete old test cases
        if (testCases) {
            await tx.testCase.deleteMany({ where: { questionId: id } });
        }

        return await tx.question.update({
            where: { id },
            data: {
                ...(title && { title, slug: slugify(title) }),
                ...(description && { description }),
                ...(difficulty && { difficulty }),
                ...(category && { category }),
                ...(tags && { tags }),
                ...(constraints && { constraints }),
                ...(inputFormat && { inputFormat }),
                ...(outputFormat && { outputFormat }),
                ...(starterCode && { starterCode: JSON.stringify(starterCode) }),
                ...(published !== undefined && { published }),
                ...(testCases && {
                    testCases: {
                        create: testCases.map(tc => ({
                            input: tc.input,
                            expectedOutput: tc.expectedOutput,
                            isHidden: tc.isHidden ?? true,
                            explanation: tc.explanation
                        }))
                    }
                })
            }
        });
    });

    revalidatePath("/admin/questions");
    revalidatePath(`/dsa/${updatedQuestion.slug}`);
    revalidatePath("/dsa");
    return updatedQuestion;
}

/**
 * ADMIN: Delete a question
 */
export async function deleteQuestion(id) {
    await checkAdmin();

    await db.question.delete({
        where: { id }
    });

    revalidatePath("/admin/questions");
    revalidatePath("/dsa");
    return { success: true };
}

/**
 * STUDENT: Get published questions
 */
export async function getQuestions() {
    if (!db.question) {
        throw new Error("Prisma Client out of sync: 'Question' model not found. Please stop 'npm run dev' and run 'npx prisma generate'.");
    }
    return await db.question.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            title: true,
            slug: true,
            difficulty: true,
            category: true,
            tags: true,
        }
    });
}

/**
 * STUDENT: Get question detail by slug
 */
export async function getQuestion(slug) {
    if (!db.question) {
        throw new Error("Prisma Client out of sync: 'Question' model not found. Please stop 'npm run dev' and run 'npx prisma generate'.");
    }
    const question = await db.question.findUnique({
        where: { slug, published: true },
        include: {
            testCases: {
                where: { isHidden: false } // Only return sample test cases to public
            }
        }
    });

    if (!question) return null;

    return {
        ...question,
        starterCode: JSON.parse(question.starterCode)
    };
}

/**
 * Common logic for executing code via Judge0
 */
async function executeOnJudge0(sourceCode, languageId, stdin) {
    const JUDGE0_URL = process.env.JUDGE0_URL || "https://judge0-ce.p.rapidapi.com";
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': process.env.RAPIDAPI_KEY,
            'x-rapidapi-host': process.env.RAPIDAPI_HOST || 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            source_code: Buffer.from(sourceCode).toString('base64'),
            language_id: languageId,
            stdin: Buffer.from(stdin || "").toString('base64'),
            base64_encoded: true,
        })
    };

    const response = await fetch(`${JUDGE0_URL}/submissions?base64_encoded=true&wait=false`, options);
    const { token } = await response.json();

    if (!token) throw new Error("Failed to get submission token from Judge0");

    // Polling for result
    let result = null;
    for (let i = 0; i < 10; i++) { // Poll 10 times max
        await new Promise(resolve => setTimeout(resolve, 1000));
        const statusRes = await fetch(`${JUDGE0_URL}/submissions/${token}?base64_encoded=true`, {
            headers: options.headers
        });
        result = await statusRes.json();

        // Status ids: 1: In Queue, 2: Processing, 3: Accepted, others are errors
        if (result.status.id > 2) break;
    }

    return result;
}

const LANGUAGE_MAPPING = {
    "cpp": 54,
    "java": 62,
    "python": 71
};

/**
 * STUDENT: Run code against sample test cases
 */
export async function runCode(questionId, language, code) {
    if (!db.question) {
        throw new Error("Prisma Client out of sync: 'Question' model not found. Please stop 'npm run dev' and run 'npx prisma generate'.");
    }
    const firebaseUser = await getFirebaseUser();
    if (!firebaseUser) throw new Error("Unauthorized");

    const question = await db.question.findUnique({
        where: { id: questionId },
        include: { testCases: { where: { isHidden: false } } }
    });

    if (!question) throw new Error("Question not found");

    const results = [];
    for (const tc of question.testCases) {
        const output = await executeOnJudge0(code, LANGUAGE_MAPPING[language], tc.input);

        // Decode results
        const stdout = output.stdout ? Buffer.from(output.stdout, 'base64').toString() : "";
        const stderr = output.stderr ? Buffer.from(output.stderr, 'base64').toString() : "";
        const compile_output = output.compile_output ? Buffer.from(output.compile_output, 'base64').toString() : "";

        results.push({
            input: tc.input,
            expectedOutput: tc.expectedOutput,
            actualOutput: stdout.trim(),
            error: stderr || compile_output,
            status: output.status.description,
            time: output.time,
            memory: output.memory
        });
    }

    return results;
}

/**
 * STUDENT: Submit solution against all test cases
 */
export async function submitSolution(questionId, language, code) {
    const firebaseUser = await getFirebaseUser();
    if (!firebaseUser) throw new Error("Unauthorized");
    const userId = firebaseUser.uid;

    const user = await db.user.findUnique({ where: { uid: userId } });
    if (!user) throw new Error("User not found");

    const question = await db.question.findUnique({
        where: { id: questionId },
        include: { testCases: true }
    });

    if (!question) throw new Error("Question not found");

    let passed = 0;
    let finalStatus = "ACCEPTED";
    let firstError = null;
    let totalRuntime = 0;
    let maxMemory = 0;

    for (const tc of question.testCases) {
        const output = await executeOnJudge0(code, LANGUAGE_MAPPING[language], tc.input);

        const stdout = output.stdout ? Buffer.from(output.stdout, 'base64').toString().trim() : "";
        const status = output.status.description;

        totalRuntime += parseFloat(output.time || 0);
        maxMemory = Math.max(maxMemory, parseInt(output.memory || 0));

        if (status === "Accepted") {
            if (stdout === tc.expectedOutput.trim()) {
                passed++;
            } else {
                finalStatus = "WRONG ANSWER";
                if (!firstError) firstError = `Wrong Answer on test case: ${tc.input}`;
                break;
            }
        } else {
            finalStatus = status.toUpperCase();
            if (!firstError) firstError = output.compile_output ? Buffer.from(output.compile_output, 'base64').toString() : (output.stderr ? Buffer.from(output.stderr, 'base64').toString() : status);
            break;
        }
    }

    // Atomic transaction for submission and gamification
    const submission = await db.$transaction(async (tx) => {
        // Award points if accepted and first time solving this question
        if (finalStatus === "ACCEPTED") {
            const previousAccepted = await tx.submission.findFirst({
                where: { userId: user.id, questionId, status: "ACCEPTED" }
            });

            if (!previousAccepted) {
                const pointMap = { EASY: 10, MEDIUM: 20, HARD: 50 };
                const pointsToAward = pointMap[question.difficulty] || 10;

                await tx.user.update({
                    where: { id: user.id },
                    data: {
                        points: { increment: pointsToAward }
                    }
                });
            }
        }

        // Create submission record
        return await tx.submission.create({
            data: {
                userId: user.id,
                questionId,
                language,
                code,
                status: finalStatus,
                verdict: firstError,
                runtime: totalRuntime / question.testCases.length,
                memory: maxMemory,
                testCasesPassed: passed,
                totalTestCases: question.testCases.length
            }
        });
    });

    revalidatePath(`/dsa/${question.slug}`);
    revalidatePath("/dsa");
    return submission;
}

/**
 * STUDENT: Get user's submission history for a specific question
 */
export async function getUserSubmissions(questionId) {
    const firebaseUser = await getFirebaseUser();
    if (!firebaseUser) throw new Error("Unauthorized");
    const userId = firebaseUser.uid;

    const user = await db.user.findUnique({ where: { uid: userId } });
    if (!user) throw new Error("User not found");

    return await db.submission.findMany({
        where: { userId: user.id, questionId },
        orderBy: { createdAt: "desc" },
        take: 10
    });
}

/**
 * STUDENT: Get user's overall DSA progress
 */
export async function getUserDSAProgress() {
    const firebaseUser = await getFirebaseUser();
    if (!firebaseUser) return null;
    const userId = firebaseUser.uid;

    const user = await db.user.findUnique({
        where: { uid: userId },
        include: {
            submissions: {
                where: { status: "ACCEPTED" },
                select: { questionId: true }
            }
        }
    });

    if (!user) return null;

    const solvedQuestionIds = new Set(user.submissions.map(s => s.questionId));

    return {
        solvedCount: solvedQuestionIds.size,
        solvedIds: Array.from(solvedQuestionIds)
    };
}
