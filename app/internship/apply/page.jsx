import React from "react";
import Header from "@/components/header";
import InternshipRegistrationClient from "./InternshipRegistrationClient";

export const metadata = {
  title: "Apply for Internship | TechieHelp Institute of AI",
  description: "Join the ultimate AI & Software Development internship program at TechieHelp Institute of AI.",
};

export default function InternshipRegistrationPage() {
  return (
    <>
      <Header />
      <InternshipRegistrationClient />
    </>
  );
}
