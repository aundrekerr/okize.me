import type { Metadata } from "next";
import StyledJsxRegistry from './registry'
import { Inter, Roboto_Mono } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
import Navigation from "@/app/components/navigation"

const inter = Inter({ subsets: ["latin"], variable: '--font-text' });
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

const luzaine = localFont({
  src: [
    {
      path: './fonts/Luzaine/Luzaine-Light.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/Luzaine/Luzaine-Reg.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Luzaine/Luzaine-Heavy.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Luzaine/Luzaine-Heavy.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: "--font-display",
})

const luzaineItalic = localFont({
  src: [
    {
      path: './fonts/Luzaine/Luzaine-LightItalic.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/Luzaine/Luzaine-RegItalic.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Luzaine/Luzaine-HeavyItalic.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Luzaine/Luzaine-HeavyItalic.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: "--font-display-italic",
})

const luzaineBold = localFont({
  src: [
    {
      path: './fonts/Luzaine/Luzaine-LightBold.ttf',
      weight: '100',
      style: 'bold',
    },
    {
      path: './fonts/Luzaine/Luzaine-RegBold.ttf',
      weight: '400',
      style: 'bold',
    },
    {
      path: './fonts/Luzaine/Luzaine-HeavyBold.ttf',
      weight: '700',
      style: 'bold',
    },
    {
      path: './fonts/Luzaine/Luzaine-HeavyBold.ttf',
      weight: '900',
      style: 'bold',
    },
  ],
  variable: "--font-display-bold",
})

export const metadata: Metadata = {
  title: "okizeme",
  description: "A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${luzaine.variable} ${luzaineItalic.variable} ${luzaineBold.variable} ${roboto_mono.variable}`}>
        <Navigation />
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
      </body>
    </html>
  );
}
