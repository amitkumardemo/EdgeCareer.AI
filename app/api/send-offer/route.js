import { NextResponse } from 'next/server';
import { issueOfferLetter } from '@/actions/offer-letter';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const user = await prisma.user.findUnique({ where: { email: 'amitk25783@gmail.com' } });
    if (!user) return NextResponse.json({ error: 'User not found' });
    let app = await prisma.internshipApplication.findFirst({
      where: { userId: user.id },
      orderBy: { appliedAt: 'desc' }
    });
    if (!app) return NextResponse.json({ error: 'App not found' });

    console.log("Triggering issueOfferLetter for app id:", app.id);
    
    // We execute in background to avoid client timeout!
    issueOfferLetter(app.id)
      .then(res => console.log("Email Sent Result:", res))
      .catch(err => console.error("Email Error:", err));
      
    return NextResponse.json({ success: true, message: "Started generation in background" });
  } catch(e) {
    return NextResponse.json({ error: e.message });
  }
}
