"use client";

import { Button } from "./ui/button";
import { Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";

const DOWNLOAD_LINKS = {
  windows: "https://github.com/lutfifadlan/inspireme/releases/latest/download/InspireMe.exe",
  mac: "https://github.com/lutfifadlan/inspireme/releases/latest/download/InspireMe.dmg",
  linux: "https://github.com/lutfifadlan/inspireme/releases/latest/download/InspireMe.AppImage"
};

export function DownloadAppButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground transition-colors">
          <Download className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            href={DOWNLOAD_LINKS.windows}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download for Windows
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            href={DOWNLOAD_LINKS.mac}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download for Mac
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link
            href={DOWNLOAD_LINKS.linux}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download for Linux
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 