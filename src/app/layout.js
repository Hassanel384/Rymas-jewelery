import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import ProductModal from "@/components/ProductModal";
import CartDrawer from "@/components/CartDrawer";
import MobileBottomNav from "@/components/MobileBottomNav";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export const metadata = {
  title: "Rymas Jewelry — Bijoux Bébés et Enfants Or 18K & Coffrets Cadeaux au Maroc",
  description:
    "Rymas Jewelry : Boutique de bijoux en or 18 carats poinçonnés pour bébés et enfants (0-10 ans) : gourmettes gravées, boucles d'oreilles à vis, médailles de baptême et coffrets cadeaux avec roses éternelles et chocolats. Livraison express partout au Maroc.",
  keywords: [
    "Rymas Jewelry",
    "bijoux bebe or 18k",
    "gourmette bebe or 18 carats",
    "boucles oreilles securisees",
    "cadeau naissance or casablanca",
    "pack cadeau naissance maroc",
    "sbou3 bapteme cadeau",
    "or 18 carats enfant",
  ],
  openGraph: {
    title: "Rymas Jewelry — L'Or 18 Carats pour Petits Trésors (0-10 ans)",
    description: "Bijoux en or 18K certifiés & coffrets cadeaux royaux avec roses éternelles et chocolats belges. Livraison sécurisée et paiement à la livraison au Maroc.",
    url: "https://rymas-jewelry.ma",
    siteName: "Rymas Jewelry",
    locale: "fr_FR",
    images: [
      {
        url: "/images/logo.jpg",
        width: 500,
        height: 500,
        alt: "Rymas Jewelry — Logo Officiel",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body className="bg-[#fcfbfa] text-stone-800 antialiased selection:bg-brand-primary selection:text-white">
        <CartProvider>
          {children}
          {/* Modale d'aperçu rapide & personnalisation */}
          <ProductModal />
          {/* Tiroir de panier coulissant */}
          <CartDrawer />
          {/* Navigation tactile inférieure mobile (sticky) */}
          <MobileBottomNav />
          {/* Bouton d'assistance WhatsApp flottant */}
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
