import Header from "@/components/header"; // The website's main navbar
import AdminSidebar from "@/components/AdminSidebar";
import { getFirebaseUser } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getFirebaseUser();
  if (!user || user.email !== "techiehelp57@gmail.com") {
    redirect("/");
  }
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-24 md:pt-28">
      {/* Website Navbar */}
      <div className="z-50">
        <Header />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Admin Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
