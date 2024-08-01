import type { Metadata } from "next";
import StyledJsxRegistry from './registry'
import { Inter, Cousine } from "next/font/google";
import localFont from 'next/font/local';

import Navigation from "@/app/components/navigation"
import Footer from "@/app/components/footer"
import "./globals.css";
import "./page.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-text' });
const cousine = Cousine({
  weight: ["400", "700"],
  subsets: ['latin'],
  variable: '--font-monospace',
})

const luzaine = localFont({
  src: [
    {
      path: '/fonts/Luzaine/Luzaine-Light.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '/fonts/Luzaine/Luzaine-Reg.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '/fonts/Luzaine/Luzaine-Heavy.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '/fonts/Luzaine/Luzaine-Heavy.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: "--font-display",
  preload: true,
})

const luzaineItalic = localFont({
  src: [
    {
      path: '/fonts/Luzaine/Luzaine-LightItalic.ttf',
      weight: '100',
    },
    {
      path: '/fonts/Luzaine/Luzaine-RegItalic.ttf',
      weight: '400',
    },
    {
      path: '/fonts/Luzaine/Luzaine-HeavyItalic.ttf',
      weight: '700',
    },
    {
      path: '/fonts/Luzaine/Luzaine-HeavyItalic.ttf',
      weight: '900',
    },
  ],
  variable: "--font-display-italic",
  preload: true,
})

const luzaineBold = localFont({
  src: [
    {
      path: '/fonts/Luzaine/Luzaine-LightBold.ttf',
      weight: '100',
    },
    {
      path: '/fonts/Luzaine/Luzaine-RegBold.ttf',
      weight: '400',
    },
    {
      path: '/fonts/Luzaine/Luzaine-HeavyBold.ttf',
      weight: '700',
    },
    {
      path: '/fonts/Luzaine/Luzaine-HeavyBold.ttf',
      weight: '900',
    },
  ],
  variable: "--font-display-bold",
  preload: true,
})

export const metadata: Metadata = {
  title: "okizeme",
  description: "Just some data.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${luzaine.variable} ${luzaineItalic.variable} ${luzaineBold.variable} ${cousine.variable}`}>
        <Navigation />
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
        <Footer />
      </body>
    </html>
  );
}
