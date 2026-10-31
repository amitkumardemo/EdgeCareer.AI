import { getFirebaseUser } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import InternshipSidebar from "@/components/internship/InternshipSidebar";
import prisma from "@/lib/prisma";

export default async function InternshipLayout({ children }) {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) {
    redirect("/sign-in?redirect_url=/internship");
  }

  // Get role from DB with graceful fallback if DB is down
  let dbUser = null;
  try {
    dbUser = await prisma.user.findUnique({
      where: { uid: firebaseUser.uid },
      select: { id: true, name: true, email: true, role: true, imageUrl: true },
    });
  } catch (err) {
    console.error("InternshipLayout dbUser query failed (using session fallback):", err?.message || err);
  }

  // Fallback to Firebase session info if DB query fails or user record isn't found
  if (!dbUser) {
    dbUser = {
      id: firebaseUser.uid,
      name: firebaseUser.name || firebaseUser.email?.split("@")[0] || "Student",
      email: firebaseUser.email || "",
      role: "STUDENT",
      imageUrl: firebaseUser.picture || null,
    };
  }

  return (
    <div className="min-h-screen bg-white flex internship-portal-root text-slate-900">
      <InternshipSidebar user={dbUser} />
      <main className="flex-1 ml-0 lg:ml-64 p-6 pt-20 lg:pt-6">
        {children}
      </main>
    </div>
  );
}
