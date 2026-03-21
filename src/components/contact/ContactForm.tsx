"use client";

import { useActionState, useRef, useEffect, useState, useCallback } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { cn } from "@/lib/utils";
import {
  CONTACT_EMAIL,
  WHATSAPP_NUMBER,
  WHATSAPP_URL,
  SOCIAL_LINKS,
} from "@/lib/constants";
import GlassPanel from "@/components/ui/GlassPanel";
import FloatingMetadata from "@/components/ui/FloatingMetadata";
import MagneticButton from "@/components/ui/MagneticButton";
import TextScramble from "@/components/ui/TextScramble";

interface ContactFormState {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

const initialState: ContactFormState = { success: false };

// Input field styling
const inputStyles =
  "bg-transparent border-b border-outline/30 focus:border-secondary focus:shadow-[0_1px_0_0_#2563EB] outline-none py-4 w-full font-body text-on-surface placeholder:text-on-surface-variant/40 transition-all";
const inputErrorStyles = "border-red-500 focus:border-red-500 focus:shadow-[0_1px_0_0_#ef4444]";
const labelStyles = "font-label text-[11px] uppercase tracking-widest text-on-surface-variant";

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = CONTACT_EMAIL;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <section className="px-6 md:px-12 pb-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left side - Contact Info (5 cols) */}
        <div className="lg:col-span-5 space-y-0">
          {/* Email block */}
          <div className="bg-surface-dim py-10 px-8">
            <FloatingMetadata className="mb-4 block">
              DIRECT_LINE
            </FloatingMetadata>
            <button
              type="button"
              onClick={copyEmail}
              className="font-headline italic text-2xl md:text-3xl text-on-surface hover:text-primary transition-colors duration-hover cursor-pointer text-left"
            >
              {copied ? (
                <TextScramble text="Copied to clipboard" trigger="mount" className="text-primary" />
              ) : (
                CONTACT_EMAIL
              )}
            </button>
          </div>

          {/* WhatsApp block */}
          <div className="bg-surface-low py-10 px-8">
            <FloatingMetadata className="mb-4 block">
              SIGNAL_CHANNEL
            </FloatingMetadata>
            <p className="font-headline italic text-xl text-on-surface mb-4">
              {WHATSAPP_NUMBER}
            </p>
            <MagneticButton variant="ghost" href={WHATSAPP_URL}>
              Message on WhatsApp
            </MagneticButton>
          </div>

          {/* Social block */}
          <div className="bg-surface-dim py-10 px-8">
            <FloatingMetadata className="mb-4 block">
              PROTOCOLS
            </FloatingMetadata>
            <div className="space-y-3">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-on-surface hover:text-primary underline underline-offset-4 decoration-outline-variant hover:decoration-primary transition-colors duration-hover"
              >
                <TextScramble text="Instagram" trigger="hover" />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-on-surface hover:text-primary underline underline-offset-4 decoration-outline-variant hover:decoration-primary transition-colors duration-hover"
              >
                <TextScramble text="LinkedIn" trigger="hover" />
              </a>
            </div>
          </div>

          {/* Location block */}
          <div className="bg-surface-low py-10 px-8">
            <FloatingMetadata className="mb-4 block">
              COORDINATES
            </FloatingMetadata>
            <p className="font-headline italic text-xl text-on-surface mb-2">
              Beirut, Lebanon
            </p>
            <FloatingMetadata>
              {"33.8938\u00B0 N, 35.5018\u00B0 E"}
            </FloatingMetadata>
          </div>
        </div>

        {/* Right side - The Form (7 cols) */}
        <div className="lg:col-span-7">
          <GlassPanel className="p-8 md:p-12 relative">
            <FloatingMetadata className="absolute top-6 right-6 md:top-8 md:right-8">
              {"SECURE_FORM // ENCRYPTED"}
            </FloatingMetadata>

            {/* Success state */}
            {state.success ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] animate-[fadeIn_0.6s_ease-out]">
                <h2 className="font-headline italic text-4xl text-on-surface mb-4">
                  Message Received.
                </h2>
                <FloatingMetadata>RESPONSE_TIME: &lt; 24H</FloatingMetadata>
                <div className="flex gap-3 mt-8">
                  <span className="w-2 h-2 rounded-full bg-primary animate-[fade_2s_ease-in-out_infinite_alternate]" />
                  <span
                    className="w-2 h-2 rounded-full bg-secondary animate-[fade_2s_ease-in-out_infinite_alternate]"
                    style={{ animationDelay: "0.5s" }}
                  />
                </div>
              </div>
            ) : (
              <form ref={formRef} action={formAction} noValidate className="pt-8">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Global error */}
                {state.error && (
                  <div
                    className="text-sm text-red-500 mb-8 border border-red-500/30 px-4 py-3"
                    role="alert"
                  >
                    {state.error}
                  </div>
                )}

                {/* Name field */}
                <div className="mb-8">
                  <label htmlFor="contact-name" className={labelStyles}>
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className={cn(
                      inputStyles,
                      state.fieldErrors?.name && inputErrorStyles
                    )}
                    aria-describedby={
                      state.fieldErrors?.name ? "name-error" : undefined
                    }
                  />
                  {state.fieldErrors?.name && (
                    <p id="name-error" className="mt-2 text-sm text-red-500">
                      {state.fieldErrors.name}
                    </p>
                  )}
                </div>

                {/* Email field */}
                <div className="mb-8">
                  <label htmlFor="contact-email" className={labelStyles}>
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    className={cn(
                      inputStyles,
                      state.fieldErrors?.email && inputErrorStyles
                    )}
                    aria-describedby={
                      state.fieldErrors?.email ? "email-error" : undefined
                    }
                  />
                  {state.fieldErrors?.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-500">
                      {state.fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Message field */}
                <div className="mb-10">
                  <label htmlFor="contact-message" className={labelStyles}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    placeholder="Tell us about your project..."
                    className={cn(
                      inputStyles,
                      "min-h-[120px] resize-y",
                      state.fieldErrors?.message && inputErrorStyles
                    )}
                    aria-describedby={
                      state.fieldErrors?.message ? "message-error" : undefined
                    }
                  />
                  {state.fieldErrors?.message && (
                    <p id="message-error" className="mt-2 text-sm text-red-500">
                      {state.fieldErrors.message}
                    </p>
                  )}
                </div>

                <div aria-live="polite" className="sr-only">
                  {isPending ? "Sending your message..." : ""}
                </div>

                <MagneticButton
                  variant="gradient"
                  type="submit"
                  disabled={isPending}
                  className="w-full"
                >
                  {isPending ? "SENDING..." : "TRANSMIT"}
                </MagneticButton>
              </form>
            )}
          </GlassPanel>
        </div>
      </div>
    </section>
  );
}
