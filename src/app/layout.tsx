import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display, Montserrat, Roboto, Lora, Oswald, Raleway, Poppins, Fira_Code, Merriweather } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'], variable: '--font-roboto' });
const lora = Lora({ subsets: ['latin'], variable: '--font-lora' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald' });
const raleway = Raleway({ subsets: ['latin'], variable: '--font-raleway' });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-merriweather' });

export const metadata: Metadata = {
  title: 'Motivation Wallpaper Generator',
  description: 'Create beautiful wallpapers with inspiring quotes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${montserrat.variable} ${roboto.variable} ${lora.variable} ${oswald.variable} ${raleway.variable} ${poppins.variable} ${firaCode.variable} ${merriweather.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}