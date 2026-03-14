import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { BookOpen, Clock, CheckCircle2 } from "lucide-react";

export function TasksTable({ tasks }) {
  if (!tasks || tasks.length === 0) return null;

  const statusColors = {
    PENDING: "bg-amber-400/10 text-amber-400 border-amber-400/20",
    SUBMITTED: "bg-blue-400/10 text-blue-400 border-blue-400/20",
    APPROVED: "bg-green-400/10 text-green-400 border-green-400/20",
    EVALUATED: "bg-green-400/10 text-green-400 border-green-400/20",
  };

  return (
    <div className="bg-[#0f172a] border border-white/5 rounded-3xl overflow-hidden mb-8">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" /> Current Tasks
        </h2>
        <Link href="/internship/student/tasks" className="text-xs text-primary font-bold hover:underline underline-offset-4">
          View All Tasks
        </Link>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-white/3">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="text-gray-400 font-bold uppercase text-[10px] tracking-widest h-10">Task Title</TableHead>
              <TableHead className="text-gray-400 font-bold uppercase text-[10px] tracking-widest h-10">Deadline</TableHead>
              <TableHead className="text-gray-400 font-bold uppercase text-[10px] tracking-widest h-10">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.slice(0, 5).map((task) => {
              const submission = task.submissions?.[0];
              const status = submission?.status || "PENDING";
              
              return (
                <TableRow key={task.id} className="border-white/5 hover:bg-white/3 transition-colors">
                  <TableCell className="py-4">
                    <p className="text-sm font-semibold text-white truncate max-w-[200px]">{task.title}</p>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(task.dueDate).toLocaleDateString("en-IN", { day: 'numeric', month: 'short' })}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge variant="outline" className={`text-[10px] font-bold uppercase tracking-tighter ${statusColors[status]}`}>
                      {status}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
