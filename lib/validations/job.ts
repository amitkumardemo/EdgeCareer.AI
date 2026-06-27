import * as z from "zod";

export const jobSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must be less than 100 characters"),
  companyName: z.string().min(2, "Company name is required"),
  companyLogoUrl: z.string().url().optional().or(z.literal("")),
  categoryId: z.string().optional(),
  locationId: z.string().optional(),
  salary: z.string().optional(),
  experience: z.string().optional(),
  employmentType: z.string().optional(), // Full Time, Part Time, Internship
  department: z.string().optional(),
  workMode: z.string().optional(), // Remote, Hybrid, Onsite
  openPositions: z.number().int().positive().default(1),
  
  description: z.string().min(10, "Description must be at least 10 characters"),
  requirements: z.string().optional(),
  responsibilities: z.string().optional(),
  benefits: z.string().optional(),
  selectionProcess: z.string().optional(),
  skills: z.string().optional(), // Stored as JSON string
  
  applyLink: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  applicationEmail: z.string().email("Must be a valid email").optional().or(z.literal("")),
  applyBefore: z.date().optional(),
  
  thumbnailUrl: z.string().url().optional().or(z.literal("")),
  bannerUrl: z.string().url().optional().or(z.literal("")),
  
  isFeatured: z.boolean().default(false),
  isTrending: z.boolean().default(false),
  isUrgent: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED", "EXPIRED"]).default("PUBLISHED"),
  
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
});

export type JobFormValues = z.infer<typeof jobSchema>;
