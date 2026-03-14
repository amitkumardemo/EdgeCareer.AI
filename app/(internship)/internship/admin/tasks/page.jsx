"use client";

import { useState, useEffect } from "react";
import { getBatches, createTask, getBatchDetail } from "@/actions/internship-admin";
import { toast } from "sonner";
import { Plus, BookOpen, Calendar, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TasksPage({ searchParams }) {
  const [batches, setBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(searchParams?.batch || "");
  const [batchDetail, setBatchDetail] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", dueDate: "", maxScore: "100", resources: "" });

  useEffect(() => { getBatches().then(setBatches); }, []);
  useEffect(() => {
    if (selectedBatch) getBatchDetail(selectedBatch).then(setBatchDetail);
    else setBatchDetail(null);
  }, [selectedBatch]);

  async function handleCreate(e) {
    e.preventDefault();
    if (!selectedBatch) return toast.error("Select a batch first");
    setSaving(true);
    try {
      await createTask({ ...form, batchId: selectedBatch });
      toast.success("Task created!");
      setShowForm(false);
      setForm({ title: "", description: "", dueDate: "", maxScore: "100", resources: "" });
      getBatchDetail(selectedBatch).then(setBatchDetail);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Tasks Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">Create and manage internship tasks per batch</p>
        </div>
        <Button size="sm" className="text-xs" onClick={() => setShowForm(true)}>
          <Plus className="h-3.5 w-3.5 mr-1" /> Create Task
        </Button>
      </div>

      {/* Batch selector */}
      <div className="bg-white/3 border border-white/8 rounded-xl p-4">
        <Label className="text-xs text-gray-400 mb-2 block">Select Batch to Manage</Label>
        <select value={selectedBatch} onChange={e => setSelectedBatch(e.target.value)}
          className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none w-full max-w-md"
        >
          <option value="">— Choose a batch —</option>
          {batches.map(b => <option key={b.id} value={b.id}>{b.name} ({b.program?.title})</option>)}
        </select>
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-white">New Task</h2>
              <button onClick={() => setShowForm(false)}><X className="h-4 w-4 text-gray-400" /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div><Label className="text-xs text-gray-400">Task Title</Label><Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g. Week 1 Project Report" required className="bg-white/5 border-white/10 text-white h-9 text-sm mt-1" /></div>
              <div><Label className="text-xs text-gray-400">Description</Label><textarea rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="Describe the task clearly..." required className="bg-white/5 border border-white/10 rounded-md text-white text-sm p-2 w-full focus:border-primary outline-none resize-none mt-1" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-xs text-gray-400">Due Date</Label><Input type="date" value={form.dueDate} onChange={e => setForm({...form, dueDate: e.target.value})} required className="bg-white/5 border-white/10 text-white h-9 text-sm mt-1" /></div>
                <div><Label className="text-xs text-gray-400">Max Score</Label><Input type="number" value={form.maxScore} onChange={e => setForm({...form, maxScore: e.target.value})} className="bg-white/5 border-white/10 text-white h-9 text-sm mt-1" /></div>
              </div>
              <div><Label className="text-xs text-gray-400">Resources (URL, optional)</Label><Input value={form.resources} onChange={e => setForm({...form, resources: e.target.value})} placeholder="https://..." className="bg-white/5 border-white/10 text-white h-9 text-sm mt-1" /></div>
              <Button type="submit" className="w-full h-9 text-sm" disabled={saving}>{saving ? "Creating..." : "Create Task"}</Button>
            </form>
          </div>
        </div>
      )}

      {/* Task List */}
      {batchDetail && (
        <div className="bg-white/3 border border-white/8 rounded-xl p-5">
          <h2 className="text-sm font-bold text-white mb-4">Tasks in: {batchDetail.name}</h2>
          <div className="space-y-3">
            {batchDetail.tasks.length === 0 ? (
              <p className="text-xs text-gray-600 text-center py-8">No tasks yet in this batch. Create one above.</p>
            ) : (
              batchDetail.tasks.map((task) => {
                const overdue = new Date(task.dueDate) < new Date();
                return (
                  <div key={task.id} className="flex items-start gap-4 p-4 rounded-xl bg-white/3 border border-white/5">
                    <div className="p-2 bg-primary/10 rounded-lg mt-0.5"><BookOpen className="h-4 w-4 text-primary" /></div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{task.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{task.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className={`flex items-center gap-1 text-xs ${overdue ? "text-red-400" : "text-gray-500"}`}>
                          <Calendar className="h-3 w-3" /> {new Date(task.dueDate).toLocaleDateString("en-IN")}
                          {overdue && " (Overdue)"}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500"><Star className="h-3 w-3" /> Max: {task.maxScore}</span>
                        <span className="text-xs text-gray-600">{task.submissions?.length || 0} submissions</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
