# Zustand Dialog Provider

A global dialog state management solution using Zustand for React applications. This provider enables you to show dialogs, alerts, and confirmations from anywhere in your application without prop drilling.

## Features

- 🎯 **Global State Management**: Manage dialog state globally using Zustand
- 🔄 **Async Operations**: Built-in support for async operations with loading states
- 🎨 **Multiple Variants**: Support for different dialog types (default, destructive, warning, success)
- 📱 **Responsive**: Different dialog sizes (sm, md, lg, xl, full)
- ⌨️ **Keyboard Support**: ESC key support and customizable keyboard behavior
- 🎭 **TypeScript**: Full TypeScript support with proper types
- 🎪 **Flexible Content**: Support for custom React content in dialogs

## Setup

The `DialogProvider` is already integrated in the root layout (`app/[locale]/layout.tsx`), so you can use the dialog hooks throughout your application.

## Basic Usage

### Import the hook

```tsx
import { useDialog } from "@/hooks/use-dialog";
```

### Basic Alert

```tsx
const dialog = useDialog();

const handleAlert = () => {
  dialog.alert({
    title: "Information",
    description: "This is a basic alert dialog.",
  });
};
```

### Confirmation Dialog

```tsx
const handleConfirm = async () => {
  const confirmed = await dialog.confirm({
    title: "Are you sure?",
    description: "This action cannot be undone.",
    confirmText: "Yes, continue",
    cancelText: "Cancel"
  });

  if (confirmed) {
    // User confirmed
    console.log("User confirmed the action");
  }
};
```

### Async Operations

```tsx
const handleAsyncAction = async () => {
  const confirmed = await dialog.confirm({
    title: "Save Changes",
    description: "Do you want to save your changes?",
    confirmText: "Save",
    onConfirm: async () => {
      // This will show a loading spinner
      await saveChangesToServer();
    }
  });

  if (confirmed) {
    dialog.showSuccess({
      title: "Saved!",
      description: "Your changes have been saved successfully."
    });
  }
};
```

### Custom Content

```tsx
const handleCustomDialog = () => {
  dialog.openDialog("custom", {
    title: "Custom Form",
    content: (
      <div className="space-y-4">
        <input type="email" placeholder="Enter email" className="w-full p-2 border rounded" />
        <textarea placeholder="Enter message" className="w-full p-2 border rounded" />
      </div>
    ),
    confirmText: "Submit",
    cancelText: "Cancel",
    size: "lg"
  });
};
```

## Convenience Methods

The `useDialog` hook provides several convenience methods:

```tsx
const dialog = useDialog();

// Pre-configured alert variants
dialog.showSuccess({ title: "Success!", description: "Operation completed." });
dialog.showError({ title: "Error", description: "Something went wrong." });
dialog.showWarning({ title: "Warning", description: "Be careful!" });
dialog.showInfo({ title: "Info", description: "Just so you know..." });

// Pre-configured confirmation variants
dialog.confirmAction({ title: "Confirm Action", description: "Continue?" });
dialog.confirmDelete({ title: "Delete Item", description: "This cannot be undone." });
```

## API Reference

### DialogData Interface

```tsx
interface DialogData {
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
```

### useDialog Hook Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `alert(data)` | Shows an alert dialog | `Promise<void>` |
| `confirm(data)` | Shows a confirmation dialog | `Promise<boolean>` |
| `openDialog(id, data)` | Opens a custom dialog | `void` |
| `closeDialog()` | Closes the current dialog | `void` |
| `updateDialog(data)` | Updates current dialog data | `void` |
| `setLoading(loading)` | Sets loading state | `void` |

### Convenience Methods

| Method | Description |
|--------|-------------|
| `showSuccess(data)` | Shows a success alert |
| `showError(data)` | Shows an error alert |
| `showWarning(data)` | Shows a warning alert |
| `showInfo(data)` | Shows an info alert |
| `confirmAction(data)` | Shows a default confirmation |
| `confirmDelete(data)` | Shows a destructive confirmation |

### State Selectors

| Selector | Description | Returns |
|----------|-------------|---------|
| `isOpen` | Whether dialog is open | `boolean` |
| `loading` | Whether dialog is in loading state | `boolean` |
| `data` | Current dialog data | `DialogData \| null` |

## Advanced Usage

### Using Store Selectors Directly

For performance optimization, you can use the store selectors directly:

```tsx
import { useDialogOpen, useDialogData, useDialogActions } from "@/hooks/use-dialog";

const MyComponent = () => {
  const isOpen = useDialogOpen(); // Only re-renders when isOpen changes
  const data = useDialogData();   // Only re-renders when data changes
  const { closeDialog } = useDialogActions(); // Stable reference
  
  // Component implementation
};
```

### Error Handling

```tsx
const handleRiskyAction = async () => {
  try {
    const confirmed = await dialog.confirm({
      title: "Risky Action",
      description: "This might fail. Continue?",
      onConfirm: async () => {
        const result = await riskyApiCall();
        if (!result.success) {
          throw new Error(result.message);
        }
      }
    });
    
    if (confirmed) {
      dialog.showSuccess({ title: "Success!", description: "Action completed." });
    }
  } catch (error) {
    dialog.showError({ 
      title: "Action Failed", 
      description: error.message || "An unexpected error occurred." 
    });
  }
};
```

## Examples

Check out the complete examples in `components/examples/dialog-examples.tsx` for comprehensive usage patterns and implementations. 