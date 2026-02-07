import React from "react";
import Image from "next/image";
import StreakPopup from "@/components/streak-popup";
import { updateUserStreak } from "@/actions/streak";
import { auth } from "@clerk/nextjs/server";

const MainLayout = async ({ children }) => {
  const { userId } = await auth();
  let showStreakPopup = false;
  let currentStreak = 0;

  if (userId) {
    try {
      const result = await updateUserStreak();
      showStreakPopup = result.isNewDay;
      currentStreak = result.streak;
    } catch (error) {
      console.error("Failed to update streak:", error);
    }
  }

  return (
    <>
      <div className="container mx-auto mt-24 mb-20">
        {children}
      </div>
      {showStreakPopup && (
        <StreakPopup streak={currentStreak} />
      )}
    </>
  );
};

export default MainLayout;
