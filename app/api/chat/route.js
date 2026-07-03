import { NextResponse } from "next/server";

// Comprehensive Local Knowledge Base for TechieHelp
const KNOWLEDGE_BASE = [
  {
    keywords: ["intern"], // Matches intern, internship, internsip
    response: "Our **Internship Program** provides you with:\n\n- Access to our world-class LMS & Student Dashboard.\n- Live Projects & Weekly Tasks with video feedback.\n- Mock Interviews & Resume Builder.\n- Performance-based Stipends & Placement Support.\n\n**Ready to start?**\n👉 [Apply via Portal](/internship)\n💳 [Direct Registration & Payment (Cashfree)](https://payments.cashfree.com/forms/techiehelpinternship)"
  },
  {
    keywords: ["apply", "register", "join", "enroll", "payment", "pay", "cashfree"],
    response: "You can register for our Training & Internship Programs using one of the following options:\n\n1. 👉 [Apply via our Portal](/internship)\n2. 💳 [Direct Registration & Payment (Cashfree)](https://payments.cashfree.com/forms/techiehelpinternship)\n\nIf you face any issues, contact us on WhatsApp at **+91-7673825079**."
  },
  {
    keywords: ["verify", "certificate", "certification", "certifications"],
    response: "All certificates issued by TechieHelp are 100% verifiable online. \n\nYou can enter your Certificate ID on our verification page to authenticate it.\n\n👉 [Verify Your Certificate Here](/verify-certificate)"
  },
  {
    keywords: ["web", "mern", "frontend", "backend", "fullstack", "app", "android", "cyber", "cloud", "devops", "marketing", "data", "ai", "machine learning"],
    response: "We offer industry-leading training programs including:\n\n- Artificial Intelligence & Machine Learning\n- Data Science\n- Web Development (MERN)\n- App Development\n- Cyber Security\n- Cloud Computing (DevOps)\n- Digital Marketing\n\n👉 [Explore our Programs](/skill-development-programs)"
  },
  {
    keywords: ["course", "programs", "training", "learn", "syllabus", "detail", "info"],
    response: "We have multiple Training & Internship programs designed to make you industry-ready. Are you looking for a specific domain like Web Development, Data Science, or AI?\n\n👉 [Explore All Programs Here](/skill-development-programs)"
  },
  {
    keywords: ["contact", "number", "whatsapp", "call", "reach", "location", "address", "where", "phone"],
    response: "We are located in **Jodhpur, Rajasthan**.\n\nYou can reach out to us anytime via WhatsApp or Call at **+91-7673825079**."
  },
  {
    keywords: ["fee", "price", "cost", "stipend"],
    response: "For detailed information regarding fee structures and stipends, please chat with our support team on WhatsApp at **+91-7673825079** or check the respective program page."
  },
  {
    keywords: ["hi", "hello", "hey", "start", "greetings", "good morning", "good evening"],
    response: "Hello! 👋 Welcome to TechieHelp Institute of AI. How can I help you today? You can ask me about our **Internships**, **Courses**, **Certificate Verification**, or **Contact Details**."
  }
];

export async function POST(req) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages format" }, { status: 400 });
    }

    const latestMessage = messages[messages.length - 1].content.toLowerCase();
    
    let matchedResponse = "I'm sorry, I didn't quite catch that. Could you please rephrase your question? For immediate assistance, you can always WhatsApp us at **+91-7673825079**.";

    // Advanced matching engine to handle typos (e.g. internsip -> contains 'intern')
    for (const entry of KNOWLEDGE_BASE) {
      const isMatch = entry.keywords.some(keyword => {
        // If keyword is very short (like "hi", "pay", "fee"), use word boundaries to avoid false positives (like 'hi' in 'ship')
        if (keyword.length <= 4 && !["web", "data", "info"].includes(keyword)) {
          const regex = new RegExp(`\\b${keyword}\\b`, "i");
          return regex.test(latestMessage);
        }
        // For longer keywords, use simple includes. This naturally handles typos at the end of words (e.g., intern in internsip)
        return latestMessage.includes(keyword.toLowerCase());
      });

      if (isMatch) {
        matchedResponse = entry.response;
        break; // Stop at first match
      }
    }

    // Small delay to simulate typing
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({ reply: matchedResponse });
  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Sorry, I am facing some technical difficulties right now. Please reach out via WhatsApp at +91-7673825079." },
      { status: 500 }
    );
  }
}
