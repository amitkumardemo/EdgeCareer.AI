"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobSchema, JobFormValues } from "@/lib/validations/job";
import { createJob } from "@/app/actions/job";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import RichTextEditor from "@/components/RichTextEditor";
import { toast } from "sonner";

export default function CreateJobPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      companyName: "",
      companyLogoUrl: "",
      description: "",
      openPositions: 1,
      status: "PUBLISHED",
      thumbnailUrl: "",
      bannerUrl: "",
    },
  });

  const onSubmit = async (data: JobFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await createJob(data);
      if (res.success) {
        toast.success("Job created successfully!");
        router.push("/admin/jobs");
      } else {
        toast.error("Failed to create job: " + res.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Create New Opportunity</h1>
      
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        
        {/* Company Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-950 border-b pb-2">1. Company Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Company Name</label>
              <input 
                {...form.register("companyName")} 
                className="w-full border border-slate-200 bg-slate-50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="e.g. Google, Microsoft, TechieHelp"
              />
              {form.formState.errors.companyName && <p className="text-red-500 text-xs mt-1">{form.formState.errors.companyName.message}</p>}
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Company Logo</label>
              <CldUploadWidget 
                uploadPreset="techiehelp"
                options={{ folder: "techiehelp/companies" }}
                onSuccess={(res: any) => form.setValue("companyLogoUrl", res.info.secure_url)}
              >
                {({ open }) => (
                  <button type="button" onClick={() => open()} className="w-full p-3 border-2 border-dashed border-slate-300 rounded-lg hover:bg-slate-50 hover:border-blue-500 text-slate-600 transition-colors flex items-center justify-center gap-2 font-medium">
                    {form.watch("companyLogoUrl") ? "Logo Uploaded ✅" : "Upload Logo Image"}
                  </button>
                )}
              </CldUploadWidget>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-950 border-b pb-2">2. Job / Opportunity Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Job Title</label>
              <input 
                {...form.register("title")} 
                className="w-full border border-slate-200 bg-slate-50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="e.g. Google Cloud Arcade Facilitator"
              />
              {form.formState.errors.title && <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Apply Link (External)</label>
              <input 
                {...form.register("applyLink")} 
                className="w-full border border-slate-200 bg-slate-50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="https://company.com/careers/..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Employment Type</label>
              <select {...form.register("employmentType")} className="w-full border border-slate-200 bg-slate-50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Type</option>
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Internship">Internship</option>
                <option value="Program">Program</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Work Mode</label>
              <select {...form.register("workMode")} className="w-full border border-slate-200 bg-slate-50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select Mode</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Onsite">Onsite</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Salary / Stipend</label>
              <input 
                {...form.register("salary")} 
                className="w-full border border-slate-200 bg-slate-50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                placeholder="e.g. $100k - $120k or Unpaid"
              />
            </div>
          </div>
        </div>

        {/* Media Uploads */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-950 border-b pb-2">3. Media (Banner)</h2>
          <div>
            <CldUploadWidget 
              uploadPreset="techiehelp"
              options={{ folder: "techiehelp/banners" }}
              onSuccess={(res: any) => form.setValue("bannerUrl", res.info.secure_url)}
            >
              {({ open }) => (
                <button type="button" onClick={() => open()} className="w-full p-6 border-2 border-dashed border-slate-300 rounded-xl hover:bg-slate-50 hover:border-blue-500 text-slate-600 transition-colors flex flex-col items-center justify-center gap-2 font-medium">
                  <span className="text-2xl">📸</span>
                  {form.watch("bannerUrl") ? "Cover Banner Uploaded ✅" : "Upload High-Quality Cover Banner (e.g. 1200x400)"}
                </button>
              )}
            </CldUploadWidget>
          </div>
        </div>

        {/* Rich Content */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-blue-950 border-b pb-2">4. Full Description</h2>
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <RichTextEditor 
              content={form.watch("description")} 
              onChange={(val) => form.setValue("description", val)} 
            />
          </div>
          {form.formState.errors.description && <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message}</p>}
        </div>

        {/* Submission */}
        <div className="flex justify-end pt-6 border-t border-slate-100">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-[#0F4CBA] text-white px-8 py-3 rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors font-bold text-lg shadow-md hover:shadow-lg"
          >
            {isSubmitting ? "Publishing..." : "Publish Opportunity"}
          </button>
        </div>
      </form>
    </div>
  );
}
