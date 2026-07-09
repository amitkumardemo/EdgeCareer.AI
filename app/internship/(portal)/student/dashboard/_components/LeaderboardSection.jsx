import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Trophy, Medal } from "lucide-react";

export function LeaderboardSection({ leaderboard, currentUserId }) {
  if (!leaderboard || leaderboard.length === 0) return null;

  return (
    <div className="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden mb-8">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" /> Leaderboard
        </h2>
      </div>
      <div className="p-4 space-y-3">
        {leaderboard.slice(0, 5).map((entry, index) => {
          const isCurrentUser = entry.application?.user?.id === currentUserId;
          const rank = index + 1;
          
          return (
            <div 
              key={entry.id} 
              className={`flex items-center justify-between p-3 rounded-2xl transition-all ${
                isCurrentUser 
                ? "bg-primary/20 border border-primary/30 ring-1 ring-primary/20" 
                : "bg-white/3 border border-transparent hover:border-white/10"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-8 text-center font-black text-sm text-gray-500">
                  {rank === 1 ? <Medal className="h-5 w-5 text-amber-400 mx-auto" /> : 
                   rank === 2 ? <Medal className="h-5 w-5 text-slate-300 mx-auto" /> :
                   rank === 3 ? <Medal className="h-5 w-5 text-amber-700 mx-auto" /> : 
                   `#${rank}`}
                </div>
                <Avatar className="h-10 w-10 border border-white/10">
                  <AvatarImage src={entry.application?.user?.imageUrl} />
                  <AvatarFallback className="bg-slate-800 text-[10px] font-bold">
                    {entry.application?.user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate max-w-[120px]">
                    {entry.application?.user?.name || "Student"}
                  </p>
                  <p className="text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    {entry.application?.user?.branch || "Intern"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-white">{entry.performScore.toFixed(0)}</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Score</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
