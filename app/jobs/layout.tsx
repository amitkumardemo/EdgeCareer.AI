import Header from "@/components/header";

export default function JobsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-24 md:pt-28">
      {/* Website Navbar */}
      <div className="z-50">
        <Header />
      </div>

      {/* Main Content Area */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
