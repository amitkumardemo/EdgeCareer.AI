"use server";

import prisma from "@/lib/prisma";

export async function verifyCertificate(query) {
  if (!query || typeof query !== "string") {
    return { success: false, message: "Invalid query provided." };
  }

  const sanitizedQuery = query.trim().toUpperCase();

  try {
    // We search for a user by techieId or by certificate serialNo directly
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { techieId: sanitizedQuery },
          {
            internApplications: {
              some: {
                progress: {
                  certificate: {
                    serialNo: sanitizedQuery
                  }
                }
              }
            }
          }
        ]
      },
      include: {
        internApplications: {
          where: {
            status: "SELECTED",
            progress: {
              certificate: {
                isNot: null
              }
            }
          },
          include: {
            batch: {
              include: {
                program: true
              }
            },
            progress: {
              include: {
                certificate: true
              }
            }
          }
        }
      }
    });

    if (!user || user.internApplications.length === 0) {
      return { 
        success: false, 
        message: "No completed internship record or valid certificate found for this ID." 
      };
    }

    // We take the first valid application with a certificate
    // In a real scenario, if a student has multiple, we might want to return a list
    // or match the exact serialNo if that was used.
    let validApp = user.internApplications[0];

    // If they searched by serialNo, find the exact matching application
    const matchedApp = user.internApplications.find(
      app => app.progress?.certificate?.serialNo === sanitizedQuery
    );

    if (matchedApp) {
      validApp = matchedApp;
    }

    const progress = validApp.progress;
    const certificate = progress.certificate;
    const batch = validApp.batch;
    const program = batch.program;

    return {
      success: true,
      data: {
        id: certificate.serialNo, // Certificate ID
        techieId: user.techieId, // Student ID
        studentName: user.name,
        programName: program.title,
        programType: "Professional Certification",
        domain: program.domain,
        duration: `${program.duration} Weeks`,
        issueDate: new Date(certificate.issuedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        completionDate: progress.completedAt 
          ? new Date(progress.completedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
          : new Date(certificate.issuedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        
        // Detailed metrics
        attendancePct: progress.attendancePct.toFixed(1),
        tasksCompleted: progress.tasksCompleted,
        totalTasks: progress.totalTasks,
        performScore: progress.performScore.toFixed(1),
        grade: progress.performScore >= 90 ? "Outstanding (O)" 
             : progress.performScore >= 80 ? "Excellent (A+)"
             : progress.performScore >= 70 ? "Very Good (A)"
             : progress.performScore >= 60 ? "Good (B+)"
             : "Pass (B)",

        credentialStatus: "Active & Verified",
        verificationStatus: "Authentic",
        verificationId: `VID-${certificate.id.substring(0, 8).toUpperCase()}`,
        hash: `THIAI-HASH-${certificate.serialNo}-${user.id.substring(0, 8).toUpperCase()}`,
        issuedBy: "TechieHelp Institute of AI",
        timestamp: new Date().toLocaleString(),
        
        previewUrl: certificate.pdfUrl || "",
        downloadUrl: certificate.pdfUrl || ""
      }
    };

  } catch (error) {
    console.error("Verification Error:", error);
    return { success: false, message: "System Error: Failed to communicate with the verification database." };
  }
}
