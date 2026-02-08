"use client";

import { useState, useEffect } from "react";
import { Flame, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function StreakPopup({ streak }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Auto close after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const getStreakMessage = () => {
    if (streak === 1) {
      return {
        title: "Welcome to TechieHelp Institute of AI! 🎉",
        message: "You've started your learning journey. Keep it up!",
        icon: "🚀",
      };
    } else if (streak === 7) {
      return {
        title: "One Week Streak! 🔥",
        message: "Amazing consistency! You're building great habits.",
        icon: "⭐",
      };
    } else if (streak === 30) {
      return {
        title: "Monthly Champion! 🏆",
        message: "30 days of dedication! You're unstoppable!",
        icon: "👑",
      };
    } else {
      return {
        title: `${streak} Day Streak! 🔥`,
        message: "Keep the momentum going! Every day counts.",
        icon: "💪",
      };
    }
  };

  const { title, message, icon } = getStreakMessage();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="p-6 text-center">
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="mb-4">
            <div className="text-6xl mb-2">{icon}</div>
            <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
          </div>

          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground mb-6">{message}</p>

          <div className="flex items-center justify-center gap-2 mb-4">
            <Flame className="h-5 w-5 text-orange-500" />
            <span className="text-lg font-semibold">{streak} days</span>
          </div>

          <Button
            onClick={() => setIsVisible(false)}
            className="w-full"
          >
            Continue Learning
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
