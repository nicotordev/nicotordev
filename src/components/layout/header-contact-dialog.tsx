"use client";

import { LeadMagnetContactFormFull } from "@/components/glassmorphism/lead-magnet-contact-forms";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Messages } from "@/types/i18n";

export interface HeaderContactDialogProps {
  messages: Messages;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HeaderContactDialog({
  messages,
  open,
  onOpenChange,
}: HeaderContactDialogProps) {
  const leadMagnet = messages.leadMagnet;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(90vh,48rem)] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {leadMagnet.title}{" "}
            <span className="text-primary">{leadMagnet.titleHighlight}</span>
          </DialogTitle>
          <DialogDescription>{leadMagnet.subtitle}</DialogDescription>
        </DialogHeader>

        <LeadMagnetContactFormFull
          translations={leadMagnet.form}
          source="header_contact"
          onSuccess={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
