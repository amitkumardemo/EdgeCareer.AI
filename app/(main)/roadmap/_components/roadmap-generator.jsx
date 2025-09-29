"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateRoadmap } from "@/actions/roadmap";
import useFetch from "@/hooks/use-fetch";
import RoadmapDisplay from "./roadmap-display";
import { BUTTONS_MENUS } from "@/lib/constants";
import { BarLoader } from "react-spinners";

export default function RoadmapGenerator() {
  const [currentSkills, setCurrentSkills] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [timeFrame, setTimeFrame] = useState("6 months");

  const {
    loading: generating,
    fn: generateFn,
    data: resultData,
    setData,
  } = useFetch(generateRoadmap);

  const handleGenerate = () => {
    if (!currentSkills.trim() || !targetRole.trim()) {
      toast.error("Please fill in current skills and target role.");
      return;
    }
    generateFn(currentSkills, targetRole, timeFrame);
  };

  const startNew = () => {
    setCurrentSkills("");
    setTargetRole("");
    setTimeFrame("6 months");
    setData(null);
  };

  if (generating) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
        <p className="text-muted-foreground">Generating your personalized roadmap...</p>
        <p className="text-sm text-muted-foreground mt-2">This may take a moment as we craft a tailored learning path just for you!</p>
        <BarLoader className="mt-4" width="200px" color="#3b82f6" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Your Personalized Roadmap</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!resultData ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="skills">Current Skills</Label>
                <Textarea
                  id="skills"
                  value={currentSkills}
                  onChange={(e) => setCurrentSkills(e.target.value)}
                  placeholder="List your current skills and experience (e.g., Basic JavaScript, React basics)"
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Target Role</Label>
                <Input
                  id="role"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeframe">Time Frame</Label>
                <Select value={timeFrame} onValueChange={setTimeFrame}>
                  <SelectTrigger id="timeframe">
                    <SelectValue placeholder="Select time frame" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3 months">3 months</SelectItem>
                    <SelectItem value="6 months">6 months</SelectItem>
                    <SelectItem value="12 months">12 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleGenerate} disabled={generating} className="w-full">
                {BUTTONS_MENUS.GENERATE_ROADMAP || "Generate Roadmap"}
              </Button>
            </>
          ) : (
            <>
              <RoadmapDisplay roadmap={resultData.roadmap} />
              <Button onClick={startNew} variant="outline" className="w-full">
                Generate New Roadmap
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
