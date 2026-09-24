import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import Razorpay from "razorpay";
import { getFirebaseUser } from "@/lib/auth-utils";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_mock",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "mock_secret",
});

export async function POST(req) {
  try {
    const user = await getFirebaseUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { applicationId } = await req.json();
    if (!applicationId) return NextResponse.json({ error: "Missing application ID" }, { status: 400 });

    const application = await prisma.internshipApplication.findUnique({
      where: { id: applicationId },
      include: {
        user: true,
        progress: { include: { certificate: { include: { payment: true } } } },
        batch: true,
      },
    });

    if (!application || application.userId !== user.id) {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 });
    }

    if (application.batch.status !== "COMPLETED") {
      return NextResponse.json({ error: "Internship not completed yet." }, { status: 400 });
    }

    const progress = application.progress;
    if (!progress) {
      return NextResponse.json({ error: "Progress not found" }, { status: 400 });
    }

    // Amount in paise (e.g., 999 INR = 99900 paise)
    const amount = 99900; 

    // Create or find certificate record
    let certificate = progress.certificate;
    if (!certificate) {
      certificate = await prisma.internshipCertificate.create({
        data: {
          progressId: progress.id,
        },
      });
    }

    // Check existing payment
    let payment = certificate.payment;
    if (payment && payment.status === "SUCCESS") {
      return NextResponse.json({ error: "Payment already completed" }, { status: 400 });
    }

    // Generate Razorpay Order
    const options = {
      amount: amount,
      currency: "INR",
      receipt: `receipt_${certificate.id}`,
    };

    const order = await razorpay.orders.create(options);

    // Save payment record in DB
    if (!payment) {
      payment = await prisma.certificatePayment.create({
        data: {
          certificateId: certificate.id,
          amount: amount / 100, // store in INR
          razorpayOrderId: order.id,
          status: "PENDING",
        }
      });
    } else {
      payment = await prisma.certificatePayment.update({
        where: { id: payment.id },
        data: { razorpayOrderId: order.id, status: "PENDING" }
      });
    }

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      certificateId: certificate.id,
    }, { status: 200 });

  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
