"use client";

import React, { useState } from "react";
import { 
  MessageSquare, 
  Sparkles, 
  AlertCircle, 
  Loader2, 
  CheckCircle, 
  Copy,
  ExternalLink
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LinkedInPostModal({ open, onOpenChange, onCopy, copied }) {
  const [postType, setPostType] = useState("");
  const [tone, setTone] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!postType || !tone) {
      setError("Please select both post type and tone");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/linkedin-post-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postType, tone }),
      });

      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error || "Failed to generate post");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-gradient-to-br from-purple-900/40 to-black border-purple-500/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-purple-400" />
            Daily LinkedIn Post Generator
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Generate engaging LinkedIn posts for your professional journey
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Post Type *</Label>
              <Select value={postType} onValueChange={setPostType}>
                <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-purple-500/30 text-white">
                  <SelectItem value="Project">Project Highlight</SelectItem>
                  <SelectItem value="Learning">Daily Learning</SelectItem>
                  <SelectItem value="Achievement">Major Achievement</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Tone *</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-black/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-purple-500/30 text-white">
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Story">Storyteller</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
          >
            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
            {loading ? "Generating..." : "Generate Post"}
          </Button>

          {error && (
             <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400">
               {error}
             </div>
          )}

          {results && (
            <div className="space-y-4 mt-6">
              <div className="bg-black/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-purple-300">Generated Post</h4>
                  <Button size="sm" variant="outline" onClick={() => onCopy(results.post + "\n\n" + results.hashtags)} className="border-purple-500/30">
                    {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{results.post}</p>
                <p className="text-blue-400 font-medium">{results.hashtags}</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => onCopy(results.post + "\n\n" + results.hashtags)} className="flex-1 bg-purple-600">Copy Post</Button>
                <Button onClick={() => window.open("https://www.linkedin.com/feed/?shareActive=true", "_blank")} className="flex-1 bg-blue-600">Open LinkedIn</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
