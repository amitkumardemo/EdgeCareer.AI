import React from "react";
import Image from "next/image";
import StreakPopup from "@/components/streak-popup";
import { updateUserStreak } from "@/actions/streak";
import { getFirebaseUser } from "@/lib/auth-utils";
import Header from "@/components/header";

const MainLayout = async ({ children }) => {
  const firebaseUser = await getFirebaseUser();
  const userId = firebaseUser?.uid;
  let showStreakPopup = false;
  let currentStreak = 0;

  if (userId) {
    try {
      const result = await updateUserStreak();
      showStreakPopup = result?.isNewDay || false;
      currentStreak = result?.streak || 0;
    } catch (error) {
      console.error("Failed to update streak:", error);
    }
  }

  return (
    <>
      <Header />
      <div className="container mx-auto mt-24 mb-20">
        {children}
      </div>
      {showStreakPopup && (
        <StreakPopup streak={currentStreak} />
      )}
      {/* Footer is rendered globally in RootLayout */}
    </>
  );
};

export default MainLayout;
