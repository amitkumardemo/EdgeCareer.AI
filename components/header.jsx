import React from "react";
import { checkUser } from "@/lib/checkUser";
import { getFirebaseUser } from "@/lib/auth-utils";
import { getUserStreak } from "@/actions/streak";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  const user = await getFirebaseUser();
  await checkUser();
  const streakData = user ? await getUserStreak() : { streak: 0 };

  return <HeaderClient user={user} streakData={streakData} />;
}
