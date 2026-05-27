import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Hotmart Pro - Mentoría de Infoproductos en Hotmart | $190 USD Promo",
  description:
    "Aprende a crear y vender infoproductos en Hotmart con nuestra mentoría premium. De cero a tu primer infoproducto en 14 días. Incluye 11 beneficios, soporte VIP y garantía de 30 días.",
  keywords: [
    "Hotmart",
    "infoproductos",
    "mentoría Hotmart",
    "curso Hotmart",
    "vender infoproductos",
    "crear infoproducto",
    "ingresos pasivos",
    "marketing digital",
    "Hotmart Pro",
  ],
  authors: [{ name: "Hotmart Pro" }],
  icons: {
    icon: "/hotmart-logo.png",
  },
  openGraph: {
    title: "Hotmart Pro - Mentoría de Infoproductos | $190 USD Promo",
    description:
      "Transforma tu conocimiento en ingresos automáticos. Mentoría premium de creación y venta masiva de infoproductos en Hotmart. +1,800 alumnos activos.",
    url: "https://hotmart.pages.dev",
    siteName: "Hotmart Pro",
    type: "website",
    locale: "es_LA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotmart Pro - Mentoría de Infoproductos | $190 USD Promo",
    description:
      "Transforma tu conocimiento en ingresos automáticos. Mentoría premium de creación y venta masiva de infoproductos en Hotmart.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
