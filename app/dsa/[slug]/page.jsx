import { getQuestion } from "@/actions/dsa";
import { notFound } from "next/navigation";
import ProblemInterface from "./_components/problem-interface";

export async function generateMetadata({ params }) {
    const slug = (await params).slug;
    const question = await getQuestion(slug);

    if (!question) return { title: "Question Not Found" };

    return {
        title: `${question.title} - DSA Practice`,
        description: `Solve the problem: ${question.title}. Category: ${question.category}. Difficulty: ${question.difficulty}.`
    };
}

export default async function ProblemDetailPage({ params }) {
    const slug = (await params).slug;
    const question = await getQuestion(slug);

    if (!question) {
        notFound();
    }

    return (
        <div className="h-[calc(100vh-65px)] overflow-hidden">
            <ProblemInterface question={question} />
        </div>
    );
}
