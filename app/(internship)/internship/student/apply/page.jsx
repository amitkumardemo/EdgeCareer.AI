"use client";

import { useState, useEffect } from "react";
import { getOpenBatches, applyToInternship } from "@/actions/internship-student";
import { toast } from "sonner";
import { BookOpen, Calendar, Users, Star, ChevronRight, X, Briefcase, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ApplyPage() {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [applying, setApplying] = useState(false);
  const [coverNote, setCoverNote] = useState("");

  useEffect(() => {
    getOpenBatches().then((b) => { setBatches(b); setLoading(false); });
  }, []);

  async function handleApply() {
    if (!selected) return;
    setApplying(true);
    try {
      await applyToInternship(selected.id, coverNote);
      toast.success("Application submitted successfully!");
      setSelected(null);
      setCoverNote("");
      getOpenBatches().then(setBatches);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setApplying(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Apply for Internship</h1>
        <p className="text-gray-500 text-sm mt-0.5">Browse open batches and submit your application</p>
      </div>

      {/* Apply modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold text-white">{selected.program?.title}</h2>
                <p className="text-xs text-gray-500">{selected.name}</p>
              </div>
              <button onClick={() => setSelected(null)}><X className="h-4 w-4 text-gray-400" /></button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-5 text-center">
              {[
                { label: "Duration", value: `${selected.program?.duration}w` },
                { label: "Stipend", value: selected.program?.stipend ? `₹${selected.program.stipend}` : "Unpaid" },
                { label: "Seats Left", value: selected.maxStudents - selected._count.applications },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white/5 rounded-lg p-2.5">
                  <p className="text-sm font-bold text-white">{value}</p>
                  <p className="text-[10px] text-gray-500">{label}</p>
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="text-xs text-gray-400 block mb-1.5">Cover Note (optional)</label>
              <textarea
                rows={4}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Tell us why you want to join this internship..."
                className="bg-white/5 border border-white/10 rounded-lg text-white text-sm p-3 w-full focus:border-primary outline-none resize-none"
              />
            </div>
            <Button className="w-full h-10 text-sm" onClick={handleApply} disabled={applying}>
              {applying ? "Submitting..." : "Submit Application"}
            </Button>
          </div>
        </div>
      )}

      {/* Batch cards */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {loading ? (
          Array(3).fill(0).map((_, i) => <div key={i} className="animate-pulse bg-white/3 border border-white/8 rounded-xl h-52" />)
        ) : batches.length === 0 ? (
          <div className="col-span-3 text-center py-16">
            <Briefcase className="h-8 w-8 mx-auto mb-3 text-gray-600" />
            <p className="text-gray-500 text-sm">No open batches available right now. Check back soon!</p>
          </div>
        ) : (
          batches.map((batch) => {
            const seatsLeft = batch.maxStudents - batch._count.applications;
            const isFull = seatsLeft <= 0;
            return (
              <div key={batch.id} className={`bg-white/3 border rounded-xl p-5 flex flex-col transition-all ${isFull ? "border-white/5 opacity-60" : "border-white/8 hover:border-primary/30 hover:bg-white/5"}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg"><BookOpen className="h-4 w-4 text-primary" /></div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isFull ? "text-red-400 bg-red-400/10" : "text-green-400 bg-green-400/10"}`}>
                    {isFull ? "Full" : `${seatsLeft} seats left`}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-0.5">{batch.program?.title}</h3>
                <p className="text-xs text-gray-500 mb-1">{batch.name}</p>
                <p className="text-[11px] text-primary font-medium mb-3">{batch.program?.domain}</p>
                <div className="flex flex-wrap gap-3 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {batch.program?.duration}w</span>
                  <span className="flex items-center gap-1"><Star className="h-3 w-3" /> {batch.program?.stipend ? `₹${batch.program.stipend}/mo` : "Unpaid"}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(batch.startDate).toLocaleDateString("en-IN")}</span>
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {batch._count.applications} applied</span>
                </div>
                <Button
                  size="sm"
                  className="mt-auto text-xs"
                  disabled={isFull}
                  onClick={() => setSelected(batch)}
                >
                  Apply Now <ChevronRight className="h-3.5 w-3.5 ml-1" />
                </Button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
