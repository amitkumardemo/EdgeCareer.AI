"use client";

import { useState, useEffect } from "react";
import { getAllApplications, reviewApplication } from "@/actions/internship-admin";
import { getBatches } from "@/actions/internship-admin";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Eye, Filter, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATUS_COLORS = {
  APPLIED: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  UNDER_REVIEW: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  SELECTED: "text-green-400 bg-green-400/10 border-green-400/20",
  REJECTED: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [batches, setBatches] = useState([]);
  const [filter, setFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [reviewing, setReviewing] = useState(null);

  useEffect(() => {
    loadData();
  }, [filter, batchFilter]);

  async function loadData() {
    setLoading(true);
    try {
      const [apps, bs] = await Promise.all([
        getAllApplications({ status: filter || undefined, batchId: batchFilter || undefined }),
        getBatches(),
      ]);
      setApplications(apps);
      setBatches(bs);
    } finally {
      setLoading(false);
    }
  }

  async function handleReview(id, status) {
    setReviewing(id);
    try {
      await reviewApplication(id, status);
      toast.success(`Application ${status.toLowerCase()}`);
      await loadData();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setReviewing(null);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Applications</h1>
          <p className="text-gray-500 text-sm mt-0.5">{applications.length} application{applications.length !== 1 ? "s" : ""} found</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none"
          >
            <option value="">All Statuses</option>
            {["APPLIED", "UNDER_REVIEW", "SELECTED", "REJECTED"].map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none"
          >
            <option value="">All Batches</option>
            {batches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-gray-500 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Student</th>
                <th className="px-4 py-3 text-left">Batch / Program</th>
                <th className="px-4 py-3 text-left">College</th>
                <th className="px-4 py-3 text-left">Applied</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-600">Loading...</td></tr>
              ) : applications.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-600">No applications found</td></tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="border-b border-white/5 hover:bg-white/2 transition-all">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                          {app.user?.name?.[0]?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <p className="font-medium text-white text-xs">{app.user?.name}</p>
                          <p className="text-[10px] text-gray-600">{app.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-white font-medium">{app.batch?.name}</p>
                      <p className="text-[10px] text-gray-600">{app.batch?.program?.title}</p>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400">{app.user?.college?.name || "—"}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {new Date(app.appliedAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-[10px] font-semibold px-2 py-1 rounded-full border ${STATUS_COLORS[app.status]}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {app.status === "APPLIED" || app.status === "UNDER_REVIEW" ? (
                          <>
                            <button
                              onClick={() => handleReview(app.id, "SELECTED")}
                              disabled={reviewing === app.id}
                              className="p-1.5 rounded-lg bg-green-400/10 text-green-400 hover:bg-green-400/20 transition-all disabled:opacity-50"
                              title="Select"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleReview(app.id, "UNDER_REVIEW")}
                              disabled={reviewing === app.id}
                              className="p-1.5 rounded-lg bg-amber-400/10 text-amber-400 hover:bg-amber-400/20 transition-all disabled:opacity-50"
                              title="Set as Under Review"
                            >
                              <Clock className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => handleReview(app.id, "REJECTED")}
                              disabled={reviewing === app.id}
                              className="p-1.5 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-all disabled:opacity-50"
                              title="Reject"
                            >
                              <XCircle className="h-3.5 w-3.5" />
                            </button>
                          </>
                        ) : (
                          <span className="text-[10px] text-gray-600">—</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
