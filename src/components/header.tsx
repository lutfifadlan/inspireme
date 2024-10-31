"use client";
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Github } from 'lucide-react';
import { Logo } from './logo';
import GridPattern from './ui/grid-pattern';

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
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => window.open('https://github.com/lutfifadlan/inspireme', '_blank')}
                  aria-label="View on GitHub"
                >
                  <Github className="h-5 w-5" />
                </Button>
                <div className="mx-2 w-px h-5 bg-border/40" />
                <ThemeToggle />
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