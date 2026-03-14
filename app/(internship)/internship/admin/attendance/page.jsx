"use client";

import { useState, useEffect } from "react";
import { getBatches, bulkMarkAttendance } from "@/actions/internship-admin";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminAttendancePage() {
  const [batches, setBatches] = useState([]);
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [batchDetails, setBatchDetails] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [presentIds, setPresentIds] = useState(new Set());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getBatches().then(setBatches);
  }, []);

  useEffect(() => {
    if (selectedBatchId) {
      loadBatchStudents(selectedBatchId);
    } else {
      setBatchDetails(null);
    }
  }, [selectedBatchId]);

  async function loadBatchStudents(batchId) {
    const res = await fetch(`/api/internship/batches/${batchId}`).catch(() => null);
    if (res?.ok) {
      const data = await res.json();
      setBatchDetails(data);
      // Auto-select all as present by default
      const allIds = data.applications?.filter(a => a.status === "SELECTED").map(a => a.id) || [];
      setPresentIds(new Set(allIds));
    }
  }

  const handleTogglePresent = (appId) => {
    setPresentIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(appId)) newSet.delete(appId);
      else newSet.add(appId);
      return newSet;
    });
  };

  const handleSave = async () => {
    if (!selectedBatchId || !date) return;
    setSaving(true);
    try {
      await bulkMarkAttendance(selectedBatchId, date, Array.from(presentIds));
      toast.success("Attendance saved successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Attendance Management</h1>
          <p className="text-gray-500 text-sm mt-0.5">Mark daily attendance for active intern batches</p>
        </div>
      </div>

      <div className="bg-white/3 border border-white/8 rounded-xl p-5 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="text-xs text-gray-400 block mb-1.5">Select Batch</label>
          <select 
            value={selectedBatchId} 
            onChange={(e) => setSelectedBatchId(e.target.value)} 
            className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none w-full"
          >
            <option value="">— Select a Batch —</option>
            {batches.filter(b => b.status === "ACTIVE" || b.status === "UPCOMING").map(b => (
              <option key={b.id} value={b.id}>{b.program?.title} - {b.name} ({b.status})</option>
            ))}
          </select>
        </div>
        <div className="sm:w-48">
          <label className="text-xs text-gray-400 block mb-1.5">Date</label>
          <input 
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none w-full"
          />
        </div>
      </div>

      {!selectedBatchId ? (
        <div className="text-center py-16 bg-white/3 border border-white/8 rounded-xl">
          <CalendarIcon className="h-8 w-8 mx-auto mb-3 text-gray-600" />
          <p className="text-gray-500 text-sm">Select an active batch above to mark attendance.</p>
        </div>
      ) : !batchDetails ? (
        <div className="animate-pulse bg-white/3 border border-white/8 rounded-xl h-64" />
      ) : (
        <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/8 flex items-center justify-between bg-white/2">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" /> Active Interns
            </h2>
            <p className="text-xs text-gray-400">
              <span className="text-green-400 font-bold">{presentIds.size}</span> / {batchDetails.applications?.filter(a => a.status === "SELECTED").length} Present
            </p>
          </div>
          
          <div className="divide-y divide-white/5 max-h-[60vh] overflow-y-auto">
            {batchDetails.applications?.filter(a => a.status === "SELECTED").length === 0 ? (
              <p className="text-center py-8 text-sm text-gray-500">No active selected interns in this batch.</p>
            ) : (
              batchDetails.applications?.filter(a => a.status === "SELECTED").map((app) => {
                const isPresent = presentIds.has(app.id);
                return (
                  <div key={app.id} className="flex items-center justify-between p-4 hover:bg-white/2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                        {app.user?.name?.[0]?.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{app.user?.name}</p>
                        <p className="text-[10px] text-gray-500">{app.user?.branch || "Student"}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleTogglePresent(app.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                        isPresent 
                          ? "bg-green-400/10 text-green-400 border-green-400/20" 
                          : "bg-red-400/10 text-red-400 border-red-400/20"
                      }`}
                    >
                      {isPresent ? <CheckCircle className="h-3.5 w-3.5" /> : <div className="h-3.5 w-3.5 rounded-full border-2 border-red-400" />}
                      {isPresent ? "Present" : "Absent"}
                    </button>
                  </div>
                );
              })
            )}
          </div>
          
          {batchDetails.applications?.filter(a => a.status === "SELECTED").length > 0 && (
            <div className="p-4 border-t border-white/8 bg-black/20 flex justify-end">
              <Button onClick={handleSave} disabled={saving} className="w-full sm:w-auto">
                {saving ? "Saving..." : "Save Daily Attendance"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
