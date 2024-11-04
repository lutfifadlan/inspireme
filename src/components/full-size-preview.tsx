import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { WallpaperPreviewContent } from './wallpaper-preview';
import type { WallpaperPreviewProps } from './wallpaper-preview';

interface FullSizePreviewProps extends WallpaperPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullSizePreview({
  isOpen,
  onClose,
  ...previewProps
}: FullSizePreviewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-none w-auto p-0">
        <WallpaperPreviewContent {...previewProps} forceActualSize isFullSize />
      </DialogContent>
    </Dialog>
  );
} 