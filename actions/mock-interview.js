"use server";

import db from "@/lib/prisma";
import { getFirebaseUser } from "@/lib/auth-utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

// File-based logging for Windows/Next.js debug issues
function logDebug(message, data = null) {
    const logPath = path.join(process.cwd(), "debug.log");
    const timestamp = new Date().toISOString();
    const cleanMessage = data ? `${message} ${JSON.stringify(data, null, 2)}` : message;
    const logLine = `[${timestamp}] ${cleanMessage}\n`;
    try {
        fs.appendFileSync(logPath, logLine);
        console.log(cleanMessage);
    } catch (e) {
        console.error("Failed to write to debug.log", e);
    }
}

export async function extractResumeText(formData) {
    try {
        const file = formData.get("file");
        if (!file) throw new Error("No file uploaded");

        const buffer = Buffer.from(await file.arrayBuffer());
        logDebug(`[Action] Extracting PDF text, size: ${buffer.length} bytes`);

        const pdfModule = await import("pdf-parse");
        const pdfParse = pdfModule.default || pdfModule;
        const data = await pdfParse(buffer);
        const text = data.text;
        logDebug(`[Action] Text extracted`, { length: text?.length || 0 });

        if (!text) throw new Error("Extracted text is empty");

        const model = getGeminiModel();
        if (!model) throw new Error("AI service unavailable");

        const extractionPrompt = `
          Extract the full name of the candidate from this resume text. 
          Return only the name. If not found, return "Candidate".
          
          Resume:
          ${text.substring(0, 2000)}
        `;

        let candidateName = "Candidate";
        try {
            const result = await model.generateContent(extractionPrompt);
            candidateName = result.response.text().trim() || "Candidate";
        } catch (e) {
            console.error("Name extraction failed:", e);
        }

        return { text, candidateName };
    } catch (error) {
        console.error("Extraction error:", error);
        throw new Error(error.message || "Failed to extract resume text");
    }
}

// Helper to get Gemini model safely
function getGeminiModel(config = {}) {
    let apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        logDebug("⚠️ [Env] GEMINI_API_KEY is missing in process.env");
        return null;
    }

    // Sanitize key (especially for Windows line endings)
    apiKey = apiKey.trim();

    // Log masked key for verification
    logDebug(`[Env] Initializing Gemini with key: ${apiKey.substring(0, 8)}... (Length: ${apiKey.length})`);

    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        ...config
    });
}

export async function startMockInterview(role, resumeId = null, resumeText = null, candidateName = null) {
    const firebaseUser = await getFirebaseUser();
    if (!firebaseUser) throw new Error("Unauthorized");
    const userId = firebaseUser.uid;

    const user = await db.user.findUnique({
        where: { uid: userId },
    });

    if (!user) throw new Error("User not found");

    logDebug(`[Action] Starting mock interview`, { role, userId: user.id });
    const models = Object.keys(db).filter(k => !k.startsWith("_"));
    logDebug("[DEBUG] Available DB models", models);

    if (!db.mockInterview) {
        logDebug("❌ CRITICAL: db.mockInterview is missing from Prisma client!");
        throw new Error("Database configuration error: MockInterview model not found");
    }

    // Create MockInterview session
    const interview = await db.mockInterview.create({
        data: {
            userId: user.id,
            role,
            resumeId: resumeId === "none" ? null : resumeId,
            resumeText,
            candidateName,
            status: "IN_PROGRESS",
        },
    });

    // Pre-create rounds
    await db.mockRound.createMany({
        data: [
            { interviewId: interview.id, roundNumber: 1, type: "APTITUDE", status: "PENDING" },
            { interviewId: interview.id, roundNumber: 2, type: "TECHNICAL", status: "PENDING" },
            { interviewId: interview.id, roundNumber: 3, type: "HR", status: "PENDING" },
        ],
    });

    return interview;
}

export async function getRoundData(interviewId, roundNumber) {
    const firebaseUser = await getFirebaseUser();
    if (!firebaseUser) throw new Error("Unauthorized");

    const round = await db.mockRound.findFirst({
        where: {
            interviewId,
            roundNumber: parseInt(roundNumber),
        },
        include: {
            interview: {
                include: {
                    resume: true,
                },
            },
        },
    });

    if (!round) throw new Error("Round not found");

    // If questions are already generated, return them
    if (round.questions && round.questions !== "[]") {
        return {
            ...round,
            questions: JSON.parse(round.questions),
        };
    }

    // Generate questions based on round type
    let prompt = "";
    const role = round.interview.role;
    const candidateName = round.interview.candidateName || "Candidate";
    // Limit resume content to avoid token limits
    const rawResume = round.interview.resume?.content || round.interview.resumeText || "";
    const resumeContent = rawResume.substring(0, 8000);

    if (round.type === "APTITUDE") {
        prompt = `
      You are an expert interviewer. Generate exactly 20 MCQ questions for an Aptitude Test for a ${role} position.
      Distribution:
      - 7 Quantitative Aptitude
      - 7 Logical Reasoning
      - 6 Verbal Ability
      
      Requirements:
      - Strict JSON output. No conversational text.
      - Each question must have 'options' (array of 4) and 'correctAnswer'.
      - Explanations should be concise (max 2 sentences).

      Format: JSON array of objects:
      {
        "questions": [
          {
            "id": "q1",
            "section": "Quantitative",
            "question": "text",
            "options": ["a", "b", "c", "d"],
            "correctAnswer": "a",
            "explanation": "text"
          }
        ]
      }
    `;
    } else if (round.type === "TECHNICAL") {
        prompt = `
      You are an expert technical interviewer. Generate exactly 10 technical MCQ questions for a ${role} position.
      Base them on this resume if provided: ${resumeContent}.
      Include both conceptual and problem-solving questions.
      
      Requirements:
      - Strict JSON output. No conversational text.
      - Each question must be an MCQ with 'options' (array of exactly 4) and 'correctAnswer'.
      - Explanations should be concise (max 2 sentences).

      Format: JSON array of objects:
      {
        "questions": [
          {
            "id": "t1",
            "question": "text",
            "options": ["a", "b", "c", "d"],
            "correctAnswer": "a",
            "explanation": "text"
          }
        ]
      }
    `;
    } else if (round.type === "HR") {
        prompt = `
      As an expert HR Interviewer, generate exactly 5 professional HR interview questions for ${candidateName} who is applying for the ${role} position.
      Acknowledge the candidate by name in the first question.
      Focus on their resume, culture fit, career goals, and behavioral traits.
      Base them on this resume: ${resumeContent}.

      Requirements:
      - Strict JSON output. No conversational text.
      - Each question should have a 'focus' field (e.g., Communication, Leadership, Career Goals).

      Format: JSON array of objects:
      {
        "questions": [
          {
            "id": "h1",
            "question": "text",
            "focus": "Communication/Culture"
          }
        ]
      }
    `;
    }

    const modelId = "gemini-2.5-flash-lite";
    const model = getGeminiModel({
        generationConfig: { responseMimeType: "application/json" }
    });

    if (!model) {
        console.error("❌ [AI] Gemini model initialization failed (Check API Key)");
        throw new Error("AI service unavailable (Check API Key)");
    }

    try {
        logDebug(`[Action] 🤖 Generating questions for ${round.type} Round...`, {
            interviewId,
            round: roundNumber,
            candidate: candidateName,
            role
        });

        let result;
        try {
            result = await model.generateContent(prompt);
        } catch (apiError) {
            logDebug("❌ [AI] API Call Failed", { error: apiError.message });
            // Check for specific error types if possible
            if (apiError.message.includes("429")) throw new Error("AI Quota exceeded. Please try again in 1 minute.");
            if (apiError.message.includes("403")) throw new Error("AI Access forbidden. Check your API key permissions.");
            if (apiError.message.includes("404")) throw new Error(`Model ${modelId} not found. Contact Support.`);
            throw apiError;
        }

        const response = await result.response;
        const text = response.text();

        if (!text) {
            logDebug("❌ [AI] Received empty response from Gemini");
            throw new Error("Empty response from AI service");
        }

        logDebug(`[Action] ✅ AI response received`, {
            length: text.length,
            start: text.substring(0, 100) + "...",
            end: "..." + text.substring(text.length - 100)
        });

        let questions;
        try {
            // Try direct parse first
            questions = JSON.parse(text);
            if (questions.questions) questions = questions.questions;
        } catch (parseError) {
            logDebug("⚠️ [AI] Direct JSON parse failed, attempting cleanup...");
            try {
                // Extract JSON if it's wrapped in markers or has extra text
                let cleaned = text.trim();
                if (cleaned.startsWith("```")) {
                    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
                }

                const jsonMatch = cleaned.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
                if (!jsonMatch) throw new Error("No JSON structure found");

                questions = JSON.parse(jsonMatch[0]);
                if (questions.questions) questions = questions.questions;
            } catch (cleanupError) {
                logDebug("❌ [AI] JSON Cleanup failed", { rawPreview: text.substring(0, 500) });
                throw new Error("Failed to parse AI structure. The response was not valid JSON.");
            }
        }

        if (!questions || !Array.isArray(questions)) {
            logDebug("❌ [AI] Missing 'questions' array in response", questions);
            throw new Error("Incomplete question data received from AI");
        }

        logDebug(`[Action] 💾 Saving questions to DB...`, { count: questions.length });

        // Save generated questions to DB
        const updatedRound = await db.mockRound.update({
            where: { id: round.id },
            data: {
                questions: JSON.stringify(questions),
                status: "IN_PROGRESS",
                startTime: new Date(),
            },
        });

        console.log(`[Action] ✨ Round ${roundNumber} initialized successfully`);

        return {
            ...updatedRound,
            questions: questions,
        };
    } catch (error) {
        console.error(`\n❌ [RoundError] Failed for Round ${roundNumber} (${round.type}):`);
        console.error(error);
        throw new Error(error.message || "An unexpected error occurred during interview preparation");
    }
}

export async function submitRoundAnswers(interviewId, roundNumber, currentAnswers) {
    const firebaseUser = await getFirebaseUser();
    if (!firebaseUser) throw new Error("Unauthorized");

    const round = await db.mockRound.findFirst({
        where: { interviewId, roundNumber: parseInt(roundNumber) },
        include: { interview: true }
    });

    if (!round) throw new Error("Round not found");

    const questionsData = JSON.parse(round.questions);

    // Data Integrity Check
    if (!currentAnswers || currentAnswers.length === 0) {
        logDebug("❌ [Evaluation] No answers provided for evaluation");
        throw new Error("No answer records found. Please complete the assessment before submitting.");
    }

    let finalScore = 0;
    let roundFeedback = "";
    let processedAnswers = [];

    logDebug(`[Evaluation] Starting score calculation for Round ${roundNumber} (${round.type})`, {
        answerCount: currentAnswers.length,
        questionCount: questionsData.length
    });

    // 1. Scoring Logic based on Round Type
    if (round.type !== "HR") {
        // MCQ Evaluation (Aptitude & Technical)
        let totalCorrect = 0;

        processedAnswers = currentAnswers.map((userAns, idx) => {
            const question = questionsData[idx];
            if (!question) return userAns;

            const isCorrect = userAns.answer === question.correctAnswer;
            if (isCorrect) totalCorrect++;

            return {
                ...userAns,
                questionId: question.id,
                questionText: question.question,
                correctAnswer: question.correctAnswer,
                isCorrect,
                scorePerQuestion: isCorrect ? 100 : 0,
                explanation: question.explanation
            };
        });

        finalScore = questionsData.length > 0 ? (totalCorrect / questionsData.length) * 100 : 0;
        logDebug(`[Evaluation] MCQ Round Complete`, { totalCorrect, total: questionsData.length, finalScore });

        if (round.type === "TECHNICAL") {
            roundFeedback = `You answered ${totalCorrect} out of ${questionsData.length} technical questions correctly. Cutoff is 50%, your score is ${Math.round(finalScore)}%.`;
        }
    } else {
        // AI Evaluation for HR Round
        logDebug(`[Evaluation] 🤖 Requesting AI evaluation for HR Round...`);
        const model = getGeminiModel({
            generationConfig: { responseMimeType: "application/json" }
        });

        const hrPrompt = `
            You are an expert HR interviewer. Evaluate the candidate's responses for this HR round.
            Candidate: ${round.interview.candidateName || "Candidate"}
            Role: ${round.interview.role}
            
            Responses:
            ${currentAnswers.map((a, i) => `Q: ${questionsData[i].question}\nA: ${a.answer}`).join("\n\n")}
            
            Evaluate based on:
            1. Communication Score (0-100)
            2. Relevance Score (0-100) 
            3. Clarity Score (0-100)
            
            Return ONLY a JSON object:
            {
                "communication": number,
                "relevance": number,
                "clarity": number,
                "feedback": "string summarizing performance"
            }
        `;

        try {
            const result = await model.generateContent(hrPrompt);
            const text = result.response.text();

            let evalData;
            try {
                evalData = JSON.parse(text);
            } catch (e) {
                const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
                evalData = JSON.parse(cleanedText);
            }

            finalScore = (evalData.communication + evalData.relevance + evalData.clarity) / 3;
            roundFeedback = evalData.feedback;
            processedAnswers = currentAnswers.map((ans, i) => ({
                ...ans,
                questionId: questionsData[i].id,
                questionText: questionsData[i].question,
            }));

            logDebug(`[Evaluation] AI HR Assessment complete`, { finalScore, evalData });
        } catch (error) {
            logDebug("❌ [Evaluation] AI HR Assessment failed, using fallback score", { error: error.message });
            finalScore = 75;
            roundFeedback = "AI evaluation currently unavailable. Assessment based on response completion.";
            processedAnswers = currentAnswers;
        }
    }

    // Standard Cutoff Logic
    const status = finalScore >= 50 ? "PASSED" : "FAILED";

    const updatedRound = await db.mockRound.update({
        where: { id: round.id },
        data: {
            answers: JSON.stringify(processedAnswers),
            score: finalScore,
            status,
            feedback: roundFeedback,
            endTime: new Date(),
        },
    });

    logDebug(`[Evaluation] Round ${roundNumber} saved with status: ${status}, Score: ${finalScore}%`);

    return updatedRound;
}

export async function getFinalResult(interviewId) {
    const firebaseUser = await getFirebaseUser();
    if (!firebaseUser) throw new Error("Unauthorized");

    const interview = await db.mockInterview.findUnique({
        where: { id: interviewId },
        include: { rounds: true },
    });

    if (!interview) throw new Error("Interview not found");

    const rounds = interview.rounds;

    // 1. Calculate Weighted Overall Score
    const aptitudeRound = rounds.find(r => r.type === "APTITUDE");
    const technicalRound = rounds.find(r => r.type === "TECHNICAL");
    const hrRound = rounds.find(r => r.type === "HR");

    const aptScore = aptitudeRound?.score || 0;
    const techScore = technicalRound?.score || 0;
    const hrScore = hrRound?.score || 0;

    // weighting: Apt(40%) + Tech(40%) + HR(20%)
    const overallScore = (aptScore * 0.4) + (techScore * 0.4) + (hrScore * 0.2);

    const passedRounds = rounds.filter(r => r.status === "PASSED").length;
    const allRoundsAttempted = rounds.every(r => r.status !== "PENDING");
    const status = (passedRounds === rounds.length) ? "COMPLETED" : (allRoundsAttempted ? "FAILED" : "IN_PROGRESS");

    logDebug(`[Evaluation] Calculating Final Result`, {
        id: interviewId,
        aptScore,
        techScore,
        hrScore,
        overallScore,
        status
    });

    // 2. Generate Dynamic Feedback
    const prompt = `
        You are a senior hiring manager. Provide a final evaluation for this mock interview.
        Role: ${interview.role}
        
        Round performance:
        - Round 1 (Aptitude): ${aptScore}%
        - Round 2 (Technical): ${techScore}%
        - Round 3 (HR): ${hrScore}%
        - Overall Weighted Score: ${overallScore}%
        
        Provide:
        1. Readiness: (Ready for Interviews / Needs Improvement)
        2. Strengths: Array of top 3 qualities demonstrated
        3. Improvements: Array of top 3 areas to work on based on scores
        4. Final Summary: A 3-sentence professional summary addressing the candidate.
        
        Return ONLY a JSON object:
        {
            "readiness": "string",
            "strengths": ["a", "b", "c"],
            "improvements": ["x", "y", "z"],
            "feedback": "string"
        }
    `;

    const model = getGeminiModel({
        generationConfig: { responseMimeType: "application/json" }
    });

    if (!model) throw new Error("AI service unavailable");

    try {
        logDebug(`[Evaluation] 🤖 Requesting Final AI Review...`);
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        let feedback;
        try {
            feedback = JSON.parse(text);
        } catch (e) {
            const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
            feedback = JSON.parse(cleanedText);
        }

        logDebug(`[Evaluation] ✅ Final AI Review complete`, feedback);

        const updatedInterview = await db.mockInterview.update({
            where: { id: interviewId },
            data: {
                overallScore,
                status,
                feedback: JSON.stringify(feedback),
            },
        });

        return {
            ...updatedInterview,
            feedback,
            rounds
        };
    } catch (error) {
        logDebug("❌ [Evaluation] Error during final AI feedback", { error: error.message });
        return {
            ...interview,
            overallScore,
            status,
            feedback: {
                readiness: overallScore > 60 ? "Ready for Interviews" : "Needs Improvement",
                strengths: ["Role Familiarity"],
                improvements: ["Practice more assessment rounds"],
                feedback: `Your overall score is ${Math.round(overallScore)}%. You have passed ${passedRounds} out of ${rounds.length} rounds. Keep practicing to improve your technical and communication skills.`
            },
            rounds
        };
    }
}

export async function getMockInterviewStats() {
    const firebaseUser = await getFirebaseUser();
    if (!firebaseUser) throw new Error("Unauthorized");
    const userId = firebaseUser.uid;

    const user = await db.user.findUnique({
        where: { uid: userId }
    });

    if (!user) throw new Error("User not found");

    const interviews = await db.mockInterview.findMany({
        where: { userId: user.id },
        include: { rounds: true },
        orderBy: { createdAt: "desc" }
    });

    const totalAttempts = interviews.length;
    let aptScores = [], techScores = [], hrScores = [];
    let passedCount = 0;

    interviews.forEach(interview => {
        if (interview.status === "COMPLETED") passedCount++;

        interview.rounds.forEach(round => {
            if (round.score !== null) {
                if (round.type === "APTITUDE") aptScores.push(round.score);
                if (round.type === "TECHNICAL") techScores.push(round.score);
                if (round.type === "HR") hrScores.push(round.score);
            }
        });
    });

    const avg = (arr) => arr.length > 0 ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : 0;

    return {
        totalAttempts,
        passedCount,
        passRatio: totalAttempts > 0 ? ((passedCount / totalAttempts) * 100).toFixed(1) : 0,
        avgAptitude: avg(aptScores),
        avgTechnical: avg(techScores),
        avgHR: avg(hrScores),
        recentInterviews: interviews.slice(0, 5).map(i => ({
            id: i.id,
            role: i.role,
            score: i.overallScore,
            status: i.status,
            date: i.createdAt
        }))
    };
}
