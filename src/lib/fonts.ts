// lib/fonts.ts
import { Inter, Playfair_Display, Montserrat, Roboto, Lora, Oswald, Raleway, Poppins, Fira_Code, Merriweather } from 'next/font/google';

export const inter = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const roboto = Roboto({
  weight: ['100',  '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const lora = Lora({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

export const oswald = Oswald({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-oswald',
  display: 'swap',
});

export const raleway = Raleway({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

export const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
});

export const firaCode = Fira_Code({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

export const merriweather = Merriweather({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
});

// Font mapping for canvas
export const CANVAS_FONT_MAPPING = {
  'font-inter': 'Inter',
  'font-playfair': 'Playfair Display',
  'font-montserrat': 'Montserrat',
  'font-roboto': 'Roboto',
  'font-lora': 'Lora',
  'font-oswald': 'Oswald',
  'font-raleway': 'Raleway',
  'font-poppins': 'Poppins',
  'font-fira-code': 'Fira Code',
  'font-merriweather': 'Merriweather'
};

// Combine all font variables for the root layout
export const fontVariables = [
  inter.variable,
  playfair.variable,
  montserrat.variable,
  roboto.variable,
  lora.variable,
  oswald.variable,
  raleway.variable,
  poppins.variable,
  firaCode.variable,
  merriweather.variable,
].join(' ');