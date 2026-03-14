"use client";

import Editor from "@monaco-editor/react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTheme } from "next-themes";

const LANGUAGES = [
    { label: "C++", value: "cpp", monaco: "cpp" },
    { label: "Java", value: "java", monaco: "java" },
    { label: "Python", value: "python", monaco: "python" },
];

export default function CodeEditor({
    language,
    onLanguageChange,
    value,
    onChange,
    theme = "vs-dark"
}) {
    const { theme: activeTheme } = useTheme();

    return (
        <div className="h-full flex flex-col">
            <div className="flex items-center justify-between p-2 border-b bg-muted/20">
                <Select value={language} onValueChange={onLanguageChange}>
                    <SelectTrigger className="w-[120px] h-8 bg-background">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {LANGUAGES.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                                {lang.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <div className="flex items-center gap-2 px-2">
                    <span className="text-[10px] uppercase font-bold text-muted-foreground mr-2">Editor Settings</span>
                </div>
            </div>

            <div className="flex-1 overflow-hidden">
                <Editor
                    height="100%"
                    language={LANGUAGES.find(l => l.value === language)?.monaco || "python"}
                    value={value}
                    theme={activeTheme === "dark" ? "vs-dark" : "light"}
                    onChange={onChange}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: "on",
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 4,
                        padding: { top: 16 }
                    }}
                />
            </div>
        </div>
    );
}
