import { useDialog as useDialogProvider } from "@/components/providers/dialog-provider";

// Re-export the main dialog hook from the provider
export const useDialog = useDialogProvider;

// Re-export types for convenience
export type { DialogData } from "@/lib/stores/dialog-store";

// Re-export store selectors for advanced usage
export {
  useDialogOpen,
  useDialogData,
  useDialogLoading,
  useDialogId,
  useDialogActions,
} from "@/lib/stores/dialog-store"; 