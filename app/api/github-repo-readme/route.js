import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function POST(request) {
  try {
    const { repoName, techStack, problemSolved } = await request.json();

    if (!repoName || !techStack || !problemSolved) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const prompt = `
      Generate a professional GitHub README.md for a repository.

      Repository Name: "${repoName}"
      Tech Stack: "${techStack}"
      Problem Solved: "${problemSolved}"

      Please provide the README content in the following JSON format:
      {
        "readme": "Full README.md content in markdown format"
      }

      Include sections:
      - Project title and description
      - Tech stack badges
      - Features
      - Installation instructions
      - Usage examples
      - Contributing guidelines
      - License

      Make it professional, well-structured, and recruiter-friendly.
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
        readme: `# ${repoName}

## 🚀 Overview
A comprehensive solution that addresses ${problemSolved} using modern technologies.

## 🛠️ Tech Stack
${techStack.split(',').map(tech => `- ${tech.trim()}`).join('\n')}

## ✨ Features
- Clean and maintainable code
- Well-documented API
- Responsive design
- Performance optimized

## 📦 Installation

\`\`\`bash
git clone https://github.com/yourusername/${repoName.toLowerCase().replace(/\s+/g, '-')}
cd ${repoName.toLowerCase().replace(/\s+/g, '-')}
npm install
\`\`\`

## 🚀 Usage

\`\`\`javascript
// Example usage
const app = require('${repoName.toLowerCase().replace(/\s+/g, '-')}');
app.start();
\`\`\`

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.`
      });
    }

  } catch (error) {
    console.error("GitHub Repo README error:", error);
    return NextResponse.json(
      { error: "Failed to generate README" },
      { status: 500 }
    );
  }
}
