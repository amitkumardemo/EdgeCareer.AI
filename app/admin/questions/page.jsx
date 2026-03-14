import { getAdminQuestions } from "@/actions/dsa";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Plus, Edit, Globe, Trash2, Eye } from "lucide-react";

export default async function AdminQuestionsPage() {
    const questions = await getAdminQuestions();

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-bold gradient-title">DSA Admin Panel</h1>
                    <p className="text-muted-foreground">Manage coding questions and test cases.</p>
                </div>
                <Link href="/admin/questions/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Question
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Questions ({questions.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative overflow-x-auto border rounded-lg">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs uppercase bg-muted/50">
                                <tr>
                                    <th className="px-6 py-3">Title</th>
                                    <th className="px-6 py-3">Difficulty</th>
                                    <th className="px-6 py-3">Category</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3">Submissions</th>
                                    <th className="px-6 py-3 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-muted-foreground">
                                            No questions found. Create your first one!
                                        </td>
                                    </tr>
                                ) : (
                                    questions.map((q) => (
                                        <tr key={q.id} className="border-t hover:bg-muted/30 transition-colors">
                                            <td className="px-6 py-4 font-medium">{q.title}</td>
                                            <td className="px-6 py-4">
                                                <Badge variant={q.difficulty === 'HARD' ? 'destructive' : q.difficulty === 'MEDIUM' ? 'default' : 'secondary'}>
                                                    {q.difficulty}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4">{q.category || "-"}</td>
                                            <td className="px-6 py-4">
                                                {q.published ? (
                                                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                                        <Globe className="mr-1 h-3 w-3" /> Published
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline">Draft</Badge>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">{q._count.submissions}</td>
                                            <td className="px-6 py-4 text-right space-x-2">
                                                <Link href={`/dsa/${q.slug}`} target="_blank">
                                                    <Button variant="ghost" size="icon">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/questions/${q.id}`}>
                                                    <Button variant="ghost" size="icon">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" className="text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
