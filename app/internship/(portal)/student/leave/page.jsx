"use client";

import { useState, useEffect } from "react";
import { createLeaveRequest, getMyLeaveRequests } from "@/actions/leave-actions";
import { getStudentProfile } from "@/actions/internship-student";
import { toast } from "sonner";
import { 
  Calendar, Clock, FileText, Send, AlertCircle, 
  CheckCircle2, XCircle, Info, Plus, ChevronRight,
  User, Mail, Phone, Briefcase, Globe, BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";

const LEAVE_TYPES = [
  { id: "Sick Leave", icon: "🤒", color: "text-red-400" },
  { id: "Casual Leave", icon: "🏖️", color: "text-blue-400" },
  { id: "Emergency Leave", icon: "🆘", color: "text-amber-400" },
  { id: "Other", icon: "📝", color: "text-purple-400" },
];

const STATUS_COLORS = {
  PENDING: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  APPROVED: "text-green-400 bg-green-400/10 border-green-400/20",
  REJECTED: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function StudentLeavePage() {
  const [profile, setProfile] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    department: "",
    batchId: "",
    leaveType: "Sick Leave",
    startDate: "",
    endDate: "",
    reason: "",
    workHandover: "",
    attachmentUrl: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [u, l] = await Promise.all([
        getStudentProfile(),
        getMyLeaveRequests()
      ]);
      setProfile(u);
      setLeaves(l);
      
      if (u) {
        const activeApp = u.internApplications?.[0];
        setFormData(prev => ({
          ...prev,
          fullName: u.name || "",
          email: u.email || "",
          contactNumber: u.phone || "",
          department: u.branch || "",
          batchId: activeApp?.batchId || "",
        }));
      }
    } catch (e) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createLeaveRequest(formData);
      toast.success("Leave application submitted successfully!");
      setShowForm(false);
      loadData();
      // Reset non-profile fields
      setFormData(prev => ({
        ...prev,
        startDate: "",
        endDate: "",
        reason: "",
        workHandover: "",
      }));
    } catch (error) {
      toast.error(error.message || "Failed to submit application");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-4 sm:p-6 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Leave Management System</h1>
          <p className="text-gray-400 mt-1">Submit and track your leave applications</p>
        </div>
        {!showForm && (
          <Button 
            onClick={() => setShowForm(true)}
            className="bg-primary hover:bg-primary/90 text-black font-semibold gap-2"
          >
            <Plus className="h-4 w-4" />
            Apply for Leave
          </Button>
        )}
      </div>

      {showForm ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                New Leave Application
              </h2>
              <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-white transition-colors">
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8 text-sm">
              {/* Basic Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-400 flex items-center gap-2 mb-1">
                    <User className="h-3.5 w-3.5" /> Full Name
                  </label>
                  <input
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 flex items-center gap-2 mb-1">
                    <Mail className="h-3.5 w-3.5" /> Email ID
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 flex items-center gap-2 mb-1">
                    <Phone className="h-3.5 w-3.5" /> Contact Number
                  </label>
                  <input
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={formData.contactNumber}
                    onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 flex items-center gap-2 mb-1">
                    <Briefcase className="h-3.5 w-3.5" /> Department / Role
                  </label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>
                <div className="space-y-2 lg:col-span-1">
                  <label className="text-gray-400 flex items-center gap-2 mb-1">
                    <BookOpen className="h-3.5 w-3.5" /> Internship Batch
                  </label>
                  <select
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                    value={formData.batchId}
                    onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
                  >
                    <option value="" disabled className="bg-[#111]">Select your batch</option>
                    {profile?.internApplications?.map(app => (
                      <option key={app.batchId} value={app.batchId} className="bg-[#111]">
                        {app.batch.name}
                      </option>
                    ))}
                  </select>
                  {(!profile?.internApplications || profile.internApplications.length === 0) && (
                    <p className="text-[10px] text-red-400 mt-1 italic leading-tight">
                      No active internship found.
                    </p>
                  )}
                </div>
              </div>

              {/* Leave Specifics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-white/5">
                <div className="space-y-4">
                  <h3 className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Leave Details</h3>
                  <div className="space-y-3">
                    <label className="text-gray-400 block mb-2">Leave Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {LEAVE_TYPES.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, leaveType: type.id })}
                          className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                            formData.leaveType === type.id
                              ? "bg-primary/10 border-primary text-white"
                              : "bg-white/5 border-white/5 text-gray-400 hover:border-white/20"
                          }`}
                        >
                          <span className="text-lg">{type.icon}</span>
                          <span className="text-[10px] font-medium">{type.id}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <h3 className="text-gray-500 font-semibold uppercase tracking-wider text-[10px]">Duration & Reason</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-gray-400 flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" /> Start Date
                      </label>
                      <input
                        required
                        type="date"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-gray-400 flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5" /> End Date
                      </label>
                      <input
                        required
                        type="date"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-gray-400 flex items-center gap-2">
                        <Info className="h-3.5 w-3.5" /> Reason for Leave
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Please explain the reason for your leave..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none resize-none"
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-gray-400 flex items-center gap-2">
                        <Briefcase className="h-3.5 w-3.5" /> Work Handover Details
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Who will handle your tasks? Any specific instructions?"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none resize-none"
                        value={formData.workHandover}
                        onChange={(e) => setFormData({ ...formData, workHandover: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2 space-y-2">
                      <label className="text-gray-400 flex items-center gap-2">
                        <Globe className="h-3.5 w-3.5" /> Attachment / Support Link (Optional)
                      </label>
                      <input
                        placeholder="Link to medical certificate or other documents (Google Drive, etc.)"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-primary outline-none transition-all"
                        value={formData.attachmentUrl}
                        onChange={(e) => setFormData({ ...formData, attachmentUrl: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <p className="text-xs text-gray-500 italic max-w-sm">
                  Submitting this application will notify the management team for review.
                </p>
                <div className="flex gap-3">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => setShowForm(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                  <Button 
                    disabled={submitting}
                    className="bg-primary hover:bg-primary/90 text-black font-semibold min-w-[140px]"
                  >
                    {submitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Submit Request
                        <Send className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-white">Your Applications</h2>
          
          {leaves.length === 0 ? (
            <div className="bg-white/3 border border-dashed border-white/10 rounded-2xl p-12 text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-white font-medium mb-1">No leave requests yet</h3>
              <p className="text-gray-500 text-sm mb-6">You haven't submitted any leave applications.</p>
              <Button onClick={() => setShowForm(true)} variant="outline" className="border-white/10 text-white hover:bg-white/5">
                Submit Your First Request
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {leaves.map((leave) => (
                <div key={leave.id} className="bg-[#111] border border-white/10 rounded-2xl p-5 space-y-4 hover:border-primary/20 transition-all group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {LEAVE_TYPES.find(t => t.id === leave.leaveType)?.icon || "📝"}
                      </span>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{leave.leaveType}</h4>
                        <p className="text-[10px] text-gray-500 italic">Applied on {new Date(leave.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold ${STATUS_COLORS[leave.status]}`}>
                      {leave.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Duration</span>
                      <span className="text-gray-300 font-medium italic">
                        {new Date(leave.startDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short' })} - {new Date(leave.endDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-2 px-3 py-2 bg-white/3 rounded-lg border border-white/5 italic">
                      "{leave.reason}"
                    </p>
                  </div>

                  {leave.adminNotes && (
                    <div className="pt-3 border-t border-white/5">
                      <p className="text-[10px] text-primary/80 flex items-center gap-1.5">
                        <Info className="h-3 w-3" />
                        Admin: {leave.adminNotes}
                      </p>
                    </div>
                  )}
                  
                  <div className="pt-2 flex justify-end">
                    <button className="text-[10px] text-gray-600 hover:text-primary transition-colors flex items-center gap-1">
                      View Details <ChevronRight className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
