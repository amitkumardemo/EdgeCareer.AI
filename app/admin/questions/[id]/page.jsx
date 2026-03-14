import db from "@/lib/prisma";
import QuestionForm from "../_components/question-form";
import { notFound } from "next/navigation";

export default async function EditQuestionPage({ params }) {
    const id = (await params).id;

    const question = await db.question.findUnique({
        where: { id },
        include: { testCases: true }
    });

    if (!question) {
        notFound();
    }

    return (
        <div className="container mx-auto py-8">
            <QuestionForm initialData={question} />
        </div>
    );
}
