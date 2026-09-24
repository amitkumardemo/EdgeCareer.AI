import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sendNotificationEmail } from "@/lib/email-service";

export async function POST(req) {
  try {
    const textBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "mock_webhook_secret";
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(textBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(textBody);

    if (event.event === "payment.captured") {
      const paymentEntity = event.payload.payment.entity;
      const orderId = paymentEntity.order_id;

      // Update Database
      const updatedPayment = await prisma.certificatePayment.update({
        where: { razorpayOrderId: orderId },
        data: {
          status: "SUCCESS",
          razorpayPaymentId: paymentEntity.id,
        },
        include: {
          certificate: {
            include: {
              progress: {
                include: {
                  application: {
                    include: { user: true, batch: { include: { program: true } } }
                  }
                }
              }
            }
          }
        }
      });

      // Phase 14: Notification to HR
      const student = updatedPayment.certificate.progress.application.user;
      const program = updatedPayment.certificate.progress.application.batch.program;

      await sendNotificationEmail({
        to: process.env.ADMIN_EMAIL || "admin@techiehelpinstituteofai.in",
        subject: `✅ Payment Successful: Certificate Request for ${student.name}`,
        username: "Admin",
        heroTitle: "New Certificate Request",
        message: `<p><strong>${student.name}</strong> has successfully paid the certificate processing fee for the <strong>${program.title}</strong> internship.</p>
                  <p>Please log in to the admin panel to review and issue their official completion certificate.</p>`,
        buttonText: "Review & Issue Certificate",
        buttonLink: "https://techiehelpinstituteofai.in/admin/certificates"
      });

      // Notify Student
      if (student.email) {
        await sendNotificationEmail({
          to: student.email,
          subject: "🎉 Payment Successful - TechieHelp Certificate",
          username: student.name,
          message: `<p>Your payment for the internship certificate has been successfully processed.</p>
                    <p>Our Admin team has been notified and will verify your completion. You will receive your official certificate via email shortly!</p>`,
          buttonText: "Go to Dashboard",
          buttonLink: "https://techiehelpinstituteofai.in/dashboard"
        });
      }
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Razorpay Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
