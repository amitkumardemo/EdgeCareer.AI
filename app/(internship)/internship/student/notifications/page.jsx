import { getUnreadNotifications } from "@/actions/internship-evaluation";
import { getFirebaseUser } from "@/lib/auth-utils";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import NotificationsClient from "@/components/internship/student/NotificationsClient";

export const metadata = {
  title: "Notifications | TechieHelp",
};

export default async function NotificationsPage() {
  const firebaseUser = await getFirebaseUser();
  if (!firebaseUser) redirect("/sign-in");

  const dbUser = await prisma.user.findUnique({
    where: { uid: firebaseUser.uid },
  });
  if (!dbUser) redirect("/sign-in");

  // Fetch all notifications for this user, not just unread, for the dedicated page
  const notifications = await prisma.notification.findMany({
    where: { userId: dbUser.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="min-h-screen bg-[#030712] pb-20">
      <div className="container mx-auto px-4 pt-10 max-w-4xl">
        <h1 className="text-2xl font-bold text-white mb-6">Notifications</h1>
        <NotificationsClient initialData={notifications} />
      </div>
    </div>
  );
}
