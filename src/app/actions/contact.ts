"use server";

import { CONTACT_EMAIL } from "@/lib/constants";

interface ContactFormState {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const honeypot = formData.get("website");
    if (honeypot) return { success: true };

    const name = stripHtml(String(formData.get("name") || ""));
    const email = String(formData.get("email") || "").trim();
    const message = stripHtml(String(formData.get("message") || ""));

    const fieldErrors: Record<string, string> = {};
    if (!name || name.length < 2) fieldErrors.name = "Name is required.";
    if (!email || !isValidEmail(email)) fieldErrors.email = "Valid email is required.";
    if (!message || message.length < 10) fieldErrors.message = "Message must be at least 10 characters.";

    if (Object.keys(fieldErrors).length > 0) {
      return { success: false, fieldErrors };
    }

    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_placeholder") {
      return { success: true };
    }

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Nexio Website <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
