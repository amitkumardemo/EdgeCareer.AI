"use server";

export async function submitContactForm(data) {
  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  console.log("Contact form submitted:", data);
  
  // In a real app, you would send an email or save to DB here.
  return { success: true, message: "Thank you! We'll get back to you soon." };
}
