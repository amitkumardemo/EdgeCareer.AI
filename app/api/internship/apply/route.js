import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { inngest } from "@/lib/inngest/client";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, domain, college, uid } = body;

    if (!name || !email || !domain || !college || !uid) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if the user already exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Create user if they don't exist
      user = await prisma.user.create({
        data: {
          email,
          name,
          uid,
          role: "STUDENT",
          collegeName: college,
        },
      });
    }

    // Find the relevant internship program for the chosen domain
    let program = await prisma.internshipProgram.findFirst({
      where: { domain, isActive: true },
    });

    if (!program) {
      // Create a default program for the domain if it doesn't exist
      program = await prisma.internshipProgram.create({
        data: {
          title: `${domain} Internship`,
          description: `Comprehensive internship in ${domain}`,
          domain,
          duration: 3,
        },
      });
    }

    // Find an upcoming batch for this program
    let batch = await prisma.internshipBatch.findFirst({
      where: { programId: program.id, status: "UPCOMING" },
    });

    if (!batch) {
      // Create a default upcoming batch if it doesn't exist
      batch = await prisma.internshipBatch.create({
        data: {
          programId: program.id,
          name: `${domain} Batch 1`,
          startDate: new Date(new Date().setDate(new Date().getDate() + 7)), // Starts next week
          endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
          status: "UPCOMING",
        },
      });
    }

    // Create the application
    const application = await prisma.internshipApplication.create({
      data: {
        userId: user.id,
        batchId: batch.id,
        status: "APPLIED",
      },
    });

    // Trigger Inngest Event for Phase 2: Assessment
    await inngest.send({
      name: "internship.applied",
      data: {
        applicationId: application.id,
        email: user.email,
        name: user.name,
        domain: domain,
      }
    });

    return NextResponse.json({ success: true, applicationId: application.id }, { status: 200 });
  } catch (error) {
    console.error("Error applying for internship:", error);
    // Unique constraint failed for application (User already applied to this batch)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "You have already applied for this internship." }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
