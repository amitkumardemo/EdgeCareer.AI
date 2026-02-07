"use client";

import { Trophy, CheckCircle2, XCircle, Share2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BUTTONS_MENUS } from "@/lib/constants";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

export default function QuizResult({
  result,
  hideStartNew = false,
  onStartNew,
}) {
  const { user } = useUser();
  const userName = user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.firstName || user?.username || 'Valued User';

  if (!result) return null;

  // Parse questions if it's a JSON string
  const questions = typeof result.questions === 'string' 
    ? (() => {
        try {
          return JSON.parse(result.questions);
        } catch (error) {
          console.error('Failed to parse questions:', error);
          return [];
        }
      })()
    : (Array.isArray(result.questions) ? result.questions : []);

  const shareOnLinkedIn = () => {
    const text = `🎉 I just completed a Mock Interview Test on TechieHelp Institute of AI and scored ${result.quizScore.toFixed(1)}%! 🚀 Ready to ace my next interview! #TechieHelpAI #MockInterview #CareerGrowth`;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const downloadCertificate = () => {
    // Generate unique certificate number
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    const certificateNumber = `TECHIE-${timestamp}-${randomNum}`;

    // Create a professional certificate
    const canvas = document.createElement('canvas');
    canvas.width = 1000;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1000, 700);
    gradient.addColorStop(0, '#1e3a8a'); // Dark blue
    gradient.addColorStop(0.5, '#3b82f6'); // Blue
    gradient.addColorStop(1, '#1e40af'); // Darker blue
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1000, 700);

    // Decorative border
    ctx.strokeStyle = '#fbbf24'; // Gold
    ctx.lineWidth = 8;
    ctx.strokeRect(30, 30, 940, 640);

    // Inner border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.strokeRect(40, 40, 920, 620);

    // Load and draw logo at top-left
    const logo = new Image();
    logo.crossOrigin = 'anonymous';
    logo.onload = () => {
      // Draw logo at top-left corner
      const logoWidth = 80;
      const logoHeight = 80;
      const logoX = 60;
      const logoY = 50;
      ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
      
      // Continue with the rest of the certificate
      drawCertificateContent();
    };
    logo.onerror = () => {
      // If logo fails to load, continue without it
      drawCertificateContent();
    };
    logo.src = '/skill.png';

    const drawCertificateContent = () => {
      // Certificate number (top right)
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 16px serif';
      ctx.textAlign = 'right';
      ctx.fillText(`Certificate No: ${certificateNumber}`, 920, 70);

      // Header text
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 42px serif';
      ctx.textAlign = 'center';
      ctx.fillText('CERTIFICATE OF ACHIEVEMENT', 500, 120);

      // Subtitle
      ctx.font = 'italic 28px serif';
      ctx.fillStyle = '#e5e7eb';
      ctx.fillText('Mock Interview Test Completion', 500, 170);

      // Main content
      ctx.fillStyle = '#ffffff';
      ctx.font = '24px serif';
      ctx.fillText('This is to certify that', 500, 250);

      // Name
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 36px serif';
      ctx.fillText(userName, 500, 300);

      // Achievement text
      ctx.fillStyle = '#ffffff';
      ctx.font = '22px serif';
      ctx.fillText('has successfully completed the Mock Interview Test', 500, 350);
      ctx.fillText(`with a score of ${result.quizScore.toFixed(1)}%`, 500, 385);

      // Performance level
      let performanceLevel = '';
      if (result.quizScore >= 90) performanceLevel = 'Outstanding Performance';
      else if (result.quizScore >= 80) performanceLevel = 'Excellent Performance';
      else if (result.quizScore >= 70) performanceLevel = 'Good Performance';
      else if (result.quizScore >= 60) performanceLevel = 'Satisfactory Performance';
      else performanceLevel = 'Needs Improvement';

      ctx.fillStyle = '#60a5fa';
      ctx.font = 'bold 24px serif';
      ctx.fillText(performanceLevel, 500, 430);

      // Date
      ctx.fillStyle = '#e5e7eb';
      ctx.font = '18px serif';
      ctx.fillText(`Awarded on ${new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}`, 500, 480);

      // Load and draw signature image
      const signatureImg = new Image();
      signatureImg.crossOrigin = 'anonymous';
      signatureImg.onload = () => {
        // Draw signature above the line
        const sigWidth = 150;
        const sigHeight = 60;
        const sigX = 725;
        const sigY = 480;
        ctx.drawImage(signatureImg, sigX, sigY, sigWidth, sigHeight);

        // Signature line
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(700, 550);
        ctx.lineTo(850, 550);
        ctx.stroke();

        // Signature text
        ctx.fillStyle = '#e5e7eb';
        ctx.font = '16px serif';
        ctx.fillText('TechieHelp Institute of AI', 775, 575);

        // Footer
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 18px serif';
        ctx.fillText('https://techiehelpinstituteofai.in/', 500, 620);

        // Download
        const link = document.createElement('a');
        link.download = `TechieHelp_MockInterview_Certificate_${userName.replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL();
        link.click();

        toast.success('Certificate downloaded successfully!');
      };
      signatureImg.onerror = () => {
        // Fallback if image fails to load
        // Signature line
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(700, 550);
        ctx.lineTo(850, 550);
        ctx.stroke();

        // Signature text
        ctx.fillStyle = '#e5e7eb';
        ctx.font = '16px serif';
        ctx.fillText('TechieHelp Institute of AI', 775, 575);

        // Footer
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 18px serif';
        ctx.fillText('https://techiehelpinstituteofai.in/', 500, 620);

        // Download
        const link = document.createElement('a');
        link.download = `TechieHelp_MockInterview_Certificate_${userName.replace(/\s+/g, '_')}.png`;
        link.href = canvas.toDataURL();
        link.click();

        toast.success('Certificate downloaded successfully!');
      };
      signatureImg.src = '/EdgeCareers.png';
    };
  };

  return (
    <div className="mx-auto">
      <div className="text-center mb-6">
        <h1 className="flex items-center justify-center gap-2 text-3xl gradient-title">
          <Trophy className="h-8 w-8 text-yellow-500" />
          Quiz Results
        </h1>
        <p className="text-muted-foreground mt-2">Congratulations on completing your mock interview!</p>
      </div>

      {/* Achievement Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-6 mb-6 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Trophy className="h-10 w-10 text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Achievement Unlocked!</h2>
        <p className="text-lg mb-4">Mock Interview Test Completed</p>
        <div className="flex justify-center gap-4">
          <Button onClick={shareOnLinkedIn} variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share on LinkedIn
          </Button>
          <Button onClick={downloadCertificate} variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Certificate
          </Button>
        </div>
      </div>

      <CardContent className="space-y-6">
        {/* Score Overview */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold">{result.quizScore.toFixed(1)}%</h3>
          <Progress value={result.quizScore} className="w-full" />
          <p className="text-sm text-muted-foreground">
            {result.quizScore >= 80 ? 'Excellent performance!' :
             result.quizScore >= 60 ? 'Good job! Keep practicing.' :
             'Room for improvement. Review the explanations below.'}
          </p>
        </div>

        {/* Improvement Tip */}
        {result.improvementTip && (
          <div className="bg-muted p-4 rounded-lg">
            <p className="font-medium">Improvement Tip:</p>
            <p className="text-muted-foreground">{result.improvementTip}</p>
          </div>
        )}

        {/* Questions Review */}
        <div className="space-y-4">
          <h3 className="font-medium">Question Review</h3>
          {questions.map((q, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{q.question}</p>
                {q.isCorrect ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Your answer: {q.userAnswer}</p>
                {!q.isCorrect && <p>Correct answer: {q.answer}</p>}
              </div>
              <div className="text-sm bg-muted p-2 rounded">
                <p className="font-medium">Explanation:</p>
                <p>{q.explanation}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {!hideStartNew && (
        <CardFooter>
          <Button onClick={onStartNew} className="w-full">
            {BUTTONS_MENUS.QUIZ}
          </Button>
        </CardFooter>
      )}
    </div>
  );
}
