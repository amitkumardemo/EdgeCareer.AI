import { serve } from "inngest/next";

import { inngest } from "@/lib/inngest/client";
import { generateIndustryInsights } from "@/lib/inngest/function";
import { triggerAssessmentEmail } from "@/lib/inngest/assessment-trigger";
import { dailyBatchStarter, dailyBatchCompleter } from "@/lib/inngest/batch-trigger";
import { aiTaskReview } from "@/lib/inngest/task-review";
import { weeklyAutomationJob } from "@/lib/inngest/weekly-automation";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    generateIndustryInsights, 
    triggerAssessmentEmail, 
    dailyBatchStarter,
    dailyBatchCompleter,
    aiTaskReview,
    weeklyAutomationJob
  ],
});
