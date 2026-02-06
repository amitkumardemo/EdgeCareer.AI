import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request) {
  try {
    const { username, role } = await request.json();

    if (!username || !role) {
      return NextResponse.json({ error: "Username and role are required" }, { status: 400 });
    }

    const prompt = `
      Generate a professional GitHub profile README.md for a developer.

      Username: "${username}"
      Target Role: "${role}"

      Please provide the profile README content in the following JSON format:
      {
        "readme": "Full profile README.md content in markdown format"
      }

      Include sections:
      - Welcome message
      - About me
      - Tech stack
      - Current projects
      - GitHub stats
      - Connect with me

      Make it personalized, professional, and showcase expertise in ${role}.
    `;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const aiResponse = response.text().trim();

    let jsonResponse = aiResponse;
    if (aiResponse.startsWith('```json')) {
      jsonResponse = aiResponse.replace(/```json\s*/, '').replace(/\s*```$/, '');
    } else if (aiResponse.startsWith('```')) {
      jsonResponse = aiResponse.replace(/```\s*/, '').replace(/\s*```$/, '');
    }

    try {
      const parsed = JSON.parse(jsonResponse);
      return NextResponse.json(parsed);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      return NextResponse.json({
        readme: `# Hi there! 👋

I'm **${username}**, a passionate ${role} focused on building innovative solutions and contributing to open-source projects.

## 🚀 About Me
- 🔭 Currently working on exciting projects
- 🌱 Always learning new technologies
- 💬 Ask me about ${role.toLowerCase()} development
- 📫 How to reach me: [LinkedIn](https://linkedin.com/in/${username})

## 🛠️ Tech Stack
\`\`\`
Languages: JavaScript, Python, TypeScript
Frameworks: React, Node.js, Express
Tools: Git, Docker, AWS
Databases: MongoDB, PostgreSQL
\`\`\`

## 📊 GitHub Stats
![${username}'s GitHub stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark)

## 🤝 Let's Connect
- [LinkedIn](https://linkedin.com/in/${username})
- [Portfolio](https://yourportfolio.com)
- [Email](mailto:your.email@example.com)

---
⭐️ From [${username}](https://github.com/${username})`
      });
    }

  } catch (error) {
    console.error("GitHub Profile README error:", error);
    return NextResponse.json(
      { error: "Failed to generate profile README" },
      { status: 500 }
    );
  }
}
