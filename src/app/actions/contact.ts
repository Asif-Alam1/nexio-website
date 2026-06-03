"use server";

import { headers } from "next/headers";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { CONTACT_EMAIL } from "@/lib/constants";

interface ContactFormState {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 5000;

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Lazily-constructed limiter — only active when Upstash env vars are present,
// so local dev without Redis still works (submission proceeds unthrottled).
let ratelimit: Ratelimit | null = null;
function getRatelimit(): Ratelimit | null {
  if (ratelimit) return ratelimit;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    prefix: "nexio:contact",
    analytics: false,
  });
  return ratelimit;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const honeypot = formData.get("website");
    if (honeypot) return { success: true };

    // Per-IP rate limiting (best-effort: never block a real user if Redis is down).
    const limiter = getRatelimit();
    if (limiter) {
      try {
        const hdrs = await headers();
        const ip =
          hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ||
          hdrs.get("x-real-ip") ||
          "anonymous";
        const { success } = await limiter.limit(ip);
        if (!success) {
          return {
            success: false,
            error: "Too many requests. Please wait a few minutes and try again.",
          };
        }
      } catch (rlError) {
        console.error("Contact form: rate-limit check failed:", rlError);
      }
    }

    const name = stripHtml(String(formData.get("name") || ""));
    const email = String(formData.get("email") || "").trim().toLowerCase();
    const message = stripHtml(String(formData.get("message") || ""));

    const fieldErrors: Record<string, string> = {};
    if (!name || name.length < 2) fieldErrors.name = "Name is required.";
    else if (name.length > MAX_NAME) fieldErrors.name = "Name is too long.";

    if (!email || !isValidEmail(email)) fieldErrors.email = "Valid email is required.";
    else if (email.length > MAX_EMAIL) fieldErrors.email = "Email is too long.";

    if (!message || message.length < 10)
      fieldErrors.message = "Message must be at least 10 characters.";
    else if (message.length > MAX_MESSAGE)
      fieldErrors.message = `Message is too long (max ${MAX_MESSAGE} characters).`;

    if (Object.keys(fieldErrors).length > 0) {
      return { success: false, fieldErrors };
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === "re_placeholder") {
      if (process.env.NODE_ENV === "production") {
        // Misconfiguration — fail loudly rather than dropping the inquiry silently.
        console.error("Contact form: RESEND_API_KEY is not configured.");
        return {
          success: false,
          error: "Message could not be sent right now. Please email us directly.",
        };
      }
      // Local/preview without a key: simulate success for testing.
      return { success: true };
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Nexio Website <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    return { success: true };
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
