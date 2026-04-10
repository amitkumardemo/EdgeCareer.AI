import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(request) {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "techiehelpsoftwaredevelopmentc@gmail.com",
        pass: "ogfy qxyh jtpn fmqf",
      },
    });

    await transporter.verify();
    
    return NextResponse.json({ success: true });
  } catch(e) {
    return NextResponse.json({ error: e.message, stack: e.stack });
  }
}
