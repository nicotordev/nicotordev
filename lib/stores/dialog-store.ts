import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export interface DialogData {
  title?: string;
  description?: string;
  content?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  variant?: 'default' | 'destructive' | 'warning' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export interface DialogState {
  // State
  isOpen: boolean;
  dialogId: string | null;
  data: DialogData | null;
  loading: boolean;
  
  // Actions
  openDialog: (id: string, data?: DialogData) => void;
  closeDialog: () => void;
  updateDialog: (data: Partial<DialogData>) => void;
  setLoading: (loading: boolean) => void;
  
  // Confirmation dialogs
  confirm: (data: DialogData) => Promise<boolean>;
  
  // Alert dialogs
  alert: (data: Pick<DialogData, 'title' | 'description' | 'variant'>) => Promise<void>;
}

let confirmResolve: ((value: boolean) => void) | null = null;
let alertResolve: (() => void) | null = null;

export const useDialogStore = create<DialogState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    isOpen: false,
    dialogId: null,
    data: null,
    loading: false,

    // Actions
    openDialog: (id: string, data?: DialogData) => {
      set({
        isOpen: true,
        dialogId: id,
        data: data || null,
        loading: false,
      });
    },

    closeDialog: () => {
      const currentData = get().data;
      
      // Handle pending confirmations
      if (confirmResolve) {
        confirmResolve(false);
        confirmResolve = null;
      }
      
      // Handle pending alerts
      if (alertResolve) {
        alertResolve();
        alertResolve = null;
      }
      
      // Call onCancel if provided
      if (currentData?.onCancel) {
        currentData.onCancel();
      }
      
      set({
        isOpen: false,
        dialogId: null,
        data: null,
        loading: false,
      });
    },

    updateDialog: (data: Partial<DialogData>) => {
      set((state) => ({
        data: state.data ? { ...state.data, ...data } : null,
      }));
    },

    setLoading: (loading: boolean) => {
      set({ loading });
    },

    // Confirmation dialog
    confirm: (data: DialogData): Promise<boolean> => {
      return new Promise((resolve) => {
        confirmResolve = resolve;
        
        set({
          isOpen: true,
          dialogId: 'confirm',
          data: {
            variant: 'default',
            confirmText: 'Confirm',
            cancelText: 'Cancel',
            showCloseButton: true,
            closeOnOverlayClick: false,
            closeOnEscape: true,
            ...data,
            onConfirm: async () => {
              try {
                if (data.onConfirm) {
                  set({ loading: true });
                  await data.onConfirm();
                }
                confirmResolve?.(true);
                confirmResolve = null;
                get().closeDialog();
              } catch (error) {
                set({ loading: false });
                throw error;
              }
            },
            onCancel: () => {
              if (data.onCancel) {
                data.onCancel();
              }
              confirmResolve?.(false);
              confirmResolve = null;
              get().closeDialog();
            },
          },
          loading: false,
        });
      });
    },

    // Alert dialog
    alert: (data: Pick<DialogData, 'title' | 'description' | 'variant'>): Promise<void> => {
      return new Promise((resolve) => {
        alertResolve = resolve;
        
        set({
          isOpen: true,
          dialogId: 'alert',
          data: {
            variant: 'default',
            confirmText: 'OK',
            showCloseButton: true,
            closeOnOverlayClick: true,
            closeOnEscape: true,
            ...data,
            onConfirm: () => {
              alertResolve?.();
              alertResolve = null;
              get().closeDialog();
            },
          },
          loading: false,
        });
      });
    },
  }))
);

// Selector hooks for performance optimization
export const useDialogOpen = () => useDialogStore((state) => state.isOpen);
export const useDialogData = () => useDialogStore((state) => state.data);
export const useDialogLoading = () => useDialogStore((state) => state.loading);
export const useDialogId = () => useDialogStore((state) => state.dialogId);

// Action hooks
export const useDialogActions = () => useDialogStore((state) => ({
  openDialog: state.openDialog,
  closeDialog: state.closeDialog,
  updateDialog: state.updateDialog,
  setLoading: state.setLoading,
  confirm: state.confirm,
  alert: state.alert,
})); 