"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { 
  FileText, 
  Download, 
  Share2, 
  Trash2, 
  Eye,
  Copy,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import { toast } from "sonner";
import { deleteResume, shareResume } from "@/actions/resume-analytics";

export default function SavedResumesView({ resumes: initialResumes }) {
  const [resumes, setResumes] = useState(initialResumes);
  const [copiedId, setCopiedId] = useState(null);

  const handleDelete = async (resumeId) => {
    try {
      await deleteResume(resumeId);
      setResumes(resumes.filter(r => r.id !== resumeId));
      toast.success("Resume deleted successfully");
    } catch (error) {
      toast.error("Failed to delete resume");
    }
  };

  const handleShare = async (resumeId) => {
    try {
      const { shareUrl } = await shareResume(resumeId);
      await navigator.clipboard.writeText(shareUrl);
      setCopiedId(resumeId);
      setTimeout(() => setCopiedId(null), 2000);
      toast.success("Share link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to generate share link");
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      draft: "secondary",
      saved: "default",
      downloaded: "outline",
    };
    return (
      <Badge variant={variants[status] || "secondary"}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold gradient-title text-5xl md:text-6xl">
            My Resumes
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage all your saved resumes
          </p>
        </div>
        <Link href="/resume">
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Create New Resume
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resumes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resumes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resumes.reduce((sum, r) => sum + r.downloadCount, 0)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {resumes.reduce((sum, r) => sum + r.shareCount, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resumes List */}
      {resumes.length === 0 ? (
        <Card className="p-12">
          <div className="text-center space-y-4">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
            <h3 className="text-xl font-semibold">No resumes yet</h3>
            <p className="text-muted-foreground">
              Create your first ATS-optimized resume to get started
            </p>
            <Link href="/resume">
              <Button>Create Resume</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {resumes.map((resume) => (
            <Card key={resume.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">{resume.name}</h3>
                      {getStatusBadge(resume.status)}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <span>
                        Created: {format(new Date(resume.createdAt), "MMM dd, yyyy")}
                      </span>
                      <span>
                        Last updated: {format(new Date(resume.updatedAt), "MMM dd, yyyy")}
                      </span>
                      {resume.downloadCount > 0 && (
                        <span>Downloads: {resume.downloadCount}</span>
                      )}
                      {resume.shareCount > 0 && (
                        <span>Shares: {resume.shareCount}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/resume?id=${resume.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleShare(resume.id)}
                    >
                      {copiedId === resume.id ? (
                        <>
                          <Check className="h-4 w-4 mr-1" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </>
                      )}
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Resume?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete
                            "{resume.name}" from your account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(resume.id)}
                            className="bg-red-500 hover:bg-red-600"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
