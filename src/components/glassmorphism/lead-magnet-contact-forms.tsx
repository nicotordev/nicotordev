import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/ui/typography";
import type messages from "@/locales/es-cl.json";
import { motion } from "framer-motion";

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
            <Typography role="label">
              {translations?.firstName || "First name"}
            </Typography>
          </Label>
          <Input
            id="first-name"
            name="first-name"
            autoComplete="given-name"
            placeholder={translations?.firstName || "John"}
            className="bg-background/10 backdrop-blur-sm border-white/10 focus:border-primary/50 focus:bg-background/20 transition-all rounded-xl h-12"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="last-name">
            <Typography role="label">
              {translations?.lastName || "Last name"}
            </Typography>
          </Label>
          <Input
            id="last-name"
            name="last-name"
            autoComplete="family-name"
            placeholder={translations?.lastName || "Doe"}
            className="bg-background/10 backdrop-blur-sm border-white/10 focus:border-primary/50 focus:bg-background/20 transition-all rounded-xl h-12"
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
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center mt-8">
        <Button
          type="submit"
          size="lg"
          className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-primary px-8 transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          {translations?.submitFull || translations?.submit || "Let's talk"}
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
  return (
    <motion.form
      key="minimal-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <Label htmlFor="quick-message">
          <Typography role="label" className="text-lg">
            {translations?.quickMessageTitle || "Quick Message"}
          </Typography>
        </Label>
        <Typography role="body" className="text-sm text-muted-foreground">
          {translations?.quickMessageDescription ||
            "Share your name, contact info, and project details all in one message."}
        </Typography>
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
          className="bg-background/10 backdrop-blur-sm border-white/10 focus:border-primary/50 focus:bg-background/20 transition-all resize-none font-mono text-sm leading-relaxed rounded-2xl p-6"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center mt-6">
        <Button
          type="submit"
          size="lg"
          className="group relative w-full sm:w-auto overflow-hidden rounded-full bg-primary px-8 transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          {translations?.submitQuick || translations?.submit || "Send Message"}
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
