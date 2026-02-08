"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  Share2, 
  Trash2, 
  Eye, 
  Clock,
  Sparkles,
  Edit
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ResumeHistory({ resumes, onDelete, onOpen }) {
  const [localResumes, setLocalResumes] = useState(resumes || []);

  useEffect(() => {
    setLocalResumes(resumes || []);
  }, [resumes]);

  const handleShare = async (resumeId) => {
    try {
      console.log(`🔄 Sharing resume ${resumeId}...`);
      
      const response = await fetch('/api/share-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Share successful:", data);
        
        // Use branded URL
        const brandedUrl = data.brandedUrl || data.shareUrl;
        
        // Copy share URL to clipboard
        await navigator.clipboard.writeText(brandedUrl);
        toast.success("🎉 Share link copied to clipboard!", {
          description: `Branded URL: ${brandedUrl}`,
          duration: 5000,
        });
        
        // Refresh to update share counts
        window.location.href = window.location.pathname;
      } else {
        console.error("❌ Share failed:", data.error);
        toast.error(data.error || "Failed to generate share link");
      }
    } catch (error) {
      console.error("❌ Share error:", error);
      toast.error("Failed to share resume");
    }
  };

  const handleDelete = async (resumeId) => {
    try {
      console.log(`🔄 Deleting resume ${resumeId}...`);
      
      const response = await fetch('/api/delete-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId })
      });

      if (response.ok) {
        console.log("✅ Resume deleted successfully");
        setLocalResumes(prev => prev.filter(r => r.id !== resumeId));
        toast.success("Resume deleted successfully");
        if (onDelete) onDelete(resumeId);
        
        // Refresh to update counts
        setTimeout(() => {
          window.location.href = window.location.pathname;
        }, 500);
      } else {
        const error = await response.json();
        console.error("❌ Delete failed:", error);
        toast.error(error.error || "Failed to delete resume");
      }
    } catch (error) {
      console.error("❌ Delete error:", error);
      toast.error("Failed to delete resume");
    }
  };

  if (!localResumes || localResumes.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No resumes created yet</p>
          <p className="text-sm text-muted-foreground mt-2">
            Start building your first resume using Manual or AI mode
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume History</CardTitle>
        <CardDescription>
          All your created resumes ({localResumes.length})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {localResumes.map((resume) => (
            <div
              key={resume.id}
              className="flex items-center justify-between border rounded-lg p-4 hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="flex-shrink-0">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold truncate">{resume.name}</h4>
                    <Badge 
                      variant={resume.mode === 'ai' ? 'default' : 'secondary'}
                      className="flex items-center gap-1"
                    >
                      {resume.mode === 'ai' && <Sparkles className="h-3 w-3" />}
                      {resume.mode === 'ai' ? 'AI' : 'Manual'}
                    </Badge>
                    <Badge variant={
                      resume.status === 'downloaded' ? 'default' : 
                      resume.status === 'saved' ? 'secondary' : 
                      'outline'
                    }>
                      {resume.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>
                        {formatDistanceToNow(new Date(resume.updatedAt), { addSuffix: true })}
                      </span>
                    </div>
                    {resume.downloadCount > 0 && (
                      <div className="flex items-center gap-1">
                        <Download className="h-3 w-3" />
                        <span>{resume.downloadCount}</span>
                      </div>
                    )}
                    {resume.shareCount > 0 && (
                      <div className="flex items-center gap-1">
                        <Share2 className="h-3 w-3" />
                        <span>{resume.shareCount}</span>
                      </div>
                    )}
                    {resume.atsScore && (
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs">
                          ATS: {resume.atsScore}%
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (onOpen) {
                      onOpen(resume.id);
                    } else {
                      window.location.href = `/resume?id=${resume.id}`;
                    }
                  }}
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Open
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleShare(resume.id)}
                >
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{resume.name}"? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(resume.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
