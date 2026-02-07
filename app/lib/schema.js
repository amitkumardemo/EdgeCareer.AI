import { z } from "zod";

export const onboardingSchema = z.object({
  industry: z.string({
    required_error: "Please select an industry",
  }),
  subIndustry: z.string({
    required_error: "Please select a specialization",
  }),
  bio: z.string().max(500).optional(),
  experience: z
    .string()
    .transform((val) => parseInt(val, 10))
    .pipe(
      z
        .number()
        .min(0, "Experience must be at least 0 years")
        .max(50, "Experience cannot exceed 50 years")
    ),
  skills: z.string().transform((val) =>
    val
      ? val
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean)
      : undefined
  ),
});

export const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  mobile: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
});

export const entrySchema = z
  .object({
    title: z.string().min(1, "Title is required").max(60, "Title too long"),
    organization: z.string().min(1, "Organization is required").max(60, "Organization name too long"),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    description: z.string().min(1, "Description is required").max(360, "Description too long (max 3 bullets × 120 chars)"),
    current: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (!data.current && !data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: "End date is required unless this is your current position",
      path: ["endDate"],
    }
  );

export const resumeSchema = z.object({
  contactInfo: z.object({
    name: z.string().max(50, "Name too long").optional(),
    email: z.string().email("Invalid email address").optional(),
    mobile: z.string().max(20, "Mobile number too long").optional(),
    linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
    github: z.string().url("Invalid URL").optional().or(z.literal("")),
    portfolio: z.string().url("Invalid URL").optional().or(z.literal("")),
  }),
  summary: z.string().max(200, "Summary too long (max 200 characters)").optional(),
  skills: z.string().max(300, "Skills section too long (max 12 skills per category)").optional(),
  experience: z.array(entrySchema).max(4, "Too many experience entries (max 4)").optional(),
  education: z.array(entrySchema).max(3, "Too many education entries (max 3)").optional(),
  projects: z.array(entrySchema).max(3, "Too many projects (max 3)").optional(),
  achievements: z.string().max(300, "Achievements too long (max 3 points × 100 chars)").optional(),
  positions: z.string().max(220, "Positions too long (max 2 points × 110 chars)").optional(),
  whyIFit: z.string().max(300, "Why I Fit section too long (max 3 points × 100 chars)").optional(),
});

export const coverLetterSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  tone: z.enum(["professional", "friendly", "enthusiastic"]),
  companyName: z.string().min(1, "Company Name is required"),
  jobTitle: z.string().min(1, "Job Title is required"),
  jobDescription: z.string().min(10, "Job Description is too short"),
});
