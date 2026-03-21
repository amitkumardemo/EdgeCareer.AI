"use client";

import { useState, useEffect } from "react";
import { 
  getLeaveRequests, 
  updateLeaveStatus, 
  getLeaveStats 
} from "@/actions/leave-actions";
import { toast } from "sonner";
import { 
  CheckCircle2, XCircle, Clock, Filter, Download, 
  Calendar, User, Mail, ChevronRight, Info,
  TrendingUp, AlertCircle, Search, Briefcase, X, Globe, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STATUS_COLORS = {
  PENDING: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  APPROVED: "text-green-400 bg-green-400/10 border-green-400/20",
  REJECTED: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function AdminLeavePage() {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [adminNotes, setAdminNotes] = useState("");
  const [selectedReq, setSelectedReq] = useState(null);

  useEffect(() => {
    loadData();
  }, [filter, typeFilter]);

  async function loadData() {
    setLoading(true);
    try {
      const [data, s] = await Promise.all([
        getLeaveRequests({ status: filter || undefined, leaveType: typeFilter || undefined }),
        getLeaveStats()
      ]);
      setRequests(data);
      setStats(s);
    } catch (e) {
      toast.error("Failed to load requests");
    } finally {
      setLoading(false);
    }
  }

  async function handleStatusUpdate(id, status) {
    try {
      await updateLeaveStatus(id, status, adminNotes);
      toast.success(`Request ${status.toLowerCase()} successfully`);
      setEditingId(null);
      setAdminNotes("");
      loadData();
    } catch (e) {
      toast.error(e.message);
    }
  }

  const downloadReport = () => {
    const headers = ["Name", "Email", "Batch", "Type", "Start Date", "End Date", "Status", "Reason"];
    const csvContent = [
      headers.join(","),
      ...requests.map(r => [
        `"${r.fullName}"`,
        `"${r.email}"`,
        `"${r.batch?.name || 'N/A'}"`,
        `"${r.leaveType}"`,
        `"${new Date(r.startDate).toLocaleDateString()}"`,
        `"${new Date(r.endDate).toLocaleDateString()}"`,
        `"${r.status}"`,
        `"${r.reason.replace(/"/g, '""')}"`
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `leave_report_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Report downloaded successfully");
  };

  return (
    <div className="space-y-8 p-4 sm:p-6 pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Leave Requests</h1>
          <p className="text-gray-400 mt-1 italic">Review and manage intern leave applications</p>
        </div>
        <Button 
          onClick={downloadReport}
          variant="outline"
          className="border-white/10 text-white hover:bg-white/5 gap-2"
        >
          <Download className="h-4 w-4" />
          Download Report
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Requests" value={stats.total} icon={TrendingUp} color="blue" />
        <StatCard label="Pending Approval" value={stats.pending} icon={Clock} color="amber" />
        <StatCard label="Approved" value={stats.approved} icon={CheckCircle2} color="green" />
        <StatCard label="Rejected" value={stats.rejected} icon={XCircle} color="red" />
      </div>

      {/* Filters */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-4 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-xl px-3 py-1.5 min-w-[200px]">
          <Search className="h-4 w-4 text-gray-500" />
          <input 
            placeholder="Search name..."
            className="bg-transparent border-none text-sm text-white focus:ring-0 outline-none w-full"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-black border border-white/10 text-white text-sm rounded-xl px-4 py-2 focus:border-primary outline-none"
        >
          <option value="">All Statuses</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-black border border-white/10 text-white text-sm rounded-xl px-4 py-2 focus:border-primary outline-none"
        >
          <option value="">All Types</option>
          <option value="Sick Leave">Sick Leave</option>
          <option value="Casual Leave">Casual Leave</option>
          <option value="Emergency Leave">Emergency Leave</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-[#0c0d12] border border-white/10 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5 text-[10px] uppercase font-bold text-gray-500 tracking-widest">
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Leave Info</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-600 italic">Formatting data...</td></tr>
              ) : requests.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-600 italic">No matching records found</td></tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="hover:bg-white/[0.01] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {req.user?.name?.[0] || req.fullName[0]}
                        </div>
                        <div>
                          <p className="text-white font-medium text-xs">{req.fullName}</p>
                          <p className="text-[10px] text-gray-500 italic">{req.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-white text-xs">{req.leaveType}</p>
                      <p className="text-[10px] text-primary/70 font-medium italic">{req.batch?.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[10px] text-gray-300">
                        <p className="font-medium text-primary/80">{new Date(req.startDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short' })} - {new Date(req.endDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short' })}</p>
                        <p className="text-gray-600">Applied on {new Date(req.createdAt).toLocaleDateString()}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border shadow-sm ${STATUS_COLORS[req.status]}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => setSelectedReq(req)}
                          className="p-2 rounded-lg bg-white/5 text-gray-400 hover:text-white"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {req.status === "PENDING" && (
                          <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => { setEditingId(req.id); setAdminNotes(""); }}
                              className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20"
                            >
                              <CheckCircle2 className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => { setEditingId(req.id); setAdminNotes(""); }}
                              className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </div>
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

      {/* Review Dialog */}
      {editingId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-white mb-4">Review Leave Request</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-gray-400 text-sm italic">Admin Remarks (Optional)</label>
                <textarea 
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                  placeholder="e.g. Approved as per discussion with mentor."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                />
              </div>
              <div className="flex gap-3 pt-4">
                <Button 
                  onClick={() => handleStatusUpdate(editingId, "APPROVED")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Approve
                </Button>
                <Button 
                  onClick={() => handleStatusUpdate(editingId, "REJECTED")}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Reject
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setEditingId(null)}
                  className="text-gray-500"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full Detail Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0c0d12] border border-white/10 rounded-3xl w-full max-w-2xl my-auto shadow-[0_0_50px_-12px_rgba(37,99,235,0.2)] overflow-hidden animate-in fade-in zoom-in">
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center text-primary text-2xl font-bold border border-primary/20">
                  {selectedReq.fullName[0]}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white leading-tight">{selectedReq.fullName}</h2>
                  <p className="text-gray-500 text-sm italic">{selectedReq.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedReq(null)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors"
              >
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 space-y-4">
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Leave Context</h3>
                        <div className="space-y-4">
                          <DetailRow icon={Info} label="Type" value={selectedReq.leaveType} />
                          <DetailRow icon={BookOpen} label="Batch" value={selectedReq.batch?.name} />
                          <DetailRow icon={Calendar} label="Duration" value={`${new Date(selectedReq.startDate).toLocaleDateString()} - ${new Date(selectedReq.endDate).toLocaleDateString()}`} />
                          <DetailRow icon={Clock} label="Status" value={selectedReq.status} isStatus />
                        </div>
                  </div>
                  <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 space-y-4">
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Contact Details</h3>
                    <div className="space-y-4">
                      <DetailRow icon={Briefcase} label="Department" value={selectedReq.department || "—"} />
                      <DetailRow icon={AlertCircle} label="Contact" value={selectedReq.contactNumber} />
                      {selectedReq.attachmentUrl && (
                        <div className="pt-2 border-t border-white/5">
                          <a 
                            href={selectedReq.attachmentUrl} 
                            target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs text-primary hover:underline italic"
                          >
                            <Globe className="h-3 w-3" /> View Attachment / Link
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/[0.02] p-5 rounded-2xl border border-white/5 h-full">
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 italic">Reason for application</h3>
                    <p className="text-sm text-gray-300 leading-relaxed italic whitespace-pre-wrap">
                      "{selectedReq.reason}"
                    </p>
                    <div className="mt-8 pt-6 border-t border-white/5">
                      <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 italic underline">Work Handover</h3>
                      <p className="text-xs text-primary/80 italic leading-relaxed">
                        {selectedReq.workHandover || "No handover details provided."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white/[0.01] border-t border-white/5 flex gap-4">
              {selectedReq.status === "PENDING" ? (
                <>
                  <Button 
                    onClick={() => { setEditingId(selectedReq.id); setSelectedReq(null); }}
                    className="flex-1 bg-primary hover:bg-primary/90 text-black font-bold h-12 rounded-2xl"
                  >
                    Action Required
                  </Button>
                </>
              ) : (
                <div className="flex-1 text-center p-3 rounded-2xl bg-white/5 border border-white/10 text-gray-500 text-xs italic">
                  This request has already been processed.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }) {
  const colors = {
    blue: "text-blue-400 border-blue-400/20 bg-blue-400/5",
    amber: "text-amber-400 border-amber-400/20 bg-amber-400/5",
    green: "text-green-400 border-green-400/20 bg-green-400/5",
    red: "text-red-400 border-red-400/20 bg-red-400/5",
  };

  return (
    <div className={`p-5 rounded-2xl border ${colors[color]} space-y-4 hover:bg-opacity-10 transition-all`}>
      <div className="flex items-center justify-between">
        <Icon className="h-5 w-5 opacity-80" />
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Insights</span>
      </div>
      <div>
        <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
        <p className="text-[10px] text-gray-500 mt-1 uppercase font-semibold">{label}</p>
      </div>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value, isStatus }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 p-1 rounded-lg bg-white/5 text-gray-500">
        <Icon className="h-3 w-3" />
      </div>
      <div>
        <p className="text-[10px] text-gray-500 leading-none mb-1 font-medium">{label}</p>
        {isStatus ? (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[value]}`}>
            {value}
          </span>
        ) : (
          <p className="text-xs text-white font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}

function Eye({ className }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
