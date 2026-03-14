import { Bell, Info, Calendar, MessageSquare } from "lucide-react";

export function NotificationsPanel({ notifications }) {
  if (!notifications || notifications.length === 0) return (
    <div className="bg-[#0f172a] border border-white/5 rounded-3xl p-6 text-center">
      <Bell className="mx-auto h-8 w-8 text-gray-700 mb-2" />
      <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">No Notifications</p>
    </div>
  );

  return (
    <div className="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden mb-8">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" /> Notifications
        </h2>
      </div>
      <div className="p-4 space-y-3">
        {notifications.map((item) => (
          <div 
            key={item.id} 
            className="flex items-start gap-3 p-3 rounded-2xl bg-white/3 border border-transparent hover:border-white/10 transition-all group"
          >
            <div className="flex-shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Info className="h-4 w-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white leading-tight mb-1 group-hover:text-primary transition-colors">
                {item.title}
              </p>
              <p className="text-[10px] text-gray-500 line-clamp-2 mb-2 font-medium">
                {item.body}
              </p>
              <p className="text-[9px] text-gray-600 font-black uppercase tracking-widest">
                {new Date(item.createdAt).toLocaleDateString("en-IN")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
