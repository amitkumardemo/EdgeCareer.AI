import db from "@/lib/prisma";
import QuestionForm from "../_components/question-form";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditQuestionPage({ params }) {
    const id = (await params).id;

    let question = null;
    try {
        question = await db.question.findUnique({
            where: { id },
            include: { testCases: true }
        });
    } catch (err) {
        console.error("EditQuestionPage query failed:", err);
    }

    if (!question) {
        notFound();
    }

    return (
        <div className="container mx-auto py-8">
            <QuestionForm initialData={question} />
        </div>
    );
}
