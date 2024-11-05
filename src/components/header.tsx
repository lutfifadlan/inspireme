"use client";
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Github } from 'lucide-react';
import { Logo } from './logo';
import GridPattern from './ui/grid-pattern';
import { DownloadAppButton } from './download-app-button';

export function Header() {
  return (
    <div className="w-full px-4 pt-6 pb-4 overflow-visible relative">
      <GridPattern strokeDasharray="4 2" />

      <header className="fixed top-0 left-0 right-0 z-50 mt-4 max-w-5xl mx-auto rounded-2xl border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="relative w-full">
          <div className="relative max-w-5xl px-6">
            <div className="flex h-16 items-center justify-between">
              {/* Logo & Brand */}
              <Link 
                href="/" 
                className="flex items-center space-x-2 hover:opacity-90 transition-opacity"
              >
                <Logo />
              </Link>

              {/* Actions */}
              <div className="flex items-center">
                <Link
                  href="https://github.com/lutfifadlan/inspireme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-md text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="View on GitHub"
                >
                  <Github className="h-4 w-4" />
                </Link>
                <div className="mx-2 w-px h-5 bg-border/40" />
                <ThemeToggle />
                <div className="mx-2 w-px h-5 bg-border/40" />
                <DownloadAppButton />
              </div>
            </div>
          </div>

          {/* Subtle bottom highlight */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>
      </header>
    </div>
  );
}

export default Header;