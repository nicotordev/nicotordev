"use client";

import { Toaster, toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, Loader2, Info } from "lucide-react";

/* ----------------------------- ICONS ----------------------------- */
const ToastIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "success":
      return (
        <CheckCircle className="h-5 w-5 text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
      );
    case "error":
      return (
        <AlertTriangle className="h-5 w-5 text-destructive drop-shadow-[0_0_6px_rgba(244,63,94,0.5)]" />
      );
    case "loading":
      return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
    default:
      return <Info className="h-5 w-5 text-primary/90" />;
  }
};

/* ----------------------------- TOAST COMPONENT ----------------------------- */
const GlassToast = ({ t }: any) => {
  return (
    <div
      className={cn(
        "relative flex w-full items-center gap-3 overflow-hidden",
        "rounded-2xl border border-white/15 shadow-xl backdrop-blur-2xl",
        "bg-background/20 px-4 py-3 text-foreground transition-all",
        "before:absolute before:-inset-12 before:-z-10 before:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.22),transparent_60%)] before:opacity-50",
        "after:absolute after:-inset-16 after:-z-20 after:bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.2),transparent_70%)] after:opacity-30"
      )}
    >
      <ToastIcon type={t.type} />

      {/* Message */}
      <span className="text-sm font-medium">{t.message}</span>

      {/* Close */}
      {t.type !== "loading" && (
        <button
          onClick={() => toast.dismiss(t.id)}
          className="ml-auto rounded-md px-2 py-1 text-xs text-foreground/60 hover:text-primary transition"
        >
          ✕
        </button>
      )}
    </div>
  );
};

/* ----------------------------- TOASTER WRAPPER ----------------------------- */
export const GlassToaster = () => {
  return (
    <Toaster
      position="top-center"
      gutter={16}
      toastOptions={{
        duration: 3000,
        className: "!bg-transparent !shadow-none !p-0",
        style: { background: "transparent", boxShadow: "none" },

        // Default Render
        success: {
          icon: null,
        },
        error: {
          icon: null,
        },
        loading: {
          icon: null,
        },
      }}
    >
      {(t) => <GlassToast t={t} />}
    </Toaster>
  );
};

export default GlassToaster;
