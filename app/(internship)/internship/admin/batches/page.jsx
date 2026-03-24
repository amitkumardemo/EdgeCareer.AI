"use client";

import { useState, useEffect, useCallback } from "react";
import { getBatches, createBatch, getInternshipPrograms, createInternshipProgram, updateBatchStatus } from "@/actions/internship-admin";
import { toast } from "sonner";
import Link from "next/link";
import { Plus, BookOpen, Users, ChevronRight, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STATUS_COLORS = {
  UPCOMING: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  ACTIVE: "text-green-400 bg-green-400/10 border-green-400/20",
  COMPLETED: "text-gray-400 bg-gray-400/10 border-gray-400/20",
  CANCELLED: "text-red-400 bg-red-400/10 border-red-400/20",
};

export default function BatchesPage() {
  const [batches, setBatches] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [showBatchForm, setShowBatchForm] = useState(false);
  const [showProgForm, setShowProgForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [batchForm, setBatchForm] = useState({ programId: "", name: "", startDate: "", endDate: "", maxStudents: "100", description: "" });
  const [progForm, setProgForm] = useState({ title: "", description: "", domain: "", duration: "8", stipend: "" });

  const load = useCallback(async () => {
    setLoading(true);
    const [b, p] = await Promise.all([getBatches(), getInternshipPrograms()]);
    setBatches(b);
    setPrograms(p);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  async function handleCreateBatch(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await createBatch(batchForm);
      toast.success("Batch created!");
      setShowBatchForm(false);
      setBatchForm({ programId: "", name: "", startDate: "", endDate: "", maxStudents: "100", description: "" });
      await load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleCreateProgram(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await createInternshipProgram(progForm);
      toast.success("Program created!");
      setShowProgForm(false);
      setProgForm({ title: "", description: "", domain: "", duration: "8", stipend: "" });
      await load();
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
          <h1 className="text-2xl font-bold text-white">Batches & Programs</h1>
          <p className="text-gray-500 text-sm mt-0.5">{batches.length} batch{batches.length !== 1 ? "es" : ""}</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="border-white/15 text-white hover:bg-white/5 text-xs" onClick={() => setShowProgForm(true)}>
            <Plus className="h-3.5 w-3.5 mr-1" /> New Program
          </Button>
          <Button size="sm" className="text-xs" onClick={() => setShowBatchForm(true)}>
            <Plus className="h-3.5 w-3.5 mr-1" /> New Batch
          </Button>
        </div>
      </div>

      {/* Program Form Modal */}
      {showProgForm && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-white">New Internship Program</h2>
              <button onClick={() => setShowProgForm(false)}><X className="h-4 w-4 text-gray-400" /></button>
            </div>
            <form onSubmit={handleCreateProgram} className="space-y-4">
              <div className="grid gap-1.5"><Label className="text-xs text-gray-400">Program Title</Label><Input placeholder="e.g. Web Dev Internship" value={progForm.title} onChange={e => setProgForm({...progForm, title: e.target.value})} required className="bg-white/5 border-white/10 text-white h-9 text-sm" /></div>
              <div className="grid gap-1.5"><Label className="text-xs text-gray-400">Domain</Label><Input placeholder="e.g. Web Development, ML, Data Science" value={progForm.domain} onChange={e => setProgForm({...progForm, domain: e.target.value})} required className="bg-white/5 border-white/10 text-white h-9 text-sm" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5"><Label className="text-xs text-gray-400">Duration (weeks)</Label><Input type="number" value={progForm.duration} onChange={e => setProgForm({...progForm, duration: e.target.value})} required className="bg-white/5 border-white/10 text-white h-9 text-sm" /></div>
                <div className="grid gap-1.5"><Label className="text-xs text-gray-400">Stipend (₹, optional)</Label><Input type="number" placeholder="0" value={progForm.stipend} onChange={e => setProgForm({...progForm, stipend: e.target.value})} className="bg-white/5 border-white/10 text-white h-9 text-sm" /></div>
              </div>
              <div className="grid gap-1.5"><Label className="text-xs text-gray-400">Description</Label><textarea rows={3} placeholder="Brief description..." value={progForm.description} onChange={e => setProgForm({...progForm, description: e.target.value})} required className="bg-white/5 border border-white/10 rounded-md text-white text-sm p-2 w-full focus:border-primary outline-none resize-none" /></div>
              <Button type="submit" className="w-full h-9 text-sm" disabled={saving}>{saving ? "Creating..." : "Create Program"}</Button>
            </form>
          </div>
        </div>
      )}

      {/* Batch Form Modal */}
      {showBatchForm && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-white">New Internship Batch</h2>
              <button onClick={() => setShowBatchForm(false)}><X className="h-4 w-4 text-gray-400" /></button>
            </div>
            <form onSubmit={handleCreateBatch} className="space-y-4">
              <div className="grid gap-1.5"><Label className="text-xs text-gray-400">Program</Label>
                <select value={batchForm.programId} onChange={e => setBatchForm({...batchForm, programId: e.target.value})} required className="bg-white/5 border border-white/10 rounded-md text-white text-sm p-2 focus:border-primary outline-none">
                  <option value="">Select Program</option>
                  {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                </select>
              </div>
              <div className="grid gap-1.5"><Label className="text-xs text-gray-400">Batch Name</Label><Input placeholder="e.g. Batch Jan 2025" value={batchForm.name} onChange={e => setBatchForm({...batchForm, name: e.target.value})} required className="bg-white/5 border-white/10 text-white h-9 text-sm" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-1.5"><Label className="text-xs text-gray-400">Start Date</Label><Input type="date" value={batchForm.startDate} onChange={e => setBatchForm({...batchForm, startDate: e.target.value})} required className="bg-white/5 border-white/10 text-white h-9 text-sm" /></div>
                <div className="grid gap-1.5"><Label className="text-xs text-gray-400">End Date</Label><Input type="date" value={batchForm.endDate} onChange={e => setBatchForm({...batchForm, endDate: e.target.value})} required className="bg-white/5 border-white/10 text-white h-9 text-sm" /></div>
              </div>
              <div className="grid gap-1.5"><Label className="text-xs text-gray-400">Max Students</Label><Input type="number" value={batchForm.maxStudents} onChange={e => setBatchForm({...batchForm, maxStudents: e.target.value})} className="bg-white/5 border-white/10 text-white h-9 text-sm" /></div>
              <Button type="submit" className="w-full h-9 text-sm" disabled={saving}>{saving ? "Creating..." : "Create Batch"}</Button>
            </form>
          </div>
        </div>
      )}

      {/* Batches Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? (
          Array(3).fill(0).map((_, i) => <div key={i} className="animate-pulse bg-white/3 border border-white/8 rounded-xl h-44" />)
        ) : batches.length === 0 ? (
          <div className="col-span-3 text-center py-16 text-gray-600">No batches yet. Create your first batch above.</div>
        ) : (
          batches.map((batch) => (
            <Link key={batch.id} href={`/internship/admin/batches/${batch.id}`}
              className="bg-white/3 border border-white/8 rounded-xl p-5 hover:border-primary/30 hover:bg-white/5 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${STATUS_COLORS[batch.status]}`}>
                  {batch.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white mb-0.5">{batch.name}</h3>
              <p className="text-[11px] text-gray-500 mb-3">{batch.program?.title} · {batch.program?.domain}</p>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {batch._count.applications} applied</span>
                <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {batch._count.tasks} tasks</span>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                <span className="text-[10px] text-gray-600 flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> 
                  {new Date(batch.startDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })} - {new Date(batch.endDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <ChevronRight className="h-3.5 w-3.5 text-gray-600 group-hover:text-primary transition-colors" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
