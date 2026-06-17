import Header from "@/components/header";
import PrivacyClient from "./PrivacyClient";

export const metadata = {
  title: "Privacy Policy | TechieHelp Institute of AI",
  description:
    "Read TechieHelp Institute of AI's Privacy Policy. Learn how we collect, use, store, and protect your personal information when you use our website, programs, internships, and services.",
  keywords: [
    "TechieHelp privacy policy",
    "data protection",
    "student privacy",
    "TechieHelp Institute of AI legal",
  ],
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <PrivacyClient />
    </>
  );
}
