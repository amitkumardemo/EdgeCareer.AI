"use client";

import React, { useState } from "react";
import { 
  Github, 
  BookOpen, 
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

export function GitHubRepoModal({ open, onOpenChange, onCopy, copied }) {
  const [repoName, setRepoName] = useState("");
  const [techStack, setTechStack] = useState("");
  const [problemSolved, setProblemSolved] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!repoName || !techStack || !problemSolved) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/github-repo-readme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoName, techStack, problemSolved }),
      });
      const data = await response.json();
      if (response.ok) setResults(data);
      else setError(data.error || "Failed to generate README");
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-gray-900/40 to-black border-gray-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Github className="w-6 h-6 text-gray-400" />
            GitHub Repo README Generator
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Create professional README.md files.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>Repository Name *</Label>
            <Input placeholder="my-awesome-project" value={repoName} onChange={(e) => setRepoName(e.target.value)} className="bg-black/50 border-gray-500/30 text-white" />
          </div>
          <div className="space-y-2">
            <Label>Tech Stack *</Label>
            <Input placeholder="React, Node.js, etc." value={techStack} onChange={(e) => setTechStack(e.target.value)} className="bg-black/50 border-gray-500/30 text-white" />
          </div>
          <div className="space-y-2">
            <Label>Problem Solved *</Label>
            <textarea placeholder="Describe the solution..." value={problemSolved} onChange={(e) => setProblemSolved(e.target.value)} className="w-full h-24 bg-black/50 border border-gray-500/30 rounded-md p-3 text-white" />
          </div>

          <Button onClick={handleGenerate} disabled={loading} className="w-full bg-gradient-to-r from-gray-600 to-gray-800">
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            {loading ? "Generating..." : "Generate README"}
          </Button>

          {results && (
            <div className="space-y-4 mt-6">
              <div className="bg-black/30 p-4 rounded-lg relative">
                <Button size="sm" variant="ghost" className="absolute top-2 right-2" onClick={() => onCopy(results.readme)}>
                   {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                </Button>
                <pre className="text-xs text-gray-400 font-mono whitespace-pre-wrap">{results.readme}</pre>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function GitHubProfileModal({ open, onOpenChange, onCopy, copied }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!username || !role) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/github-profile-readme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, role }),
      });
      const data = await response.json();
      if (response.ok) setResults(data);
      else setError(data.error || "Failed to generate Profile README");
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-green-900/40 to-black border-green-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-green-400" />
            GitHub Profile README Generator
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>GitHub Username *</Label>
            <Input placeholder="yourusername" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-black/50 border-green-500/30 text-white" />
          </div>
          <div className="space-y-2">
            <Label>Target Role *</Label>
            <Input placeholder="e.g., Full Stack Developer" value={role} onChange={(e) => setRole(e.target.value)} className="bg-black/50 border-green-500/30 text-white" />
          </div>

          <Button onClick={handleGenerate} disabled={loading} className="w-full bg-gradient-to-r from-green-600 to-green-700">
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            Generate Profile
          </Button>

          {results && (
            <div className="mt-6 bg-black/30 p-4 rounded-lg relative">
              <Button size="sm" variant="ghost" className="absolute top-2 right-2" onClick={() => onCopy(results.readme)}>
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              </Button>
              <pre className="text-xs text-gray-400 font-mono whitespace-pre-wrap">{results.readme}</pre>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
