export async function POST(req) {
  try {
    const body = await req.json();
    const {
      type = "partnership",
      collegeName,
      contactPersonName,
      designation,
      email,
      phone,
      city,
      state,
      studentCommunitySize,
      message,
      collegeWebsite,
      // For student registrations:
      studentName,
      branch,
      year,
      interestedRole,
      skillsInterest
    } = body;

    // Validate based on type
    if (type === "partnership") {
      if (!collegeName || !contactPersonName || !designation || !email || !phone || !city || !state) {
        return Response.json(
          { success: false, error: "Please fill in all required fields." },
          { status: 400 }
        );
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return Response.json(
          { success: false, error: "Please provide a valid email address." },
          { status: 400 }
        );
      }

      // Phone validation (10 digits)
      const cleanedPhone = phone.replace(/\D/g, "");
      if (cleanedPhone.length < 10) {
        return Response.json(
          { success: false, error: "Please provide a valid 10-digit phone number." },
          { status: 400 }
        );
      }

      console.log("🏫 [Campus Innovation Club] New Partnership Request Received:", {
        collegeName,
        contactPersonName,
        designation,
        email,
        phone: cleanedPhone,
        city,
        state,
        studentCommunitySize,
        collegeWebsite,
        message,
        receivedAt: new Date().toISOString()
      });

      // Attempt to forward to notification email
      try {
        await fetch("https://formsubmit.co/ajax/support@techiehelp.in", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            _subject: `🚀 Campus Club Partnership: ${collegeName}`,
            _template: "table",
            collegeName,
            contactPersonName,
            designation,
            email,
            phone: cleanedPhone,
            city,
            state,
            studentCommunitySize,
            collegeWebsite,
            message,
            timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
          })
        }).catch(() => null);
      } catch (e) {
        // Continue
      }

      return Response.json({
        success: true,
        message: "Partnership request submitted successfully. Our Institutional Partnerships team will connect with your college within 24-48 hours."
      });
    } else {
      // Student / Leadership registration
      if (!studentName || !email || !phone || !collegeName) {
        return Response.json(
          { success: false, error: "Please fill in your name, email, phone, and college." },
          { status: 400 }
        );
      }

      console.log("🎓 [Campus Innovation Club] New Student Community Registration:", {
        studentName,
        email,
        phone,
        collegeName,
        branch,
        year,
        interestedRole,
        skillsInterest,
        receivedAt: new Date().toISOString()
      });

      try {
        await fetch("https://formsubmit.co/ajax/support@techiehelp.in", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            _subject: `🎓 Campus Club Student Join: ${studentName} (${interestedRole || "Member"})`,
            studentName,
            email,
            phone,
            collegeName,
            branch,
            year,
            interestedRole,
            skillsInterest,
            timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
          })
        }).catch(() => null);
      } catch (e) {
        // Continue
      }

      return Response.json({
        success: true,
        message: "Registration successful! Welcome to the TechieHelp Campus Innovation Club network."
      });
    }
  } catch (error) {
    console.error("Error processing campus innovation club submission:", error);
    return Response.json(
      { success: false, error: "Internal server error. Please try again or email support@techiehelp.in directly." },
      { status: 500 }
    );
  }
}
