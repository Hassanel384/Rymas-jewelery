"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { storeConfig } from "@/data/storeConfig";
import { Home, Grid, ShoppingBag, MessageCircle } from "lucide-react";

export default function MobileBottomNav({ onOpenCatalogue }) {
  const pathname = usePathname();
  const { totalItemsCount, setIsCartOpen } = useCart();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-bottomNav px-2 py-1.5 transition-all">
      <div className="grid grid-cols-4 items-center justify-around text-center max-w-md mx-auto">
        {/* 1. ACCUEIL */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            pathname === "/" ? "text-brand-primary font-bold" : "text-stone-600 hover:text-stone-900"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-0.5 tracking-tight">Accueil</span>
        </Link>

        {/* 2. CATALOGUE */}
        {pathname === "/" ? (
          <button
            onClick={() => {
              if (onOpenCatalogue) onOpenCatalogue();
              const el = document.getElementById("catalogue");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex flex-col items-center justify-center py-1 text-stone-600 hover:text-brand-primary transition-colors"
          >
            <Grid className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Catalogue</span>
          </button>
        ) : (
          <Link
            href="/catalogue"
            className={`flex flex-col items-center justify-center py-1 transition-colors ${
              pathname === "/catalogue"
                ? "text-brand-primary font-bold"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <Grid className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 tracking-tight">Catalogue</span>
          </Link>
        )}

        {/* 3. PANIER (avec badge dynamique) */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center py-1 relative text-stone-600 hover:text-brand-primary transition-colors"
          aria-label="Mon panier"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brand-primary text-white text-[9px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center shadow">
                {totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-medium">Panier</span>
        </button>

        {/* 4. WHATSAPP EN 1 CLIC */}
        <a
          href={`https://wa.me/${storeConfig.whatsappNumber}?text=Bonjour%20Rymas%20Jewelry%2C%20je%20souhaite%20un%20conseil%20cadeau%20en%20or%2018k`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-emerald-100" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-bold text-emerald-700">WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
