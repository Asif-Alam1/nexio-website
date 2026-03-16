"use client";

import { useActionState, useRef, useEffect } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { submitContactForm } from "@/app/actions/contact";
import { cn } from "@/lib/utils";

interface ContactFormState {
  success: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

const initialState: ContactFormState = { success: false };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  const hasError = !state.success && !!state.error;

  return (
    <div
      className={cn(
        "bg-white rounded-panel border border-border p-6 md:p-8 shadow-sm",
        hasError && "animate-shake"
      )}
      key={hasError ? "error" : "idle"}
    >
      {/* Success state */}
      {state.success && (
        <div
          className="flex items-center gap-m text-green mb-l"
          role="status"
          aria-live="polite"
        >
          <CheckCircle size={20} />
          <span className="text-body text-midnight">Message sent! We&apos;ll be in touch soon.</span>
        </div>
      )}

      {/* Global error */}
      {state.error && (
        <div
          className="text-red text-caption mb-l border border-red/30 rounded-input px-m py-s"
          role="alert"
        >
          {state.error}
        </div>
      )}

      <form ref={formRef} action={formAction} noValidate>
        {/* Honeypot */}
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

        {/* Name field */}
        <div className="relative mb-l">
          <input
            id="name"
            name="name"
            type="text"
            required
            className={cn(
              "peer w-full bg-cloud border rounded-input px-4 pt-5 pb-2 text-midnight text-body outline-none focus:ring-2 focus:ring-blue transition-all duration-focus",
              state.fieldErrors?.name
                ? "border-red focus:ring-red"
                : "border-border"
            )}
            placeholder=" "
            aria-describedby={state.fieldErrors?.name ? "name-error" : undefined}
          />
          <label
            htmlFor="name"
            className="absolute left-4 top-3.5 text-slate text-body transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-body peer-focus:top-1 peer-focus:text-[11px] peer-focus:text-blue peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-blue"
          >
            Your Name
          </label>
          {state.fieldErrors?.name && (
            <p id="name-error" className="mt-xs text-caption text-red">
              {state.fieldErrors.name}
            </p>
          )}
        </div>

        {/* Email field */}
        <div className="relative mb-l">
          <input
            id="email"
            name="email"
            type="email"
            required
            className={cn(
              "peer w-full bg-cloud border rounded-input px-4 pt-5 pb-2 text-midnight text-body outline-none focus:ring-2 focus:ring-blue transition-all duration-focus",
              state.fieldErrors?.email
                ? "border-red focus:ring-red"
                : "border-border"
            )}
            placeholder=" "
            aria-describedby={state.fieldErrors?.email ? "email-error" : undefined}
          />
          <label
            htmlFor="email"
            className="absolute left-4 top-3.5 text-slate text-body transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-body peer-focus:top-1 peer-focus:text-[11px] peer-focus:text-blue peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-blue"
          >
            Your Email
          </label>
          {state.fieldErrors?.email && (
            <p id="email-error" className="mt-xs text-caption text-red">
              {state.fieldErrors.email}
            </p>
          )}
        </div>

        {/* Message field */}
        <div className="relative mb-xl">
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className={cn(
              "peer w-full bg-cloud border rounded-input px-4 pt-5 pb-2 text-midnight text-body outline-none focus:ring-2 focus:ring-blue transition-all duration-focus resize-none",
              state.fieldErrors?.message
                ? "border-red focus:ring-red"
                : "border-border"
            )}
            placeholder=" "
            aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
          />
          <label
            htmlFor="message"
            className="absolute left-4 top-3.5 text-slate text-body transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-body peer-focus:top-1 peer-focus:text-[11px] peer-focus:text-blue peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:text-blue"
          >
            Your Message
          </label>
          {state.fieldErrors?.message && (
            <p id="message-error" className="mt-xs text-caption text-red">
              {state.fieldErrors.message}
            </p>
          )}
        </div>

        <div aria-live="polite" className="sr-only">
          {isPending ? "Sending your message..." : ""}
        </div>

        <Button variant="submit" type="submit" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </div>
  );
}
