import React from "react";
import Image from "next/image";
import StreakPopup from "@/components/streak-popup";
import { updateUserStreak } from "@/actions/streak";
import { getFirebaseUser } from "@/lib/auth-utils";
import Header from "@/components/header";
import Footer from "@/components/Footer";

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
      <footer className="bg-muted/50 py-10">
        <div className="container mx-auto px-4 text-center text-gray-200">
          <Footer />
        </div>
      </footer>
    </>
  );
};

export default MainLayout;
