"use client";

import { useState } from "react";
import { markNotificationRead } from "@/actions/internship-evaluation";
import { Bell, CheckCircle2, ChevronRight, MessageSquare, Briefcase, FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsClient({ initialData }) {
  const [notifications, setNotifications] = useState(initialData || []);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
    } catch (error) {
      console.error("Failed to mark read:", error);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "EVALUATION_PUBLISHED":
        return <FileText className="w-5 h-5 text-blue-400" />;
      case "MODULE_ADDED":
        return <Briefcase className="w-5 h-5 text-purple-400" />;
      case "CERTIFICATE_ISSUED":
        return <CheckCircle2 className="w-5 h-5 text-green-400" />;
      default:
        return <Bell className="w-5 h-5 text-primary" />;
    }
  };

  if (notifications.length === 0) {
    return (
      <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-gray-500">
        <Bell className="w-10 h-10 mx-auto mb-4 opacity-50" />
        <p>You're all caught up! No notifications yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notif) => (
        <div 
          key={notif.id} 
          onClick={() => { if (!notif.isRead) handleMarkAsRead(notif.id) }}
          className={`group flex items-start gap-4 p-5 rounded-2xl border transition-all cursor-pointer ${notif.isRead ? "bg-white/5 border-white/5 opacity-70" : "bg-primary/5 border-primary/20 hover:border-primary/40"}`}
        >
          <div className={`p-3 rounded-full shrink-0 ${notif.isRead ? "bg-white/5" : "bg-primary/10"}`}>
            {getIcon(notif.type)}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-1">
              <h3 className={`text-sm md:text-base font-bold ${notif.isRead ? "text-gray-300" : "text-white"}`}>{notif.title}</h3>
              <span className="text-[10px] text-gray-500 whitespace-nowrap shrink-0">
                {formatDistanceToNow(new Date(notif.createdAt), { addSuffix: true })}
              </span>
            </div>
            <p className={`text-xs md:text-sm ${notif.isRead ? "text-gray-500" : "text-gray-300"} leading-relaxed`}>{notif.message}</p>
          </div>
          {!notif.isRead && (
            <div className="shrink-0 self-center">
              <div className="w-2.5 h-2.5 bg-primary rounded-full shadow-[0_0_10px_rgba(79,70,229,0.8)]" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
