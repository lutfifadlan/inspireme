'use client';

import { Logo } from '@/components/logo';
import Link from 'next/link';
import { MessageSquarePlus, ExternalLink } from 'lucide-react';
import GridPattern from './ui/grid-pattern';

export const Footer = () => {
  const products = [
    {
      name: "LastWorkingDay",
      url: "https://lastworkingday.co",
    },
    {
      name: "Let's Focus",
      url: "https://letsfocus.today",
    }
  ];

  return (
    <>
      <div className="w-full px-4 pb-6 pt-4 overflow-visible relative mt-auto">
        <GridPattern strokeDasharray="4 2" />
        <footer className="relative max-w-7xl mx-auto rounded-2xl border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <Logo />
              <p className="text-sm text-muted-foreground">
                Motivational wallpapers generator.
              </p>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} InspireMe. All rights reserved.
              </p>
            </div>

            {/* Products Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold underline">Our Other Products</h3>
              <ul className="space-y-3">
                {products.map((product) => (
                  <li key={product.name}>
                    <Link
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 hover:text-primary transition-colors"
                    >
                      <span className="text-sm font-medium">
                        {product.name}
                      </span>
                      <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Elements - Now in a fixed container */}
      <div className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none">
          {/* Feedback button */}
          <div className="absolute bottom-0 left-0 pointer-events-auto">
            <Link
              href="https://insigh.to/b/inspireme"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 pb-6 sm:pb-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-tr-lg hover:opacity-80 transition-opacity"
            >
              <MessageSquarePlus size={18} />
            </Link>
          </div>

          {/* Made by link */}
          <div className="absolute bottom-0 right-0 pointer-events-auto">
            <Link
              href="https://lutfifadlan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 pb-6 sm:pb-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-black rounded-tl-lg hover:opacity-80 transition-opacity"
            >
              <span className="block sm:hidden">Lf</span>
              <span className="hidden sm:block">Made by Lutfifadlan</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;