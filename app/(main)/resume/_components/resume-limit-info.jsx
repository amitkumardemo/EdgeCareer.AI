"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function ResumeLimitInfo() {
  return (
    <Alert className="bg-blue-50 border-blue-200">
      <AlertCircle className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-900">One-Page Resume Enforcement</AlertTitle>
      <AlertDescription className="text-blue-800 text-sm space-y-2">
        <p>
          <strong>STRICT character limits are enforced</strong> to guarantee your resume stays on ONE PAGE.
        </p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>Summary: 200 characters max</li>
          <li>Skills: 300 characters max (12 skills per category)</li>
          <li>Experience: Max 4 entries, 3 bullets × 120 chars each</li>
          <li>Projects: Max 3 entries, 2 bullets × 110 chars each</li>
          <li>Achievements: 3 points × 100 chars</li>
          <li>Leadership: 2 points × 110 chars</li>
          <li>Why I Fit: 3 points × 100 chars</li>
        </ul>
        <p className="mt-2">
          <strong className="text-red-600">Warning:</strong> Input will be blocked when you reach the limit. 
          Counter turns <span className="text-orange-500 font-semibold">ORANGE</span> at 80% and 
          <span className="text-red-600 font-semibold"> RED</span> at 100%.
        </p>
      </AlertDescription>
    </Alert>
  );
}
