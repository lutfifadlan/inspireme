"use client";

import Image from "next/image";

interface WallpaperPreviewProps {
  backgroundUrl: string;
  text: string;
  fontSize: number;
  selectedFont: string;
}

export function WallpaperPreview({
  backgroundUrl,
  text,
  fontSize,
  selectedFont,
}: WallpaperPreviewProps) {
  return (
    <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-border/20 backdrop-blur-sm">
      <Image
        src={backgroundUrl}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <p
          className={`text-center text-white ${selectedFont} drop-shadow-lg`}
          style={{ fontSize: `${fontSize}px` }}
        >
          {text}
        </p>
      </div>
    </div>
  );
}