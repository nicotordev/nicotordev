"use client";

import { saveLeadAction } from "@/app/actions/lead.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/ui/typography";
import useConceAI from "@/hooks/useConceAI";
import type messages from "@/locales/es-cl.json";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Turnstile } from "next-turnstile";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

type LeadMagnetFormTranslations = (typeof messages)["leadMagnet"]["form"];

interface LeadMagnetContactFormProps {
  translations?: LeadMagnetFormTranslations;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function extractEmail(text: string) {
  const match = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match?.[0] ?? null;
}

function extractName(text: string) {
  const patterns: RegExp[] = [
    /\bmy name is\s+([^\n\r]+)/i,
    /\bmi nombre es\s+([^\n\r]+)/i,
    /\b(?:name|nombre)\s*:\s*([^\n\r]+)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    const name = match?.[1]?.trim();
    if (name && name.length >= 2) return name.replace(/[.,;:!?\s]+$/, "");
  }

  return null;
}

export default function LeadMagnetContactFormMinimal({
  translations,
}: LeadMagnetContactFormProps) {
  const t = useTranslations("leadMagnet.form");
  const { loading, sendContactRequest } = useConceAI();
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const [formState, setFormState] = useState({
    quickMessage: "",
    turnstileToken: "",
  });
  const [turnstileKey, setTurnstileKey] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const message = formState.quickMessage.trim();
    if (!message) {
      toast.error(`${t("errors.required")}: ${t("message")}`);
      return;
    }

    if (!formState.turnstileToken) {
      toast.error(`${t("errors.required")}: Turnstile`);
      return;
    }

    const email = extractEmail(message);
    if (!email) {
      toast.error(`${t("errors.required")}: ${t("email")}`);
      return;
    }
    if (!isValidEmail(email)) {
      toast.error(t("errors.email_invalid"));
      return;
    }

    const name = extractName(message);
    if (!name) {
      toast.error(`${t("errors.required")}: ${t("name")}`);
      return;
    }

    try {
      await saveLeadAction({
        name,
        email,
        message,
        source: "lead_magnet_minimal",
        turnstileToken: formState.turnstileToken,
      });

      await sendContactRequest({
        name,
        email,
        message,
        turnstileToken: formState.turnstileToken,
      });
      toast.success(t("successMessage"));
      // Reset form on success
      setFormState({
        quickMessage: "",
        turnstileToken: "",
      });
      setTurnstileKey((k) => k + 1);
    } catch (error) {
      console.error(error);
      toast.error(t("errorMessage"));
      setFormState((prev) => ({ ...prev, turnstileToken: "" }));
      setTurnstileKey((k) => k + 1);
    }
  };

  return (
    <motion.form
      key="minimal-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="space-y-4">
        <Label htmlFor="quickMessage">
          <Typography role="label" className="text-lg">
            {translations?.quickMessageTitle || "Quick Message"}
          </Typography>
        </Label>
        <Typography role="body" className="text-sm text-muted-foreground">
          {translations?.quickMessageDescription ||
            "Share your name, contact info, and project details all in one message."}
        </Typography>
        <Textarea
          id="quickMessage"
          name="quickMessage"
          rows={12}
          placeholder={
            translations?.quickMessagePlaceholder ||
            `Hi Nico! 👋

My name is [Your Name]
Email: [your.email@example.com]
Budget: [$amount or hourly rate]

I'm looking for help with:
[Describe your project here...]

Looking forward to hearing from you!`
          }
          className="bg-background/10 backdrop-blur-sm border-white/10 focus:border-primary/50 focus:bg-background/20 transition-all resize-none font-mono text-sm leading-relaxed rounded-2xl p-6"
          onChange={handleInputChange}
          value={formState.quickMessage}
          disabled={loading}
        />
      </div>

      {turnstileSiteKey ? (
        <div className="flex justify-center sm:justify-start">
          <Turnstile
            key={turnstileKey}
            siteKey={turnstileSiteKey}
            sandbox={process.env.NODE_ENV === "development"}
            theme="auto"
            size="flexible"
            onVerify={(token) =>
              setFormState((prev) => ({ ...prev, turnstileToken: token }))
            }
            onExpire={() =>
              setFormState((prev) => ({ ...prev, turnstileToken: "" }))
            }
            onError={() =>
              setFormState((prev) => ({ ...prev, turnstileToken: "" }))
            }
          />
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-4 items-center mt-8">
        <Button
          type="submit"
          size="lg"
          disabled={loading || !formState.turnstileToken}
          className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-primary px-8 transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="inline-flex items-center gap-2">
            {loading ? <Spinner className="text-primary-foreground" /> : null}
            {translations?.submitQuick || translations?.submit || "Send Message"}
          </span>
        </Button>

        <Typography role="caption" className="text-xs text-muted-foreground/80">
          {translations?.privacyCopy ||
            "By submitting this form, I agree to the"}{" "}
          <a
            href="#"
            className="text-primary hover:text-primary/80 underline decoration-primary/30 underline-offset-4"
          >
            {translations?.privacyPolicy || "privacy policy"}
          </a>
          .
        </Typography>
      </div>
    </motion.form>
  );
}

export function LeadMagnetContactFormFull({
  translations,
}: LeadMagnetContactFormProps) {
  const t = useTranslations("leadMagnet.form");
  const { loading, sendContactRequest } = useConceAI();
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    budget: "",
    website: "",
    message: "",
    turnstileToken: "",
  });
  const [turnstileKey, setTurnstileKey] = useState(0);

  const derivedName = useMemo(() => {
    return [formState.firstName.trim(), formState.lastName.trim()]
      .filter(Boolean)
      .join(" ");
  }, [formState.firstName, formState.lastName]);

  const derivedMessage = useMemo(() => {
    const base = formState.message.trim();
    const extras: string[] = [];

    if (formState.budget.trim()) extras.push(`Budget: ${formState.budget.trim()}`);
    if (formState.website.trim())
      extras.push(`Website: ${formState.website.trim()}`);

    if (extras.length === 0) return base;
    if (!base) return extras.join("\n");

    return `${base}\n\n${extras.join("\n")}`;
  }, [formState.budget, formState.message, formState.website]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!derivedName) {
      toast.error(`${t("errors.required")}: ${translations?.name || t("name")}`);
      return;
    }
    if (!formState.email.trim()) {
      toast.error(`${t("errors.required")}: ${translations?.email || t("email")}`);
      return;
    }
    if (!isValidEmail(formState.email.trim())) {
      toast.error(t("errors.email_invalid"));
      return;
    }
    if (!derivedMessage) {
      toast.error(
        `${t("errors.required")}: ${translations?.message || t("message")}`
      );
      return;
    }
    if (!formState.turnstileToken) {
      toast.error(`${t("errors.required")}: Turnstile`);
      return;
    }

    try {
      await saveLeadAction({
        name: derivedName,
        email: formState.email.trim(),
        message: derivedMessage,
        source: "lead_magnet_full",
        turnstileToken: formState.turnstileToken,
      });

      await sendContactRequest({
        name: derivedName,
        email: formState.email.trim(),
        message: derivedMessage,
        turnstileToken: formState.turnstileToken,
      });
      toast.success(t("successMessage"));
      // Reset form on success
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        budget: "",
        website: "",
        message: "",
        turnstileToken: "",
      });
      setTurnstileKey((k) => k + 1);
    } catch (error) {
      console.error(error);
      toast.error(t("errorMessage"));
      setFormState((prev) => ({ ...prev, turnstileToken: "" }));
      setTurnstileKey((k) => k + 1);
    }
  };

  return (
    <motion.form
      key="full-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName">
            <Typography role="label">
              {translations?.firstName || "First name"}
            </Typography>
          </Label>
          <Input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            placeholder={translations?.firstName || "John"}
            className="bg-background/10 backdrop-blur-sm border-white/10 focus:border-primary/50 focus:bg-background/20 transition-all rounded-xl h-12"
            onChange={handleInputChange}
            value={formState.firstName}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">
            <Typography role="label">
              {translations?.lastName || "Last name"}
            </Typography>
          </Label>
          <Input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            placeholder={translations?.lastName || "Doe"}
            className="bg-background/10 backdrop-blur-sm border-white/10 focus:border-primary/50 focus:bg-background/20 transition-all rounded-xl h-12"
            onChange={handleInputChange}
            value={formState.lastName}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            <Typography role="label">
              {translations?.email || "Email"}
            </Typography>
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={translations?.email || "john@example.com"}
            className="bg-background/10 backdrop-blur-sm border-white/10 focus:border-primary/50 focus:bg-background/20 transition-all rounded-xl h-12"
            onChange={handleInputChange}
            value={formState.email}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">
            <Typography role="label">
              {translations?.budget || "Budget"}
            </Typography>
          </Label>
          <Input
            id="budget"
            name="budget"
            placeholder={
              translations?.budget || "$28/hour or fixed-amount/project"
            }
            className="bg-background/10 backdrop-blur-sm border-white/10 focus:border-primary/50 focus:bg-background/20 transition-all rounded-xl h-12"
            onChange={handleInputChange}
            value={formState.budget}
            disabled={loading}
          />
        </div>

        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="website">
            <Typography role="label">
              {translations?.website || "Website"}
              <span className="text-muted-foreground ml-2 text-xs font-normal">
                {translations?.websiteOptionalHint || "(optional)"}
              </span>
            </Typography>
          </Label>
          <Input
            id="website"
            name="website"
            type="url"
            placeholder="https://example.com"
            className="bg-background/10 backdrop-blur-sm border-white/10 focus:border-primary/50 focus:bg-background/20 transition-all rounded-xl h-12"
            onChange={handleInputChange}
            value={formState.website}
            disabled={loading}
          />
        </div>

        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="message">
            <Typography role="label">
              {translations?.projectDetails || "Project Details"}
            </Typography>
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder={
              translations?.projectPlaceholder ||
              "Tell me about your project..."
            }
            className="bg-background/10 backdrop-blur-sm border-white/10 focus:border-primary/50 focus:bg-background/20 transition-all resize-none rounded-xl"
            onChange={handleInputChange}
            value={formState.message}
            disabled={loading}
          />
        </div>
      </div>

      {turnstileSiteKey ? (
        <div className="flex justify-center sm:justify-start">
          <Turnstile
            key={turnstileKey}
            siteKey={turnstileSiteKey}
            sandbox={process.env.NODE_ENV === "development"}
            theme="auto"
            size="flexible"
            onVerify={(token) =>
              setFormState((prev) => ({ ...prev, turnstileToken: token }))
            }
            onExpire={() =>
              setFormState((prev) => ({ ...prev, turnstileToken: "" }))
            }
            onError={() =>
              setFormState((prev) => ({ ...prev, turnstileToken: "" }))
            }
          />
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row gap-4 items-center mt-6">
        <Button
          type="submit"
          size="lg"
          disabled={loading || !formState.turnstileToken}
          className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-primary px-8 transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="inline-flex items-center gap-2">
            {loading ? <Spinner className="text-primary-foreground" /> : null}
            {translations?.submitFull || translations?.submit || "Let's talk"}
          </span>
        </Button>

        <Typography role="caption" className="text-xs text-muted-foreground/80">
          {translations?.privacyCopy ||
            "By submitting this form, I agree to the"}{" "}
          <a
            href="#"
            className="text-primary hover:text-primary/80 underline decoration-primary/30 underline-offset-4"
          >
            {translations?.privacyPolicy || "privacy policy"}
          </a>
          .
        </Typography>
      </div>
    </motion.form>
  );
}
