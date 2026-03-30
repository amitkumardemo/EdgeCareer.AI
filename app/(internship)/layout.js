import { getFirebaseUser } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import InternshipSidebar from "@/components/internship/InternshipSidebar";
import prisma from "@/lib/prisma";

export default async function InternshipLayout({ children }) {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) {
    redirect("/sign-in?redirect_url=/internship");
  }

  // Get role from DB
  const dbUser = await prisma.user.findUnique({
    where: { uid: firebaseUser.uid },
    select: { id: true, name: true, email: true, role: true, imageUrl: true },
  });

  return (
    <div className="min-h-screen bg-[#030712] flex">
      <InternshipSidebar user={dbUser} />
      <main className="flex-1 ml-0 lg:ml-64 p-6 pt-20 lg:pt-6">
        {children}
      </main>
    </div>
  );
}
