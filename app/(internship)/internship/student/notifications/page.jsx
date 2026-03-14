import { getMyNotifications } from "@/actions/internship-student";
import { Megaphone, Globe, Calendar } from "lucide-react";

export default async function NotificationsPage() {
  const notifications = await getMyNotifications();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Notifications</h1>
        <p className="text-gray-500 text-sm mt-0.5">{notifications.length} announcement{notifications.length !== 1 ? "s" : ""}</p>
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-16 bg-white/3 border border-white/8 rounded-xl">
          <Megaphone className="h-8 w-8 mx-auto mb-3 text-gray-600" />
          <p className="text-gray-500 text-sm">No announcements yet. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div key={n.id} className="flex gap-4 p-4 bg-white/3 border border-white/8 rounded-xl hover:bg-white/4 transition-all">
              <div className={`p-2 rounded-lg flex-shrink-0 mt-0.5 ${n.isGlobal ? "bg-blue-500/10" : "bg-primary/10"}`}>
                {n.isGlobal ? <Globe className="h-4 w-4 text-blue-400" /> : <Megaphone className="h-4 w-4 text-primary" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <p className="text-sm font-semibold text-white">{n.title}</p>
                  {n.isGlobal && <span className="text-[10px] px-1.5 py-0.5 bg-blue-400/10 text-blue-400 rounded">Global</span>}
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{n.body}</p>
                <p className="text-[10px] text-gray-600 mt-2 flex items-center gap-1">
                  <Calendar className="h-2.5 w-2.5" /> {new Date(n.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
