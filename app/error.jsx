"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

export default function GlobalErrorPage({ error, reset }) {
  useEffect(() => {
    // Log the error to server console
    console.error("[App-Level Error Boundary Caught Error]:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-8 text-center shadow-lg">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto mb-5">
          <AlertCircle className="w-7 h-7" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Service Temporarily Unavailable</h1>
        <p className="text-slate-600 text-sm mb-6 leading-relaxed">
          We are experiencing temporary service synchronization delays. Our systems are restoring normal operation. Please try again.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-blue-950 text-white text-sm font-semibold hover:bg-blue-900 transition-colors shadow-sm"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-colors border border-slate-200"
          >
            <Home className="w-4 h-4" /> Home
          </Link>
        </div>
      </div>
    </div>
  );
}
