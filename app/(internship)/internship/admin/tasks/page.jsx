"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";
import {
  Plus,
  Search,
  Filter,
  BookOpen,
  Calendar,
  Users,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  MoreHorizontal,
  Pencil,
  Trash2,
  X,
  ExternalLink,
  FileText,
  Star,
  BarChart3,
  Eye,
  Lock,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Link2,
  Send,
  ChevronRight,
  CheckSquare,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getAllTasksWithStats,
  createTaskExtended,
  updateTaskExtended,
  deleteTaskById,
  closeTaskById,
  extendTaskDeadline,
  getTaskWithSubmissions,
  evaluateTaskSubmission,
  getTaskAnalyticsSummary,
} from "@/actions/internship-tasks";
import { getBatches } from "@/actions/internship-admin";

// ─── Constants ────────────────────────────────────────────────────────────────

const PRIORITY_CONFIG = {
  LOW: {
    label: "Low",
    badge: "text-gray-400 bg-gray-400/10 border-gray-400/20",
    dot: "bg-gray-400",
  },
  MEDIUM: {
    label: "Medium",
    badge: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    dot: "bg-amber-400",
  },
  HIGH: {
    label: "High",
    badge: "text-red-400 bg-red-400/10 border-red-400/20",
    dot: "bg-red-400",
  },
};

const STATUS_CONFIG = {
  ACTIVE: {
    label: "Active",
    badge: "text-green-400 bg-green-400/10 border-green-400/20",
    icon: CheckCircle2,
  },
  OVERDUE: {
    label: "Overdue",
    badge: "text-red-400 bg-red-400/10 border-red-400/20",
    icon: AlertTriangle,
  },
  COMPLETED: {
    label: "Completed",
    badge: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    icon: CheckSquare,
  },
  CLOSED: {
    label: "Closed",
    badge: "text-gray-500 bg-gray-500/10 border-gray-500/20",
    icon: Lock,
  },
};

const REVIEW_STATUS_CONFIG = {
  PENDING: { label: "Pending Review", badge: "text-amber-400 bg-amber-400/10 border-amber-400/20" },
  APPROVED: { label: "Approved", badge: "text-green-400 bg-green-400/10 border-green-400/20" },
  REJECTED: { label: "Rejected", badge: "text-red-400 bg-red-400/10 border-red-400/20" },
  NEEDS_REVISION: { label: "Needs Revision", badge: "text-orange-400 bg-orange-400/10 border-orange-400/20" },
};

function fmtDate(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function fmtDatetime(d) {
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── Analytics Cards ──────────────────────────────────────────────────────────
function AnalyticsCards({ analytics }) {
  const cards = [
    {
      label: "Total Tasks",
      value: analytics.total,
      icon: FileText,
      color: "from-blue-500/10 to-blue-600/5 border-blue-500/20 text-blue-400",
    },
    {
      label: "Active",
      value: analytics.active,
      icon: CheckCircle2,
      color: "from-green-500/10 to-green-600/5 border-green-500/20 text-green-400",
    },
    {
      label: "Overdue",
      value: analytics.overdue,
      icon: AlertTriangle,
      color: "from-red-500/10 to-red-600/5 border-red-500/20 text-red-400",
    },
    {
      label: "Completed",
      value: analytics.completed,
      icon: CheckSquare,
      color: "from-blue-500/10 to-indigo-600/5 border-indigo-500/20 text-indigo-400",
    },
    {
      label: "Submission Rate",
      value: `${analytics.submissionRate}%`,
      icon: BarChart3,
      color: "from-purple-500/10 to-purple-600/5 border-purple-500/20 text-purple-400",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {cards.map(({ label, value, icon: Icon, color }) => (
        <div
          key={label}
          className={`bg-gradient-to-br ${color} border rounded-xl p-4 flex flex-col gap-2`}
        >
          <Icon className="h-4 w-4" />
          <p className="text-2xl font-extrabold text-white">{value}</p>
          <p className="text-[11px] text-gray-500 font-medium">{label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Priority Badge ───────────────────────────────────────────────────────────
function PriorityBadge({ priority }) {
  const cfg = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.MEDIUM;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-semibold ${cfg.badge}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.ACTIVE;
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-semibold ${cfg.badge}`}
    >
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  );
}

// ─── Task Form (Create / Edit) ────────────────────────────────────────────────
function TaskFormModal({ batches, task, onClose, onSuccess }) {
  const isEdit = !!task;
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: task?.title || "",
    description: task?.description || "",
    batchId: task?.batchId || "",
    priority: task?.priority || "MEDIUM",
    dueDate: task ? new Date(task.dueDate).toISOString().split("T")[0] : "",
    maxScore: task?.maxScore?.toString() || "100",
    resources: task?.links?.join("\n") || "",
  });

  function set(key, val) {
    setForm((prev) => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!isEdit && !form.batchId) return toast.error("Please select a batch");
    setSaving(true);
    try {
      if (isEdit) {
        await updateTaskExtended(task.id, form);
        toast.success("Task updated!");
      } else {
        await createTaskExtended(form);
        toast.success("Task created! Interns notified.");
      }
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0d1117] border border-white/10 rounded-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <div>
            <h2 className="text-base font-bold text-white">
              {isEdit ? "Edit Task" : "Create New Task"}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {isEdit ? "Update task details" : "Fill in the details to assign a task to interns"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 overflow-y-auto p-5">
          <form id="task-form" onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <Label className="text-xs text-gray-400 mb-1.5 block">
                Task Title <span className="text-red-400">*</span>
              </Label>
              <Input
                value={form.title}
                onChange={(e) => set("title", e.target.value)}
                placeholder="e.g. Week 1 — Project Kickoff Report"
                required
                className="bg-white/5 border-white/10 text-white h-9 text-sm placeholder:text-gray-600"
              />
            </div>

            {/* Description */}
            <div>
              <Label className="text-xs text-gray-400 mb-1.5 block">
                Description <span className="text-red-400">*</span>
              </Label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Describe the task clearly — objectives, deliverables, format..."
                required
                className="bg-white/5 border border-white/10 rounded-lg text-white text-sm p-3 w-full focus:border-primary outline-none resize-none placeholder:text-gray-600"
              />
            </div>

            {/* Batch + Priority row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-gray-400 mb-1.5 block">
                  Assign To (Batch) <span className="text-red-400">*</span>
                </Label>
                <select
                  value={form.batchId}
                  onChange={(e) => set("batchId", e.target.value)}
                  disabled={isEdit}
                  required={!isEdit}
                  className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none w-full disabled:opacity-60 [&_option]:text-black"
                >
                  <option value="">— Select batch —</option>
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.program?.title} · {b.name}
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-gray-600 mt-1">
                  All selected interns in this batch will be assigned
                </p>
              </div>
              <div>
                <Label className="text-xs text-gray-400 mb-1.5 block">Priority</Label>
                <select
                  value={form.priority}
                  onChange={(e) => set("priority", e.target.value)}
                  className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none w-full [&_option]:text-black"
                >
                  <option value="LOW">🟢 Low</option>
                  <option value="MEDIUM">🟡 Medium</option>
                  <option value="HIGH">🔴 High</option>
                </select>
              </div>
            </div>

            {/* Deadline + Max Score row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-gray-400 mb-1.5 block">
                  Deadline <span className="text-red-400">*</span>
                </Label>
                <Input
                  type="date"
                  value={form.dueDate}
                  onChange={(e) => set("dueDate", e.target.value)}
                  required
                  className="bg-white/5 border-white/10 text-white h-9 text-sm"
                />
              </div>
              <div>
                <Label className="text-xs text-gray-400 mb-1.5 block">Max Score</Label>
                <Input
                  type="number"
                  value={form.maxScore}
                  onChange={(e) => set("maxScore", e.target.value)}
                  min="1"
                  max="1000"
                  className="bg-white/5 border-white/10 text-white h-9 text-sm"
                />
              </div>
            </div>

            {/* Resources */}
            <div>
              <Label className="text-xs text-gray-400 mb-1.5 block">
                Attachments / Resources
                <span className="text-gray-600 ml-1">(URLs, one per line)</span>
              </Label>
              <textarea
                rows={3}
                value={form.resources}
                onChange={(e) => set("resources", e.target.value)}
                placeholder={
                  "https://github.com/repo\nhttps://drive.google.com/file\nhttps://docs.google.com/..."
                }
                className="bg-white/5 border border-white/10 rounded-lg text-white text-sm p-3 w-full focus:border-primary outline-none resize-none placeholder:text-gray-600"
              />
              <p className="text-[10px] text-gray-600 mt-1 flex items-center gap-1">
                <Link2 className="h-3 w-3" />
                GitHub repos, Google Drive, documents, reference links
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-white/8 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1 border-white/10 text-gray-400 hover:text-white hover:bg-white/5 bg-transparent h-9 text-sm"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="task-form"
            disabled={saving}
            className="flex-1 h-9 text-sm"
          >
            {saving ? (
              <><RefreshCw className="h-3.5 w-3.5 mr-1 animate-spin" /> {isEdit ? "Saving..." : "Creating..."}</>
            ) : (
              <><Send className="h-3.5 w-3.5 mr-1" /> {isEdit ? "Save Changes" : "Create Task"}</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Extend Deadline Modal ────────────────────────────────────────────────────
function ExtendDeadlineModal({ task, onClose, onSuccess }) {
  const [newDate, setNewDate] = useState(
    task ? new Date(task.dueDate).toISOString().split("T")[0] : ""
  );
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newDate) return;
    setSaving(true);
    try {
      await extendTaskDeadline(task.id, newDate);
      toast.success("Deadline extended!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0d1117] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-white/8">
          <h2 className="text-sm font-bold text-white">Extend Deadline</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all">
            <X className="h-4 w-4" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <p className="text-xs text-gray-500">
            Task: <span className="text-white font-semibold">{task?.title}</span>
          </p>
          <div>
            <Label className="text-xs text-gray-400 mb-1.5 block">New Deadline</Label>
            <Input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              required
              min={new Date().toISOString().split("T")[0]}
              className="bg-white/5 border-white/10 text-white h-9 text-sm"
            />
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 border-white/10 text-gray-400 hover:text-white bg-transparent h-9 text-sm">
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="flex-1 h-9 text-sm">
              {saving ? "Saving..." : "Extend"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────
function DeleteConfirmModal({ task, onClose, onSuccess }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteTaskById(task.id);
      toast.success("Task deleted!");
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0d1117] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl">
        <div className="p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-red-400/10 flex items-center justify-center mx-auto mb-4">
            <Trash2 className="h-5 w-5 text-red-400" />
          </div>
          <h2 className="text-sm font-bold text-white mb-2">Delete Task</h2>
          <p className="text-xs text-gray-500 mb-1">
            Are you sure you want to delete
          </p>
          <p className="text-xs text-white font-semibold mb-4">&ldquo;{task?.title}&rdquo;?</p>
          <p className="text-[11px] text-red-400/80 mb-6">
            This will permanently delete the task and all submissions.
          </p>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/10 text-gray-400 hover:text-white bg-transparent h-9 text-sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              disabled={deleting}
              className="flex-1 h-9 text-sm bg-red-500/80 hover:bg-red-500 text-white border-0"
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Task Detail / Submission Review Panel ────────────────────────────────────
function TaskDetailPanel({ taskId, onClose, onReviewDone }) {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("submissions");
  const [reviewModal, setReviewModal] = useState(null); // { submission, internEntry }
  const [reviewForm, setReviewForm] = useState({ status: "APPROVED", score: "", feedback: "" });
  const [reviewing, setReviewing] = useState(false);

  const loadTask = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTaskWithSubmissions(taskId);
      setTask(data);
    } catch (err) {
      toast.error("Failed to load task details");
    } finally {
      setLoading(false);
    }
  }, [taskId]);

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  async function handleReview(e) {
    e.preventDefault();
    if (!reviewModal) return;
    setReviewing(true);
    try {
      await evaluateTaskSubmission(
        reviewModal.submission.id,
        reviewForm.status,
        reviewForm.score,
        reviewForm.feedback
      );
      toast.success(
        reviewForm.status === "APPROVED"
          ? "Submission approved! Attendance marked Present."
          : reviewForm.status === "REJECTED"
          ? "Submission rejected. Attendance marked Absent."
          : "Changes requested."
      );
      setReviewModal(null);
      setReviewForm({ status: "APPROVED", score: "", feedback: "" });
      await loadTask();
      onReviewDone?.();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setReviewing(false);
    }
  }

  const stats = useMemo(() => {
    if (!task) return {};
    const total = task.totalInterns;
    const submitted = task.submissionCount;
    const approved = task.approvedCount;
    const pending = task.submissions?.filter((s) => s.status === "PENDING").length ?? 0;
    const rejected = task.submissions?.filter((s) => s.status === "REJECTED").length ?? 0;
    const notSubmitted = total - submitted;
    return { total, submitted, approved, pending, rejected, notSubmitted };
  }, [task]);

  return (
    <>
      {/* Panel overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-2xl bg-[#0a0c14] border-l border-white/8 flex flex-col shadow-2xl overflow-hidden">
        {/* Panel Header */}
        <div className="p-5 border-b border-white/8 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                {task && <StatusBadge status={task.status} />}
                {task && <PriorityBadge priority={task.priority} />}
              </div>
              <h2 className="text-base font-bold text-white truncate">
                {loading ? "Loading..." : task?.title}
              </h2>
              {task && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {task.role} · Due {fmtDate(task.dueDate)} · {task.totalInterns} interns
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Summary stats */}
          {task && (
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[
                { label: "Total", value: stats.total, cls: "text-gray-300" },
                { label: "Submitted", value: stats.submitted, cls: "text-blue-400" },
                { label: "Approved", value: stats.approved, cls: "text-green-400" },
                { label: "Pending", value: stats.pending, cls: "text-amber-400" },
              ].map(({ label, value, cls }) => (
                <div
                  key={label}
                  className="text-center bg-white/3 rounded-lg p-2 border border-white/5"
                >
                  <p className={`text-lg font-bold ${cls}`}>{value}</p>
                  <p className="text-[10px] text-gray-600">{label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-1 mt-4 bg-white/3 p-1 rounded-lg">
            {["submissions", "overview"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-xs font-semibold py-1.5 rounded-md transition-all capitalize ${
                  activeTab === tab
                    ? "bg-primary/15 text-primary"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Panel Body */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-8 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-14 bg-white/3 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : !task ? (
            <div className="p-12 text-center text-gray-500 text-sm">Failed to load task.</div>
          ) : activeTab === "submissions" ? (
            <div className="p-4 space-y-2">
              {task.internList.length === 0 ? (
                <div className="text-center py-16">
                  <Users className="h-8 w-8 mx-auto mb-3 text-gray-700" />
                  <p className="text-gray-400 text-sm font-medium">No interns in this batch</p>
                </div>
              ) : (
                task.internList.map((intern) => {
                  const sub = intern.submission;
                  const subCfg = sub ? REVIEW_STATUS_CONFIG[sub.status] : null;
                  return (
                    <div
                      key={intern.applicationId}
                      className={`bg-white/3 border rounded-xl p-4 transition-all ${
                        intern.isOverdue
                          ? "border-red-500/20"
                          : "border-white/5 hover:border-white/10"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        {/* Intern Info */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                            {intern.user?.name?.[0]?.toUpperCase() || "?"}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-white truncate">
                              {intern.user?.name || "Unknown"}
                            </p>
                            <p className="text-[10px] text-gray-500 truncate">
                              {intern.user?.email}
                            </p>
                          </div>
                        </div>

                        {/* Submission Status */}
                        <div className="flex-shrink-0 text-right">
                          {sub ? (
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-semibold ${subCfg.badge}`}
                            >
                              {subCfg.label}
                            </span>
                          ) : intern.isOverdue ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-semibold text-red-400 bg-red-400/10 border-red-400/20">
                              <AlertTriangle className="h-2.5 w-2.5" />
                              Not Submitted
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-semibold text-gray-500 bg-gray-500/10 border-gray-500/20">
                              Awaiting
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Submission details */}
                      {sub && (
                        <div className="mt-3 pl-11 space-y-2">
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div className="flex items-center gap-4 text-[10px] text-gray-500">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Submitted {fmtDatetime(sub.submittedAt)}
                              </span>
                              {sub.score != null && (
                                <span className="flex items-center gap-1 text-amber-400">
                                  <Star className="h-3 w-3" />
                                  Score: {sub.score}/{task.maxScore}
                                </span>
                              )}
                            </div>
                            {sub.fileUrl && (
                              <a
                                href={sub.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-1 text-[10px] text-primary hover:underline"
                              >
                                <ExternalLink className="h-2.5 w-2.5" />
                                View Submission
                              </a>
                            )}
                          </div>

                          {sub.notes && (
                            <p className="text-[10px] text-gray-500">
                              <span className="text-gray-400">Notes: </span>
                              {sub.notes}
                            </p>
                          )}

                          {sub.feedback && (
                            <p className="text-[10px] text-gray-500 border-l-2 border-primary/30 pl-2">
                              <span className="text-gray-400">Feedback: </span>
                              {sub.feedback}
                            </p>
                          )}

                          {/* Review Actions */}
                          {(sub.status === "PENDING" || sub.status === "NEEDS_REVISION") && (
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => {
                                  setReviewModal({ submission: sub, intern });
                                  setReviewForm({ status: "APPROVED", score: "", feedback: "" });
                                }}
                                className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-md bg-green-400/10 text-green-400 border border-green-400/20 hover:bg-green-400/20 transition-all font-semibold"
                              >
                                <ThumbsUp className="h-3 w-3" />
                                Approve
                              </button>
                              <button
                                onClick={() => {
                                  setReviewModal({ submission: sub, intern });
                                  setReviewForm({ status: "REJECTED", score: "", feedback: "" });
                                }}
                                className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-md bg-red-400/10 text-red-400 border border-red-400/20 hover:bg-red-400/20 transition-all font-semibold"
                              >
                                <ThumbsDown className="h-3 w-3" />
                                Reject
                              </button>
                              <button
                                onClick={() => {
                                  setReviewModal({ submission: sub, intern });
                                  setReviewForm({
                                    status: "NEEDS_REVISION",
                                    score: "",
                                    feedback: "",
                                  });
                                }}
                                className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-md bg-orange-400/10 text-orange-400 border border-orange-400/20 hover:bg-orange-400/20 transition-all font-semibold"
                              >
                                <MessageSquare className="h-3 w-3" />
                                Request Changes
                              </button>
                            </div>
                          )}

                          {sub.status === "APPROVED" && (
                            <p className="text-[10px] text-green-400 flex items-center gap-1">
                              <UserCheck className="h-3 w-3" />
                              Attendance auto-marked as Present
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            /* Overview tab */
            <div className="p-5 space-y-5">
              {/* Task Info */}
              <div className="bg-white/3 border border-white/8 rounded-xl p-4 space-y-3">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Task Details
                </h3>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Description</p>
                  <p className="text-sm text-white leading-relaxed">{task.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Batch</p>
                    <p className="text-xs text-white font-semibold">{task.batch?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Role / Program</p>
                    <p className="text-xs text-white font-semibold">{task.role}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Deadline</p>
                    <p className="text-xs text-white font-semibold">{fmtDate(task.dueDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Max Score</p>
                    <p className="text-xs text-white font-semibold">{task.maxScore} pts</p>
                  </div>
                </div>
              </div>

              {/* Submission completion bar */}
              <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Submission Progress
                  </h3>
                  <span className="text-xs text-gray-400">
                    {stats.submitted}/{stats.total}
                  </span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-blue-400 rounded-full transition-all"
                    style={{
                      width: `${stats.total > 0 ? (stats.submitted / stats.total) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {[
                    { label: "Not Submitted", value: stats.notSubmitted, cls: "text-gray-500" },
                    { label: "Pending", value: stats.pending, cls: "text-amber-400" },
                    { label: "Approved", value: stats.approved, cls: "text-green-400" },
                    { label: "Rejected", value: stats.rejected, cls: "text-red-400" },
                  ].map(({ label, value, cls }) => (
                    <div key={label} className="text-center">
                      <p className={`text-base font-bold ${cls}`}>{value}</p>
                      <p className="text-[10px] text-gray-600">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              {task.links?.length > 0 && (
                <div className="bg-white/3 border border-white/8 rounded-xl p-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    Resources & Attachments
                  </h3>
                  <div className="space-y-2">
                    {task.links.map((link, i) => (
                      <a
                        key={i}
                        href={link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 hover:underline"
                      >
                        <ExternalLink className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{link}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Attendance Auto-Logic Note */}
              <div className="bg-blue-400/5 border border-blue-400/20 rounded-xl p-4">
                <h3 className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Attendance Auto-Logic
                </h3>
                <ul className="space-y-1 text-[11px] text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    Approving submission → marks intern <span className="text-green-400 font-semibold ml-1">Present</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                    Rejecting submission → marks intern <span className="text-red-400 font-semibold ml-1">Absent</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                    No submission past deadline → mark manually in Attendance
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Review Sub-Modal */}
      {reviewModal && (
        <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0d1117] border border-white/10 rounded-2xl w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-white/8">
              <div>
                <h2 className="text-sm font-bold text-white">Submit Review</h2>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  {reviewModal.intern?.user?.name} · {task?.title}
                </p>
              </div>
              <button
                onClick={() => setReviewModal(null)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleReview} className="p-5 space-y-4">
              {/* Status */}
              <div>
                <Label className="text-xs text-gray-400 mb-1.5 block">Decision</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "APPROVED", label: "Approve", cls: "border-green-400/30 text-green-400 data-[active=true]:bg-green-400/10" },
                    { value: "REJECTED", label: "Reject", cls: "border-red-400/30 text-red-400 data-[active=true]:bg-red-400/10" },
                    { value: "NEEDS_REVISION", label: "Request Changes", cls: "border-orange-400/30 text-orange-400 data-[active=true]:bg-orange-400/10" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      data-active={reviewForm.status === opt.value}
                      onClick={() => setReviewForm((p) => ({ ...p, status: opt.value }))}
                      className={`px-3 py-2 rounded-lg border text-xs font-semibold transition-all ${opt.cls} ${
                        reviewForm.status === opt.value ? "bg-white/5" : "bg-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Score */}
              <div>
                <Label className="text-xs text-gray-400 mb-1.5 block">
                  Score <span className="text-gray-600">(optional, out of {task?.maxScore})</span>
                </Label>
                <Input
                  type="number"
                  value={reviewForm.score}
                  onChange={(e) => setReviewForm((p) => ({ ...p, score: e.target.value }))}
                  placeholder={`0 – ${task?.maxScore}`}
                  min="0"
                  max={task?.maxScore}
                  className="bg-white/5 border-white/10 text-white h-9 text-sm"
                />
              </div>

              {/* Feedback */}
              <div>
                <Label className="text-xs text-gray-400 mb-1.5 block">
                  Feedback <span className="text-gray-600">(optional)</span>
                </Label>
                <textarea
                  rows={3}
                  value={reviewForm.feedback}
                  onChange={(e) => setReviewForm((p) => ({ ...p, feedback: e.target.value }))}
                  placeholder="Leave feedback for the intern..."
                  className="bg-white/5 border border-white/10 rounded-lg text-white text-sm p-3 w-full focus:border-primary outline-none resize-none placeholder:text-gray-600"
                />
              </div>

              {reviewForm.status === "APPROVED" && (
                <p className="text-[11px] text-green-400 flex items-center gap-1.5 bg-green-400/5 border border-green-400/15 rounded-lg px-3 py-2">
                  <UserCheck className="h-3.5 w-3.5" />
                  Attendance will be auto-marked as Present
                </p>
              )}

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setReviewModal(null)}
                  className="flex-1 border-white/10 text-gray-400 hover:text-white bg-transparent h-9 text-sm"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={reviewing} className="flex-1 h-9 text-sm">
                  {reviewing ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Row Actions Dropdown ─────────────────────────────────────────────────────
function RowActionsMenu({ task, onEdit, onDelete, onClose, onExtend, onView }) {
  const [open, setOpen] = useState(false);

  function action(fn) {
    setOpen(false);
    fn();
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-all"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 bg-[#0d1117] border border-white/10 rounded-xl shadow-2xl py-1 w-44 overflow-hidden">
            <button
              onClick={() => action(onView)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <Eye className="h-3.5 w-3.5 text-gray-500" />
              View Submissions
            </button>
            <button
              onClick={() => action(onEdit)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <Pencil className="h-3.5 w-3.5 text-gray-500" />
              Edit Task
            </button>
            <button
              onClick={() => action(onExtend)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              <Clock className="h-3.5 w-3.5 text-gray-500" />
              Extend Deadline
            </button>
            {task.status !== "CLOSED" && (
              <button
                onClick={() => action(onClose)}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                <Lock className="h-3.5 w-3.5 text-gray-500" />
                Close Task
              </button>
            )}
            <div className="h-px bg-white/5 my-1" />
            <button
              onClick={() => action(onDelete)}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-400 hover:bg-red-400/5 transition-all"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete Task
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AdminTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [batches, setBatches] = useState([]);
  const [analytics, setAnalytics] = useState({
    total: 0, active: 0, overdue: 0, completed: 0, submissionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  // Modals / panels
  const [showCreate, setShowCreate] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  const [extendTask, setExtendTask] = useState(null);
  const [detailTaskId, setDetailTaskId] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterBatch, setFilterBatch] = useState("");

  // Load data
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [tasksData, batchesData, analyticsData] = await Promise.all([
        getAllTasksWithStats(),
        getBatches(),
        getTaskAnalyticsSummary(),
      ]);
      setTasks(tasksData);
      setBatches(batchesData);
      setAnalytics(analyticsData);
    } catch (err) {
      toast.error("Failed to load tasks: " + err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Close a task
  async function handleCloseTask(task) {
    try {
      await closeTaskById(task.id);
      toast.success("Task closed!");
      loadData();
    } catch (err) {
      toast.error(err.message);
    }
  }

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (search && !t.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterStatus && t.status !== filterStatus) return false;
      if (filterPriority && t.priority !== filterPriority) return false;
      if (filterBatch && t.batchId !== filterBatch) return false;
      return true;
    });
  }, [tasks, search, filterStatus, filterPriority, filterBatch]);

  const hasFilters = search || filterStatus || filterPriority || filterBatch;

  return (
    <div className="space-y-6">
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Create, assign, and review intern tasks — TechieHelp Institute of AI
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={loadData}
            className="h-9 text-xs border-white/10 text-gray-400 hover:text-white bg-transparent gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Refresh
          </Button>
          <Button
            size="sm"
            className="h-9 text-xs gap-1.5"
            onClick={() => setShowCreate(true)}
          >
            <Plus className="h-3.5 w-3.5" />
            Create Task
          </Button>
        </div>
      </div>

      {/* ── Analytics Cards ───────────────────────────────────────────── */}
      <AnalyticsCards analytics={analytics} />

      {/* ── Search & Filters ─────────────────────────────────────────── */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white/5 border border-white/10 text-white text-sm rounded-lg pl-9 pr-3 py-2 focus:border-primary outline-none w-full placeholder:text-gray-600"
            />
          </div>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none sm:w-40 [&_option]:text-black"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="OVERDUE">Overdue</option>
            <option value="COMPLETED">Completed</option>
            <option value="CLOSED">Closed</option>
          </select>

          {/* Priority filter */}
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none sm:w-40 [&_option]:text-black"
          >
            <option value="">All Priorities</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          {/* Batch filter */}
          <select
            value={filterBatch}
            onChange={(e) => setFilterBatch(e.target.value)}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none sm:w-48 [&_option]:text-black"
          >
            <option value="">All Batches</option>
            {batches.map((b) => (
              <option key={b.id} value={b.id}>
                {b.program?.title} · {b.name}
              </option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs text-gray-500">
              Showing {filteredTasks.length} of {tasks.length} tasks
            </span>
            <button
              onClick={() => {
                setSearch("");
                setFilterStatus("");
                setFilterPriority("");
                setFilterBatch("");
              }}
              className="text-xs text-primary hover:underline flex items-center gap-1"
            >
              <X className="h-3 w-3" />
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* ── Tasks Table ──────────────────────────────────────────────── */}
      <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-white/3 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="h-8 w-8 mx-auto mb-3 text-gray-700" />
            <p className="text-gray-400 font-medium text-sm">
              {hasFilters ? "No tasks match your filters" : "No tasks created yet"}
            </p>
            <p className="text-gray-600 text-xs mt-1">
              {hasFilters
                ? "Try adjusting the search or filters above"
                : "Click 'Create Task' to assign your first task to interns"}
            </p>
            {!hasFilters && (
              <Button
                size="sm"
                className="mt-4 text-xs h-8 gap-1"
                onClick={() => setShowCreate(true)}
              >
                <Plus className="h-3.5 w-3.5" />
                Create First Task
              </Button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="border-b border-white/8 text-gray-500 text-xs uppercase tracking-wider bg-white/2">
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Task Title</th>
                  <th className="px-4 py-3 text-left hidden md:table-cell">Role / Batch</th>
                  <th className="px-4 py-3 text-center">Interns</th>
                  <th className="px-4 py-3 text-left hidden lg:table-cell">Deadline</th>
                  <th className="px-4 py-3 text-center">Priority</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Submissions</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredTasks.map((task, idx) => {
                  const deadlinePassed = new Date(task.dueDate) < new Date();
                  return (
                    <tr
                      key={task.id}
                      className="hover:bg-white/2 transition-colors group"
                    >
                      {/* # */}
                      <td className="px-4 py-3.5 text-xs text-gray-600">{idx + 1}</td>

                      {/* Task Title */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-start gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <BookOpen className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <button
                              onClick={() => setDetailTaskId(task.id)}
                              className="text-xs font-semibold text-white hover:text-primary transition-colors text-left line-clamp-1"
                            >
                              {task.title}
                            </button>
                            <p className="text-[10px] text-gray-600 mt-0.5 line-clamp-1">
                              {task.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role / Batch */}
                      <td className="px-4 py-3.5 hidden md:table-cell">
                        <p className="text-xs font-medium text-white">{task.role}</p>
                        <p className="text-[10px] text-gray-600 mt-0.5">{task.batch?.name}</p>
                      </td>

                      {/* Interns */}
                      <td className="px-4 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Users className="h-3 w-3 text-gray-500" />
                          <span className="text-xs text-gray-300">{task.totalInterns}</span>
                        </div>
                      </td>

                      {/* Deadline */}
                      <td className="px-4 py-3.5 hidden lg:table-cell">
                        <span
                          className={`flex items-center gap-1 text-xs ${
                            deadlinePassed && task.status !== "COMPLETED"
                              ? "text-red-400"
                              : "text-gray-400"
                          }`}
                        >
                          <Calendar className="h-3 w-3" />
                          {fmtDate(task.dueDate)}
                        </span>
                      </td>

                      {/* Priority */}
                      <td className="px-4 py-3.5 text-center">
                        <PriorityBadge priority={task.priority} />
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5 text-center">
                        <StatusBadge status={task.status} />
                      </td>

                      {/* Submissions */}
                      <td className="px-4 py-3.5 text-center">
                        <button
                          onClick={() => setDetailTaskId(task.id)}
                          className="group/sub flex flex-col items-center hover:opacity-80 transition-opacity"
                        >
                          <span className="text-xs font-bold text-white">
                            {task.submissionCount}/{task.totalInterns}
                          </span>
                          <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                            <div
                              className={`h-full rounded-full transition-all ${
                                task.approvedCount === task.totalInterns && task.totalInterns > 0
                                  ? "bg-green-400"
                                  : task.submissionCount > 0
                                  ? "bg-primary"
                                  : "bg-white/20"
                              }`}
                              style={{
                                width: `${
                                  task.totalInterns > 0
                                    ? (task.submissionCount / task.totalInterns) * 100
                                    : 0
                                }%`,
                              }}
                            />
                          </div>
                          <span className="text-[9px] text-gray-600 mt-0.5 group-hover/sub:text-primary transition-colors">
                            {task.approvedCount} approved
                          </span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => setDetailTaskId(task.id)}
                            className="p-1.5 rounded-lg text-gray-500 hover:text-primary hover:bg-primary/10 transition-all"
                            title="View submissions"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <RowActionsMenu
                            task={task}
                            onView={() => setDetailTaskId(task.id)}
                            onEdit={() => setEditTask(task)}
                            onDelete={() => setDeleteTask(task)}
                            onClose={() => handleCloseTask(task)}
                            onExtend={() => setExtendTask(task)}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Table Footer */}
            <div className="px-4 py-3 border-t border-white/8 bg-white/1 flex items-center justify-between">
              <p className="text-xs text-gray-600">
                {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""} shown
              </p>
              <p className="text-xs text-gray-600">
                {analytics.submissionRate}% overall submission rate
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ── Modals ────────────────────────────────────────────────────── */}

      {/* Create Task */}
      {showCreate && (
        <TaskFormModal
          batches={batches}
          onClose={() => setShowCreate(false)}
          onSuccess={loadData}
        />
      )}

      {/* Edit Task */}
      {editTask && (
        <TaskFormModal
          batches={batches}
          task={editTask}
          onClose={() => setEditTask(null)}
          onSuccess={loadData}
        />
      )}

      {/* Delete Task */}
      {deleteTask && (
        <DeleteConfirmModal
          task={deleteTask}
          onClose={() => setDeleteTask(null)}
          onSuccess={loadData}
        />
      )}

      {/* Extend Deadline */}
      {extendTask && (
        <ExtendDeadlineModal
          task={extendTask}
          onClose={() => setExtendTask(null)}
          onSuccess={loadData}
        />
      )}

      {/* Task Detail / Submission Review Panel */}
      {detailTaskId && (
        <TaskDetailPanel
          taskId={detailTaskId}
          onClose={() => setDetailTaskId(null)}
          onReviewDone={loadData}
        />
      )}
    </div>
  );
}
