"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Code, FileText, Settings, FlaskConical } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createQuestion, updateQuestion } from "@/actions/dsa";
import MDEditor from "@uiw/react-md-editor";

const questionSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
    category: z.string().optional(),
    tags: z.string().optional(), // We'll split this by comma
    constraints: z.string().optional(),
    inputFormat: z.string().optional(),
    outputFormat: z.string().optional(),
    starterCode: z.object({
        cpp: z.string(),
        java: z.string(),
        python: z.string(),
    }),
    testCases: z.array(z.object({
        input: z.string().min(1, "Input is required"),
        expectedOutput: z.string().min(1, "Expected output is required"),
        isHidden: z.boolean().default(true),
        explanation: z.string().optional(),
    })).min(1, "At least one test case is required"),
});

export default function QuestionForm({ initialData = null }) {
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);

    const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        resolver: zodResolver(questionSchema),
        defaultValues: initialData ? {
            ...initialData,
            tags: initialData.tags?.join(", "),
            starterCode: typeof initialData.starterCode === "string" ? JSON.parse(initialData.starterCode) : initialData.starterCode
        } : {
            title: "",
            description: "## Problem Statement\n\nWrite your problem description here using Markdown.\n\n### Example 1\n**Input:** nums = [1,2,3]\n**Output:** [3,2,1]",
            difficulty: "EASY",
            category: "",
            tags: "",
            constraints: "- 1 <= nums.length <= 10^5",
            inputFormat: "An array of integers nums.",
            outputFormat: "The reversed array.",
            starterCode: {
                cpp: "class Solution {\npublic:\n    vector<int> solve(vector<int>& nums) {\n        \n    }\n};",
                java: "class Solution {\n    public int[] solve(int[] nums) {\n        \n    }\n}",
                python: "class Solution:\n    def solve(self, nums: List[int]) -> List[int]:\n        pass",
            },
            testCases: [{ input: "", expectedOutput: "", isHidden: true, explanation: "" }],
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "testCases",
    });

    const onSubmit = async (data) => {
        setIsSaving(true);
        try {
            const formattedData = {
                ...data,
                tags: data.tags ? data.tags.split(",").map(t => t.trim()) : [],
            };

            if (initialData?.id) {
                await updateQuestion(initialData.id, formattedData);
                toast.success("Question updated successfully!");
            } else {
                await createQuestion(formattedData);
                toast.success("Question created successfully!");
            }
            router.push("/admin/questions");
            router.refresh();
        } catch (error) {
            toast.error(error.message || "Failed to save question");
        } finally {
            setIsSaving(false);
        }
    };

    const description = watch("description");

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 pb-20">
            <div className="flex justify-between items-center bg-background/95 backdrop-blur sticky top-0 z-10 py-4 border-b">
                <div>
                    <h2 className="text-2xl font-bold">{initialData ? "Edit Question" : "New Question"}</h2>
                    <p className="text-sm text-muted-foreground">Define your DSA problem and test cases.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" disabled={isSaving}>
                        {isSaving ? "Saving..." : (initialData ? "Update Question" : "Create Question")}
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="basics" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="basics"><FileText className="mr-2 h-4 w-4" /> Description</TabsTrigger>
                    <TabsTrigger value="starter-code"><Code className="mr-2 h-4 w-4" /> Starter Code</TabsTrigger>
                    <TabsTrigger value="test-cases"><FlaskConical className="mr-2 h-4 w-4" /> Test Cases</TabsTrigger>
                    <TabsTrigger value="settings"><Settings className="mr-2 h-4 w-4" /> Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="basics" className="space-y-4 pt-4">
                    <Card>
                        <CardHeader><CardTitle>Problem Description</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Question Title</label>
                                <Input {...register("title")} placeholder="e.g. Reverse an Array" />
                                {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                            </div>
                            <div className="space-y-2" data-color-mode="light">
                                <label className="text-sm font-medium">Description (Markdown)</label>
                                <MDEditor
                                    value={description}
                                    onChange={(val) => setValue("description", val || "")}
                                    height={400}
                                    preview="edit"
                                />
                                {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader><CardTitle>Input/Output Details</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Input Format</label>
                                    <Textarea {...register("inputFormat")} placeholder="e.g. n integers..." />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Output Format</label>
                                    <Textarea {...register("outputFormat")} placeholder="e.g. Reversed array..." />
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Constraints</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Rules & Limits</label>
                                    <Textarea {...register("constraints")} rows={5} placeholder="- 1 <= nums.length <= 10^5" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="starter-code" className="space-y-4 pt-4">
                    <Card>
                        <CardHeader><CardTitle>Default Template Code</CardTitle></CardHeader>
                        <CardContent>
                            <Tabs defaultValue="python">
                                <TabsList>
                                    <TabsTrigger value="cpp">C++</TabsTrigger>
                                    <TabsTrigger value="java">Java</TabsTrigger>
                                    <TabsTrigger value="python">Python</TabsTrigger>
                                </TabsList>
                                <TabsContent value="cpp" className="pt-2">
                                    <Textarea {...register("starterCode.cpp")} rows={15} className="font-mono bg-muted" />
                                </TabsContent>
                                <TabsContent value="java" className="pt-2">
                                    <Textarea {...register("starterCode.java")} rows={15} className="font-mono bg-muted" />
                                </TabsContent>
                                <TabsContent value="python" className="pt-2">
                                    <Textarea {...register("starterCode.python")} rows={15} className="font-mono bg-muted" />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="test-cases" className="space-y-4 pt-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Validation Sets</h3>
                        <Button type="button" size="sm" onClick={() => append({ input: "", expectedOutput: "", isHidden: true })}>
                            <Plus className="mr-2 h-4 w-4" /> Add Test Case
                        </Button>
                    </div>

                    <div className="grid gap-4">
                        {fields.map((item, index) => (
                            <Card key={item.id} className={fields[index].isHidden ? "" : "border-primary/50 shadow-sm"}>
                                <CardHeader className="py-3 flex flex-row items-center justify-between">
                                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                                        Test Case #{index + 1}
                                        {!fields[index].isHidden && <Badge variant="secondary">Sample</Badge>}
                                    </CardTitle>
                                    <Button variant="ghost" size="sm" className="text-destructive" onClick={() => remove(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </CardHeader>
                                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase">Input</label>
                                        <Textarea {...register(`testCases.${index}.input`)} rows={2} className="font-mono text-xs" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium uppercase">Expected Output</label>
                                        <Textarea {...register(`testCases.${index}.expectedOutput`)} rows={2} className="font-mono text-xs" />
                                    </div>
                                    <div className="flex items-center gap-2 md:col-span-2">
                                        <input
                                            type="checkbox"
                                            {...register(`testCases.${index}.isHidden`)}
                                            id={`hidden-${index}`}
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <label htmlFor={`hidden-${index}`} className="text-sm">Hidden from users (private test case)</label>
                                    </div>
                                    {!fields[index].isHidden && (
                                        <div className="md:col-span-2 space-y-1">
                                            <label className="text-xs font-medium uppercase">Explanation (Optional)</label>
                                            <Input {...register(`testCases.${index}.explanation`)} placeholder="Why is this the expected output?" />
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="settings" className="pt-4">
                    <Card>
                        <CardHeader><CardTitle>Publication Settings</CardTitle></CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Difficulty</label>
                                    <Select
                                        defaultValue={initialData?.difficulty || "EASY"}
                                        onValueChange={(val) => setValue("difficulty", val)}
                                    >
                                        <SelectTrigger><SelectValue /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="EASY">Easy</SelectItem>
                                            <SelectItem value="MEDIUM">Medium</SelectItem>
                                            <SelectItem value="HARD">Hard</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <Input {...register("category")} placeholder="e.g. Algorithms" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Topics / Tags (Comma separated)</label>
                                <Input {...register("tags")} placeholder="Strings, Array, Two Pointers" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </form>
    );
}
