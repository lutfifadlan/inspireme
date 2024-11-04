"use client";

import { Button } from "./ui/button";
import { Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const DOWNLOAD_LINKS = {
  windows: "https://github.com/lutfifadlan/inspireme/releases/latest/download/InspireMe.exe",
  mac: "https://github.com/lutfifadlan/inspireme/releases/latest/download/InspireMe.dmg",
  linux: "https://github.com/lutfifadlan/inspireme/releases/latest/download/InspireMe.AppImage"
};

export function DownloadAppButton() {
  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground transition-colors">
          <Download className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => handleDownload(DOWNLOAD_LINKS.windows)} className="cursor-pointer">
          Download for Windows
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleDownload(DOWNLOAD_LINKS.mac)} className="cursor-pointer">
          Download for Mac
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleDownload(DOWNLOAD_LINKS.linux)} className="cursor-pointer">
          Download for Linux
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 