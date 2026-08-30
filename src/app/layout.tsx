import type { Metadata, Viewport } from "next";
import { Geist_Mono, Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "La'Frutella — Artisan Dessert Bar | Ice Creams, Cakes, Shakes & More",
  description:
    "La'Frutella is a premium artisan dessert bar handcrafting small-batch gelatos, molten cakes, royal thick shakes, waffles and French bakes — made fresh daily with real fruits and Belgian couverture since 2015.",
  keywords: [
    "La'Frutella",
    "dessert shop",
    "artisan gelato",
    "ice cream",
    "cakes",
    "thick shakes",
    "waffles",
    "bakery",
    "dessert bar India",
  ],
  authors: [{ name: "La'Frutella" }],
  icons: {
    icon: "/images/lafrutella-logo.png",
  },
  openGraph: {
    title: "La'Frutella — Artisan Dessert Bar",
    description:
      "Desserts so good, they feel like magic. Handcrafted gelatos, cakes, shakes & bakes — fresh every day.",
    siteName: "La'Frutella",
    type: "website",
    images: ["/images/hero-sundae.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#6e1d2b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${outfit.variable} ${geistMono.variable} antialiased bg-background text-foreground font-body`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
