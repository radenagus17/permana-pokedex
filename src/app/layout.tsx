import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Permana Pokedex",
  description: "Browse your pokemons here and take your pokemon",
  authors: [{ name: "radenagus17_", url: "https://radenagus17.vercel.app" }],
  icons: {
    icon: "/logo/pokeicon.png",
  },
  openGraph: {
    title: "Permana Pokedex",
    url: "https://permana-pokedex.vercel.app",
    type: "website",
    description: "Browse your pokemons here and take your pokemon",
    siteName: "Permana Pokedex",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
