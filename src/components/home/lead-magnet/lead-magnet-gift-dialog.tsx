"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { emailSchema, type EmailSchema } from "@/schemas/user.schema";
import { Turnstile } from "next-turnstile";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";

interface LeadMagnetGiftDialogProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<"GIFT" | "FORM" | null>>;
}

const LeadMagnetGiftDialog = ({
  open,
  onOpenChange,
}: LeadMagnetGiftDialogProps) => {
  const { claimedGift, setClaimedGift } = useUIStore();

  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailSchema>({
    resolver: zodResolver(emailSchema),
  });

  const handleClose = () => {
    if (isSubmitting) return;

    reset();
    setTurnstileToken(null);
    setIsSuccess(false);
    onOpenChange(null);
  };

  const onSubmit: SubmitHandler<EmailSchema> = async (data) => {
    if (!turnstileToken) {
      console.error("No turnstile token available");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/claim-gift", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          token: turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to claim gift");
      }

      setIsSuccess(true);
      setClaimedGift();

      // Reset form after 2 seconds
      setTimeout(() => {
        reset();
        setIsSuccess(false);
        setTurnstileToken(null);
        onOpenChange(null);
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Error al reclamar el regalo. Por favor, intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        // Solo manejamos el cierre desde aquí
        if (!isOpen) handleClose();
      }}
    >
      <DialogContent>
        {/* Subtle animated border glow */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 0.8 }}
          className="pointer-events-none absolute inset-0 -z-10 rounded-3xl border border-white/10 mask-[linear-gradient(to_bottom,transparent,white,transparent)]"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative space-y-6 px-2 py-4 sm:px-3 sm:py-5"
        >
          {/* Soft inner gradient highlight */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            className="pointer-events-none absolute -inset-x-10 top-0 -z-10 h-40 bg-linear-to-b from-primary/20 via-secondary/10 to-transparent blur-2xl"
          />

          <DialogHeader className="space-y-3 pt-2">
            <DialogTitle className="flex items-center gap-2 text-2xl font-bold font-display">
              <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/20 text-primary shadow-sm shadow-primary/30">
                <Gift className="h-5 w-5" />
              </span>
              <span className="gradient-text">Reclamar mi regalo</span>
            </DialogTitle>

            <DialogDescription className="max-w-md text-sm text-foreground/70">
              Verifica tu humanidad y recibe acceso exclusivo a tu regalo. Sin
              spam, solo valor real.
            </DialogDescription>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Email Input */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/60"
                  >
                    Correo electrónico
                  </Label>
                  <div className="relative">
                    <motion.div
                      aria-hidden="true"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: errors.email ? 0.5 : 0.2 }}
                      className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-r from-primary/40 via-secondary/30 to-accent/40 blur-xl"
                    />
                    <Input
                      id="email"
                      placeholder="me@nicotordev.com"
                      type="email"
                      className={cn(
                        errors.email &&
                          "text-destructive placeholder:text-destructive/70"
                      )}
                      disabled={isSubmitting}
                      {...register("email")}
                    />
                  </div>

                  {errors.email && (
                    <motion.p
                      role="alert"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 flex items-center gap-1 text-xs text-destructive"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-destructive" />
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                {/* Turnstile Widget */}
                <div className="space-y-2">
                  <Label className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/60">
                    Verificación de seguridad
                  </Label>
                  <div className="relative overflow-hidden rounded-2xl border border-white/18 bg-linear-to-br from-background/40 via-background-secondary/40 to-background/15 p-px backdrop-blur-xl">
                    <div className="rounded-2xl bg-background/60 p-4 shadow-inner shadow-black/20">
                      <div className="flex flex-col items-center gap-3 text-xs text-foreground/70">
                        <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 backdrop-blur-xl">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80 animate-pulse" />
                          <span>Protegido por Turnstile</span>
                        </div>

                        <Turnstile
                          siteKey={
                            process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
                            "1x00000000000000000000AA"
                          }
                          onVerify={(token) => {
                            setTurnstileToken(token);
                          }}
                          onError={(error) => {
                            console.error("Turnstile error:", error);
                            setTurnstileToken(null);
                          }}
                          onExpire={() => {
                            setTurnstileToken(null);
                          }}
                          theme="auto"
                          size="normal"
                          sandbox={process.env.NODE_ENV === "development"}
                          className="mx-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dialog Footer with Buttons */}
                <DialogFooter className="mt-1 flex w-full flex-row items-center justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    disabled={!turnstileToken || isSubmitting}
                    aria-disabled={!turnstileToken || isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2
                          className="mr-2 h-4 w-4 animate-spin"
                          aria-hidden="true"
                        />
                        Procesando...
                      </>
                    ) : (
                      <>
                        <Gift className="mr-2 h-4 w-4" aria-hidden="true" />
                        Reclamar regalo
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -8 }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                className="flex flex-col items-center justify-center space-y-5 px-4 py-10 text-center"
              >
                <motion.div
                  initial={{ scale: 0.7, rotate: -4 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                  className="relative"
                >
                  <div className="absolute inset-0 rounded-full bg-linear-to-tr from-primary/40 via-secondary/40 to-accent/40 blur-xl opacity-60" />
                  <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/25 bg-white/10 shadow-xl backdrop-blur-2xl">
                    <CheckCircle className="h-12 w-12 text-primary" />
                  </div>
                </motion.div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold gradient-text">
                    ¡Regalo reclamado!
                  </h3>
                  <p className="text-sm text-foreground/75">
                    Revisa tu correo electrónico. Si no lo ves, mira también en
                    la carpeta de spam o promociones.
                  </p>
                </div>

                <div className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[11px] text-foreground/70 backdrop-blur-xl">
                  En unos segundos este cuadro se cerrará automáticamente ✨
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Status indicator */}
          {turnstileToken && !isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 flex items-center justify-center gap-2 text-[11px] text-primary/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Verificación completada · listo para reclamar
            </motion.div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadMagnetGiftDialog;
