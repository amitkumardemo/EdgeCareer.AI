"use client";

import { useState, useEffect } from "react";
import { Flame, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStreakCalendar } from "@/actions/streak";

export default function StreakCalendar() {
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const data = await getStreakCalendar();
        setCalendar(data);
      } catch (error) {
        console.error("Failed to fetch streak calendar:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCalendar();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Activity Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="h-8 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (calendar.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Activity Calendar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Flame className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Start your learning streak today!</p>
            <p className="text-sm text-muted-foreground mt-2">
              Visit the platform daily to build your streak
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Get the last 35 days for the calendar view
  const today = new Date();
  const thirtyFiveDaysAgo = new Date(today);
  thirtyFiveDaysAgo.setDate(today.getDate() - 34);

  const calendarDays = [];
  for (let i = 0; i < 35; i++) {
    const date = new Date(thirtyFiveDaysAgo);
    date.setDate(thirtyFiveDaysAgo.getDate() + i);
    const isActive = calendar.some(day =>
      day.date.toDateString() === date.toDateString() && day.active
    );
    calendarDays.push({ date, active: isActive });
  }

  const getIntensity = (active) => {
    return active ? 'bg-orange-500' : 'bg-muted';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Activity Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium">
                {calendar.length} active day{calendar.length !== 1 ? 's' : ''}
              </span>
            </div>
            <Badge variant="secondary" className="text-xs">
              Last 35 days
            </Badge>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs text-muted-foreground py-1">
                {day}
              </div>
            ))}

            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`aspect-square rounded-sm ${getIntensity(day.active)} cursor-pointer transition-colors hover:opacity-80`}
                title={`${day.date.toLocaleDateString()}: ${day.active ? 'Active' : 'Inactive'}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-muted rounded-sm"></div>
              <span>No activity</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
              <span>Active day</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
