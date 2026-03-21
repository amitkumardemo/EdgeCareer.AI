"use client";

import React, { useState } from "react";
import { 
  Rocket, 
  Sparkles, 
  AlertCircle, 
  Loader2, 
  CheckCircle, 
  Copy
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProjectBulletsModal({ open, onOpenChange, onCopy, copied }) {
  const [projectDescription, setProjectDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!projectDescription || !techStack) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/project-resume-bullets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectDescription, techStack }),
      });
      const data = await response.json();
      if (response.ok) setResults(data);
      else setError(data.error || "Failed to generate bullets");
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-orange-900/40 to-black border-orange-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Rocket className="w-6 h-6 text-orange-400" />
            Project → Resume Bullet Generator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Project Description *</Label>
            <textarea placeholder="Describe your project..." value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)} className="w-full h-32 bg-black/50 border border-orange-500/30 rounded-md p-3 text-white" />
          </div>
          <div className="space-y-2">
            <Label>Tech Stack *</Label>
            <Input placeholder="React, Node.js, etc." value={techStack} onChange={(e) => setTechStack(e.target.value)} className="bg-black/50 border-orange-500/30 text-white" />
          </div>

          <Button onClick={handleGenerate} disabled={loading} className="w-full bg-gradient-to-r from-orange-600 to-orange-700">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            Generate Bullets
          </Button>

          {results && (
            <div className="mt-6 bg-black/30 p-4 rounded-lg relative">
              <Button size="sm" variant="ghost" className="absolute top-2 right-2" onClick={() => onCopy(results.bullets)}>
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              </Button>
              <pre className="text-sm text-gray-300 whitespace-pre-wrap">{results.bullets}</pre>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
