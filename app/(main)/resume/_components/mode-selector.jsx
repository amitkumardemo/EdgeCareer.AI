"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit3, Sparkles } from "lucide-react";

export default function ModeSelector({ mode, onModeChange }) {
  return (
    <Card className="border-2">
      <CardContent className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold mb-2">Choose How to Build Your Resume</h3>
          <p className="text-sm text-muted-foreground">
            Select your preferred method to create an ATS-optimized one-page resume
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Manual Mode */}
          <button
            type="button"
            onClick={() => onModeChange("manual")}
            className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${
              mode === "manual"
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border hover:border-primary/50"
            }`}
            suppressHydrationWarning
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className={`p-3 rounded-full ${
                mode === "manual" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                <Edit3 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Build Manually</h4>
                <p className="text-sm text-muted-foreground">
                  Fill out structured forms with your information
                </p>
              </div>
              {mode === "manual" && (
                <div className="text-xs text-primary font-medium">
                  ✓ Currently Selected
                </div>
              )}
            </div>
          </button>

          {/* AI Mode */}
          <button
            type="button"
            onClick={() => onModeChange("ai")}
            className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${
              mode === "ai"
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border hover:border-primary/50"
            }`}
            suppressHydrationWarning
          >
            <div className="flex flex-col items-center text-center gap-3">
              <div className={`p-3 rounded-full ${
                mode === "ai" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Build with AI</h4>
                <p className="text-sm text-muted-foreground">
                  Auto-generate from job description and existing resume
                </p>
              </div>
              {mode === "ai" && (
                <div className="text-xs text-primary font-medium">
                  ✓ Currently Selected
                </div>
              )}
            </div>
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
