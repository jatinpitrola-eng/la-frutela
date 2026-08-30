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
  metadataBase: new URL("https://la-frutela.vercel.app"),
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

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "La'Frutella",
  description:
    "Artisan dessert bar handcrafting small-batch gelatos, molten cakes, royal thick shakes, waffles and French bakes — made fresh daily with real fruits and Belgian couverture since 2015.",
  slogan: "Desserts so good, they feel like magic.",
  servesCuisine: ["Desserts", "Ice Cream", "Bakery"],
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "21, Rose Arcade, MG Road",
    addressLocality: "Jaipur",
    postalCode: "302001",
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  telephone: "+91 98765 43210",
  email: "hello@lafrutella.in",
  openingHours: ["Mo-Th 11:00-23:00", "Fr-Su 11:00-23:30"],
  image: "/images/hero-sundae.png",
  logo: "/images/lafrutella-logo.png",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "6200",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
