import { getMyApplications } from "@/actions/internship-student";
import { getLeaderboard } from "@/actions/internship-student";
import { Trophy, Medal, Star } from "lucide-react";

export default async function LeaderboardPage() {
  const applications = await getMyApplications();
  const selectedApp = applications.find((a) => a.status === "SELECTED");
  const batchId = selectedApp?.batch?.id;

  let leaders = [];
  if (batchId) {
    leaders = await getLeaderboard(batchId);
  }

  const myAppId = selectedApp?.id;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          {batchId ? `Top performers in ${selectedApp?.batch?.name}` : "Join a batch to see the leaderboard"}
        </p>
      </div>

      {!batchId ? (
        <div className="text-center py-16 bg-white/3 border border-white/8 rounded-xl">
          <Trophy className="h-8 w-8 mx-auto mb-3 text-gray-600" />
          <p className="text-gray-500 text-sm">You need to be selected in a batch to see the leaderboard.</p>
        </div>
      ) : leaders.length === 0 ? (
        <div className="text-center py-16 text-gray-500 text-sm">No data yet — keep completing tasks to appear here!</div>
      ) : (
        <div className="space-y-3">
          {/* Top 3 podium */}
          {leaders.length >= 3 && (
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[leaders[1], leaders[0], leaders[2]].map((leader, idx) => {
                const rank = idx === 0 ? 2 : idx === 1 ? 1 : 3;
                const heights = ["h-24", "h-32", "h-20"];
                const colors = ["text-gray-400 bg-gray-400/10", "text-amber-400 bg-amber-400/10", "text-orange-500 bg-orange-500/10"];
                return (
                  <div key={leader.id} className={`flex flex-col items-center justify-end ${heights[idx]} bg-white/3 border border-white/8 rounded-xl p-3 ${leader.applicationId === myAppId ? "border-primary/40 bg-primary/5" : ""}`}>
                    <div className={`w-8 h-8 rounded-full ${colors[idx].split(" ")[1]} flex items-center justify-center ${colors[idx].split(" ")[0]} text-sm font-bold mb-1`}>
                      {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
                    </div>
                    <p className="text-xs font-bold text-white text-center truncate max-w-full">{leader.application?.user?.name?.split(" ")[0]}</p>
                    <p className="text-[10px] text-primary font-semibold">{leader.performScore.toFixed(1)} pts</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Full list */}
          <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden">
            {leaders.map((leader, i) => {
              const isMe = leader.applicationId === myAppId;
              return (
                <div key={leader.id} className={`flex items-center gap-4 px-5 py-3 border-b border-white/5 last:border-none ${isMe ? "bg-primary/5" : "hover:bg-white/2"} transition-all`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${i === 0 ? "bg-amber-400/15 text-amber-400" : i === 1 ? "bg-gray-400/15 text-gray-400" : i === 2 ? "bg-orange-500/15 text-orange-500" : "bg-white/5 text-gray-500"}`}>
                    {i + 1}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                    {leader.application?.user?.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">
                      {leader.application?.user?.name} {isMe && <span className="text-primary text-[10px] ml-1">(You)</span>}
                    </p>
                    <p className="text-[10px] text-gray-500">{leader.application?.user?.branch || "—"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{leader.performScore.toFixed(1)}</p>
                    <p className="text-[10px] text-gray-600">pts</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-400">{leader.tasksCompleted}/{leader.totalTasks}</p>
                    <p className="text-[10px] text-gray-600">tasks</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-400">{leader.attendancePct}%</p>
                    <p className="text-[10px] text-gray-600">attend.</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
