"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-red-500/10 border border-red-500/20">
            <ShieldAlert className="h-12 w-12 text-red-500" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">Access Denied</h1>
          <p className="text-gray-400">
            You don't have permission to access this page. Please make sure you are logged in with the correct role.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" asChild className="border-white/10 hover:bg-white/5 text-white">
            <Link href="/internship">
              <Home className="mr-2 h-4 w-4" /> Back to Home
            </Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/sign-in">
              <ArrowLeft className="mr-2 h-4 w-4" /> Switch Account
            </Link>
          </Button>
        </div>
        
        <p className="text-xs text-gray-600 pt-8 border-t border-white/5">
          TechieHelp Institute of AI Security Protocol Compliance
        </p>
      </div>
    </div>
  );
}
