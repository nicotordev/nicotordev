"use client";

import { useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import {
  useDialogOpen,
  useDialogData,
  useDialogLoading,
  useDialogId,
  useDialogActions,
  type DialogData
} from "@/lib/stores/dialog-store";

const variantIcons = {
  default: Info,
  destructive: AlertTriangle,
  warning: AlertTriangle,
  success: CheckCircle,
};

const variantStyles = {
  default: "text-primary",
  destructive: "text-destructive",
  warning: "text-yellow-500",
  success: "text-green-500",
};

const sizeStyles = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-[95vw] max-h-[95vh]",
};

interface DialogProviderProps {
  children: React.ReactNode;
}

function GlobalDialog() {
  const isOpen = useDialogOpen();
  const data = useDialogData();
  const loading = useDialogLoading();
  const dialogId = useDialogId();
  const { closeDialog } = useDialogActions();

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && data?.closeOnEscape !== false) {
        closeDialog();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, data?.closeOnEscape, closeDialog]);

  if (!data) return null;

  const Icon = data.variant ? variantIcons[data.variant] : variantIcons.default;
  const iconStyle = data.variant ? variantStyles[data.variant] : variantStyles.default;
  const sizeStyle = data.size ? sizeStyles[data.size] : sizeStyles.md;

  const handleConfirm = async () => {
    if (data.onConfirm) {
      try {
        await data.onConfirm();
      } catch (error) {
        console.error("Dialog confirm error:", error);
      }
    } else {
      closeDialog();
    }
  };

  const handleCancel = () => {
    if (data.onCancel) {
      data.onCancel();
    } else {
      closeDialog();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open && data.closeOnOverlayClick !== false) {
      closeDialog();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(sizeStyle)}
        showCloseButton={data.showCloseButton !== false}
        onPointerDownOutside={(e) => {
          if (data.closeOnOverlayClick === false) {
            e.preventDefault();
          }
        }}
        onEscapeKeyDown={(e) => {
          if (data.closeOnEscape === false) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          {data.title && (
            <DialogTitle className="flex items-center gap-3">
              {data.variant && (
                <Icon className={cn("w-5 h-5", iconStyle)} />
              )}
              {data.title}
            </DialogTitle>
          )}
          {data.description && (
            <DialogDescription>{data.description}</DialogDescription>
          )}
        </DialogHeader>

        {data.content && (
          <div className="py-4">
            {data.content}
          </div>
        )}

        <DialogFooter className="gap-2">
          {/* Cancel button - only show if we have both confirm and cancel text, or if it's a confirmation dialog */}
          {(data.cancelText || (data.confirmText && dialogId === 'confirm')) && (
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              {data.cancelText || 'Cancel'}
            </Button>
          )}

          {/* Confirm button */}
          {data.confirmText && (
            <Button
              variant={data.variant === 'destructive' ? 'destructive' : 'default'}
              onClick={handleConfirm}
              disabled={loading}
              className="min-w-[80px]"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {data.confirmText}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DialogProvider({ children }: DialogProviderProps) {
  return (
    <>
      {children}
      <GlobalDialog />
    </>
  );
}

// Convenience hook for easy dialog usage
export function useDialog() {
  const actions = useDialogActions();
  const isOpen = useDialogOpen();
  const loading = useDialogLoading();
  const data = useDialogData();

  return {
    ...actions,
    isOpen,
    loading,
    data,
    
    // Convenience methods with pre-configured variants
    confirmDelete: (data: Omit<DialogData, 'variant'>) =>
      actions.confirm({
        variant: 'destructive',
        confirmText: 'Delete',
        cancelText: 'Cancel',
        ...data,
      }),
    
    confirmAction: (data: Omit<DialogData, 'variant'>) =>
      actions.confirm({
        variant: 'default',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        ...data,
      }),
    
    showSuccess: (data: Pick<DialogData, 'title' | 'description'>) =>
      actions.alert({
        variant: 'success',
        ...data,
      }),
    
    showError: (data: Pick<DialogData, 'title' | 'description'>) =>
      actions.alert({
        variant: 'destructive',
        ...data,
      }),
    
    showWarning: (data: Pick<DialogData, 'title' | 'description'>) =>
      actions.alert({
        variant: 'warning',
        ...data,
      }),
    
    showInfo: (data: Pick<DialogData, 'title' | 'description'>) =>
      actions.alert({
        variant: 'default',
        ...data,
      }),
  };
} 