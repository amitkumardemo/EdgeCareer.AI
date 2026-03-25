"use client";

import { useState, useEffect } from "react";
import { getBatches, createAnnouncement, getAdminAnnouncements } from "@/actions/internship-admin";
import prisma from "@/lib/prisma";
import { toast } from "sonner";
import { Plus, Megaphone, Globe, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AnnouncementsPage() {
  const [batches, setBatches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", batchId: "", isGlobal: false });
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    getBatches().then(setBatches);
    loadAnnouncements();
  }, []);

  async function loadAnnouncements() {
    try {
      const data = await getAdminAnnouncements();
      setAnnouncements(data);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await createAnnouncement(form);
      toast.success("Announcement posted!");
      setShowForm(false);
      setForm({ title: "", body: "", batchId: "", isGlobal: false });
      await loadAnnouncements();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Announcements</h1>
          <p className="text-gray-500 text-sm mt-0.5">Post updates and alerts to interns</p>
        </div>
        <Button size="sm" className="text-xs" onClick={() => setShowForm(true)}>
          <Plus className="h-3.5 w-3.5 mr-1" /> Post Announcement
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold text-white">New Announcement</h2>
              <button onClick={() => setShowForm(false)}><X className="h-4 w-4 text-gray-400" /></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <div><Label className="text-xs text-gray-400">Title</Label><Input value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="Announcement title" required className="bg-white/5 border-white/10 text-white h-9 text-sm mt-1" /></div>
              <div><Label className="text-xs text-gray-400">Message</Label><textarea rows={4} value={form.body} onChange={e => setForm({...form, body: e.target.value})} required className="bg-white/5 border border-white/10 rounded-md text-white text-sm p-2 w-full focus:border-primary outline-none resize-none mt-1" placeholder="Write your announcement..." /></div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="global" checked={form.isGlobal} onChange={e => setForm({...form, isGlobal: e.target.checked})} className="accent-primary" />
                <Label htmlFor="global" className="text-xs text-gray-400 cursor-pointer">Send to all students (Global)</Label>
              </div>
              {!form.isGlobal && (
                <div><Label className="text-xs text-gray-400">Target Batch (optional)</Label>
                  <select value={form.batchId} onChange={e => setForm({...form, batchId: e.target.value})} className="bg-white/5 border border-white/10 text-white text-sm rounded-lg px-3 py-2 focus:border-primary outline-none w-full mt-1">
                    <option value="">— All batches —</option>
                    {batches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
              )}
              <Button type="submit" className="w-full h-9 text-sm" disabled={saving}>{saving ? "Posting..." : "Post Announcement"}</Button>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {announcements.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <Megaphone className="h-8 w-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No announcements yet. Post your first one above.</p>
          </div>
        ) : (
          announcements.map((a) => (
            <div key={a.id} className="flex gap-4 p-4 bg-white/3 border border-white/8 rounded-xl">
              <div className={`p-2 rounded-lg flex-shrink-0 ${a.isGlobal ? "bg-blue-500/10" : "bg-primary/10"}`}>
                {a.isGlobal ? <Globe className="h-4 w-4 text-blue-400" /> : <Megaphone className="h-4 w-4 text-primary" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-white">{a.title}</p>
                  {a.isGlobal && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-400/10 text-blue-400">Global</span>}
                </div>
                <p className="text-xs text-gray-400">{a.body}</p>
                <p className="text-[10px] text-gray-600 mt-2">{new Date(a.createdAt).toLocaleString("en-IN")}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
