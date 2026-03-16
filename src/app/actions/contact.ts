"use server";

import validator from "validator";
import sanitizeHtml from "sanitize-html";
import { resend } from "@/lib/resend";
import { CONTACT_EMAIL } from "@/lib/constants";

interface ContactFormState {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const honeypot = formData.get("website");
  if (honeypot) return { success: true };

  const name = sanitizeHtml(String(formData.get("name") || ""), {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
  const email = String(formData.get("email") || "").trim();
  const message = sanitizeHtml(String(formData.get("message") || ""), {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();

  const fieldErrors: Record<string, string> = {};
  if (!name || name.length < 2) fieldErrors.name = "Name is required.";
  if (!email || !validator.isEmail(email)) fieldErrors.email = "Valid email is required.";
  if (!message || message.length < 10) fieldErrors.message = "Message must be at least 10 characters.";

  if (Object.keys(fieldErrors).length > 0) {
    return { success: false, fieldErrors };
  }

  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_placeholder") {
    if (process.env.NODE_ENV === "development") {
      console.log("Contact form submission (Resend not configured):", { name, email });
    }
    return { success: true };
  }

  try {
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
