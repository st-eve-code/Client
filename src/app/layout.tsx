import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const plusJakartaSans = localFont({
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/plus-jakarta-sans.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/plus-jakarta-sans.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/plus-jakarta-sans.woff2",
      weight: "800",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: {
    default: "Vapestore — Online Vape Shop",
    template: "%s | Vapestore",
  },
  description:
    "Shop trusted vapes and e-liquids at our leading vape shop online. Discover top brands, expert support, and fast UK delivery.",
  icons: {
    icon: [
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
      { url: '/favicon-large.png', sizes: '512x512', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon-180.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: [{ url: '/icon.png' }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--color-bg-canvas)] text-[var(--color-text-primary)] font-[var(--font-plus-jakarta-sans)]">
        {children}
      </body>
    </html>
  );
}