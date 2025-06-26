"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDialog } from "@/hooks/use-dialog";
import { Trash2, Save, AlertTriangle, CheckCircle, Info, Settings } from "lucide-react";
import { useState } from "react";

export function DialogExamples() {
  const dialog = useDialog();
  const [customTitle, setCustomTitle] = useState("Custom Dialog");
  const [customDescription, setCustomDescription] = useState("This is a custom dialog description");

  // Basic alert dialog
  const handleBasicAlert = () => {
    dialog.alert({
      title: "Information",
      description: "This is a basic alert dialog with information.",
    });
  };

  // Success alert
  const handleSuccessAlert = () => {
    dialog.showSuccess({
      title: "Success!",
      description: "Your action has been completed successfully.",
    });
  };

  // Error alert
  const handleErrorAlert = () => {
    dialog.showError({
      title: "Error occurred",
      description: "Something went wrong. Please try again later.",
    });
  };

  // Warning alert
  const handleWarningAlert = () => {
    dialog.showWarning({
      title: "Warning",
      description: "This action may have unintended consequences.",
    });
  };

  // Basic confirmation
  const handleBasicConfirm = async () => {
    const confirmed = await dialog.confirmAction({
      title: "Are you sure?",
      description: "This action cannot be undone.",
    });

    if (confirmed) {
      dialog.showSuccess({
        title: "Confirmed!",
        description: "Action has been executed.",
      });
    }
  };

  // Delete confirmation
  const handleDeleteConfirm = async () => {
    const confirmed = await dialog.confirmDelete({
      title: "Delete Item",
      description: "Are you sure you want to delete this item? This action cannot be undone.",
    });

    if (confirmed) {
      dialog.showSuccess({
        title: "Deleted",
        description: "Item has been successfully deleted.",
      });
    }
  };

  // Async confirmation with loading
  const handleAsyncConfirm = async () => {
    const confirmed = await dialog.confirm({
      title: "Save Changes",
      description: "Do you want to save your changes?",
      confirmText: "Save",
      cancelText: "Discard",
      onConfirm: async () => {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    });

    if (confirmed) {
      dialog.showSuccess({
        title: "Saved!",
        description: "Your changes have been saved successfully.",
      });
    }
  };

  // Custom content dialog
  const handleCustomContent = () => {
    dialog.openDialog("custom", {
      title: "Custom Content Dialog",
      content: (
        <div className="space-y-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter your message"
            />
          </div>
        </div>
      ),
      confirmText: "Send",
      cancelText: "Cancel",
      size: "lg"
    });
  };

  // Programmatic dialog with custom data
  const handleProgrammaticDialog = () => {
    dialog.openDialog("custom-programmatic", {
      title: customTitle,
      description: customDescription,
      confirmText: "OK",
      variant: "default",
      size: "md"
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Zustand Dialog Provider Examples
          </CardTitle>
          <CardDescription>
            Demonstrates various dialog types and configurations using the global Zustand dialog provider.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Alert Dialogs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Alert Dialogs</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Button onClick={handleBasicAlert} variant="outline" className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                Info Alert
              </Button>
              <Button onClick={handleSuccessAlert} variant="outline" className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                Success
              </Button>
              <Button onClick={handleErrorAlert} variant="outline" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Error
              </Button>
              <Button onClick={handleWarningAlert} variant="outline" className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
                Warning
              </Button>
            </div>
          </div>

          {/* Confirmation Dialogs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Confirmation Dialogs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button onClick={handleBasicConfirm} variant="outline">
                Basic Confirm
              </Button>
              <Button onClick={handleDeleteConfirm} variant="destructive" className="flex items-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Confirm
              </Button>
              <Button onClick={handleAsyncConfirm} variant="outline" className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                Async Confirm
              </Button>
            </div>
          </div>

          {/* Custom Dialogs */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Custom Dialogs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button onClick={handleCustomContent} variant="outline">
                Custom Content
              </Button>
              <Button onClick={handleProgrammaticDialog} variant="outline">
                Programmatic Dialog
              </Button>
            </div>
          </div>

          {/* Programmatic Dialog Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dialog Configuration</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dialog-title">Dialog Title</Label>
                <Input
                  id="dialog-title"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Enter dialog title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dialog-description">Dialog Description</Label>
                <Input
                  id="dialog-description"
                  value={customDescription}
                  onChange={(e) => setCustomDescription(e.target.value)}
                  placeholder="Enter dialog description"
                />
              </div>
            </div>
          </div>

          {/* Current Dialog State */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">Current Dialog State:</h4>
            <div className="text-xs font-mono bg-muted p-3 rounded-md">
              <div>Open: {dialog.isOpen ? 'true' : 'false'}</div>
              <div>Loading: {dialog.loading ? 'true' : 'false'}</div>
              <div>Title: {dialog.data?.title || 'null'}</div>
              <div>Variant: {dialog.data?.variant || 'null'}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 