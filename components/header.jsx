import React from "react";
import { checkUser } from "@/lib/checkUser";
import { getFirebaseUser } from "@/lib/auth-utils";
import { getUserStreak } from "@/actions/streak";
import { isCircuitBreakerOpen } from "@/lib/db-guard";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  let user = null;
  let streakData = { streak: 0 };

  try {
    user = await getFirebaseUser();
  } catch (err) {
    user = null;
  }

  if (user && !isCircuitBreakerOpen()) {
    try {
      await checkUser();
    } catch (err) {
      // Handled silently by checkUser circuit breaker
    }

    try {
      streakData = await getUserStreak();
    } catch (err) {
      streakData = { streak: 0 };
    }
  }

  return <HeaderClient user={user} streakData={streakData} />;
}
