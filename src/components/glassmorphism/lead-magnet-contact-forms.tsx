import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type messages from "@/locales/es-cl.json";

type LeadMagnetFormTranslations = (typeof messages)["leadMagnet"]["form"];

interface LeadMagnetContactFormProps {
  translations?: LeadMagnetFormTranslations;
}

export default function LeadMagnetContactFormMinimal({
  translations,
}: LeadMagnetContactFormProps) {
  return (
    <motion.form
      key="full-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="first-name">
            {translations?.firstName || "First name"}
          </Label>
          <Input
            id="first-name"
            name="first-name"
            autoComplete="given-name"
            placeholder={translations?.firstName || "John"}
            className="bg-background/20 border-border/50 focus:bg-background/40 transition-all"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last-name">
            {translations?.lastName || "Last name"}
          </Label>
          <Input
            id="last-name"
            name="last-name"
            autoComplete="family-name"
            placeholder={translations?.lastName || "Doe"}
            className="bg-background/20 border-border/50 focus:bg-background/40 transition-all"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{translations?.email || "Email"}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={translations?.email || "john@example.com"}
            className="bg-background/20 border-border/50 focus:bg-background/40 transition-all"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="budget">{translations?.budget || "Budget"}</Label>
          <Input
            id="budget"
            name="budget"
            placeholder={translations?.budget || "$28/hour or fixed-amount/project"}
            className="bg-background/20 border-border/50 focus:bg-background/40 transition-all"
          />
        </div>

        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="website">
            {translations?.website || "Website"} {" "}
            <span className="text-muted-foreground text-xs">
              {translations?.websiteOptionalHint || "(optional)"}
            </span>
          </Label>
          <Input
            id="website"
            name="website"
            type="url"
            placeholder="https://example.com"
            className="bg-background/20 border-border/50 focus:bg-background/40 transition-all"
          />
        </div>

        <div className="sm:col-span-2 space-y-2">
          <Label htmlFor="message">
            {translations?.projectDetails || "Project Details"}
          </Label>
          <Textarea
            id="message"
            name="message"
            rows={4}
            placeholder={
              translations?.projectPlaceholder || "Tell me about your project..."
            }
            className="bg-background/20 border-border/50 focus:bg-background/40 transition-all resize-none"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40"
        >
          {translations?.submitFull || translations?.submit || "Let's talk"}
        </Button>

        <p className="text-xs text-muted-foreground">
          {translations?.privacyCopy || "By submitting this form, I agree to the"}{" "}
          <a href="#" className="text-primary hover:underline">
            {translations?.privacyPolicy || "privacy policy"}
          </a>
          .
        </p>
      </div>
    </motion.form>
  );
}

export function LeadMagnetContactFormFull({
  translations,
}: LeadMagnetContactFormProps) {
  return (
    <motion.form
      key="minimal-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="space-y-3">
        <Label htmlFor="quick-message" className="text-lg font-semibold">
          {translations?.quickMessageTitle || "Quick Message"}
        </Label>
        <p className="text-sm text-muted-foreground">
          {translations?.quickMessageDescription ||
            "Share your name, contact info, and project details all in one message."}
        </p>
        <Textarea
          id="quick-message"
          name="quick-message"
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
          className="bg-background/20 border-border/50 focus:bg-background/40 transition-all resize-none font-mono text-sm leading-relaxed"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40"
        >
          {translations?.submitQuick || translations?.submit || "Send Message"}
        </Button>

        <p className="text-xs text-muted-foreground">
          {translations?.privacyCopy || "By submitting this form, I agree to the"}{" "}
          <a href="#" className="text-primary hover:underline">
            {translations?.privacyPolicy || "privacy policy"}
          </a>
          .
        </p>
      </div>
    </motion.form>
  );
}
