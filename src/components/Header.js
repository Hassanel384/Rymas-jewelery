"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { storeConfig } from "@/data/storeConfig";
import { useCart } from "@/context/CartContext";
import { Phone, Mail, ShoppingBag, Search, Menu, X, ShieldCheck, Sparkles, Gift } from "lucide-react";

export default function Header({ searchQuery, setSearchQuery, onSelectCategory, selectedCategory }) {
  const pathname = usePathname();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpenMobile, setIsSearchOpenMobile] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-stone-100 transition-all">
      {/* 1. TOP BAR DESKTOP (Garantie Or & Réassurance) */}
      <div className="hidden md:block bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Or 18 Carats Garanti (Titre 750‰) • Poinçon Officiel</span>
            </span>
            <span className="text-stone-500">•</span>
            <span className="text-stone-300">Gravure Prénom &amp; Écrin Cadeau Offerts</span>
          </div>

          <div className="flex items-center space-x-5">
            <a
              href={`tel:${storeConfig.phone}`}
              className="flex items-center space-x-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{storeConfig.phone}</span>
            </a>
            <span className="text-stone-500">•</span>
            <span className="text-stone-300 font-medium">Livraison Sécurisée &amp; Paiement Cash</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER (Logo Talya Kids, Search, Actions) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Menu Burger Mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 rounded-lg text-stone-700 hover:text-amber-700 focus:outline-none"
              aria-label="Ouvrir le menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Bouton recherche mobile */}
            <button
              onClick={() => setIsSearchOpenMobile(!isSearchOpenMobile)}
              className="p-2 text-stone-700 hover:text-amber-700 ml-1"
              aria-label="Rechercher"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* LOGO TALYA KIDS AVEC SLOGAN OR 18K */}
          <div className="flex-1 md:flex-initial text-center md:text-left">
            <Link href="/" className="inline-block group">
              <div className="flex flex-col items-center md:items-start">
                <span className="text-2xl md:text-3xl font-serif font-black tracking-tight text-stone-900 group-hover:text-amber-700 transition-colors">
                  RYMAS <span className="text-amber-600 font-light">JEWELRY</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold -mt-1 hidden sm:inline-block">
                  Or 18K • Bébés &amp; Enfants (0-10 ans)
                </span>
              </div>
            </Link>
          </div>

          {/* BARRE DE RECHERCHE DESKTOP */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery || ""}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                placeholder="Rechercher : gourmette, boucles fermoir vis, médaille, coffret naissance..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-stone-200 bg-stone-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-xs sm:text-sm transition-all"
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-2.5 text-xs text-stone-400 hover:text-stone-700"
                >
                  Effacer
                </button>
              )}
            </div>
          </div>

          {/* ACTIONS DROITE (Panier + WhatsApp Express) */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Bouton Commande WhatsApp Desktop */}
            <a
              href={`https://wa.me/${storeConfig.whatsappNumber}?text=Bonjour%20Rymas%20Jewelry%2C%20je%20souhaite%20des%20conseils%20pour%20un%20cadeau%20en%20or%2018k`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center space-x-2 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 px-3.5 py-2 rounded-full text-xs font-semibold border border-emerald-200 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Conseil WhatsApp</span>
            </a>

            {/* Bouton Panier */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 md:px-4 md:py-2.5 rounded-full bg-stone-100 hover:bg-amber-100/60 text-stone-800 hover:text-amber-800 transition-all flex items-center space-x-2"
              aria-label="Voir mon panier"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-stone-800" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-sm animate-bounce">
                    {totalItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline-block text-xs font-semibold">
                Panier
              </span>
            </button>
          </div>
        </div>

        {/* BARRE DE RECHERCHE DÉROULANTE MOBILE */}
        {isSearchOpenMobile && (
          <div className="md:hidden pb-3 animate-fade-in">
            <div className="relative">
              <input
                type="text"
                value={searchQuery || ""}
                onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
                placeholder="Rechercher : gourmette, boucles, médaille..."
                className="w-full pl-10 pr-10 py-2.5 rounded-full border border-stone-200 bg-stone-50 focus:bg-white text-sm focus:outline-none focus:border-amber-600"
                autoFocus
              />
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-2.5 text-xs text-stone-500"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 3. MENU DE NAVIGATION DESKTOP */}
      <nav className="hidden md:block bg-stone-50 border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between text-xs font-semibold tracking-wide uppercase text-stone-700">
          <div className="flex space-x-6 py-3">
            <Link
              href="/"
              className={`hover:text-amber-700 transition-colors ${
                pathname === "/" ? "text-amber-700 font-bold" : ""
              }`}
            >
              Accueil
            </Link>
            <Link
              href="/categories/packs-cadeaux"
              className={`hover:text-amber-700 transition-colors flex items-center space-x-1 ${
                pathname === "/categories/packs-cadeaux" ? "text-amber-700 font-bold" : ""
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-amber-600" />
              <span>Packs Cadeaux (Fleurs &amp; Chocolat)</span>
            </Link>
            <Link
              href="/categories/gourmettes"
              className={`hover:text-amber-700 transition-colors ${
                pathname === "/categories/gourmettes" ? "text-amber-700 font-bold" : ""
              }`}
            >
              Gourmettes Gravées
            </Link>
            <Link
              href="/categories/boucles-oreilles"
              className={`hover:text-amber-700 transition-colors ${
                pathname === "/categories/boucles-oreilles" ? "text-amber-700 font-bold" : ""
              }`}
            >
              Boucles Fermoir à Vis
            </Link>
            <Link
              href="/categories/pendentifs-medailles"
              className={`hover:text-amber-700 transition-colors ${
                pathname === "/categories/pendentifs-medailles" ? "text-amber-700 font-bold" : ""
              }`}
            >
              Pendentifs &amp; Médailles
            </Link>
            <Link
              href="/categories/bracelets-cordons"
              className={`hover:text-amber-700 transition-colors ${
                pathname === "/categories/bracelets-cordons" ? "text-amber-700 font-bold" : ""
              }`}
            >
              Bracelets Cordons (0-10 ans)
            </Link>
            <Link
              href="/categories/epingles-bebe"
              className={`hover:text-amber-700 transition-colors ${
                pathname === "/categories/epingles-bebe" ? "text-amber-700 font-bold" : ""
              }`}
            >
              Épingles Berceau
            </Link>
          </div>

          <Link
            href="/panier"
            className="text-amber-700 hover:text-amber-800 font-bold flex items-center space-x-1"
          >
            <span>Mon Panier</span>
            <span>&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* 4. MENU LATÉRAL MOBILE */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-stone-50">
                <div>
                  <span className="font-serif font-black text-2xl text-stone-900">
                    RYMAS <span className="text-amber-600">JEWELRY</span>
                  </span>
                  <p className="text-[10px] text-amber-700 font-bold">
                    Or 18K • Bébés &amp; Enfants (0-10 ans)
                  </p>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 pb-2">
                  Collections &amp; Coffrets
                </p>
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-800 hover:bg-amber-50 hover:text-amber-700"
                >
                  ✨ Accueil
                </Link>
                <Link
                  href="/categories/packs-cadeaux"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-800 hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between"
                >
                  <span>🎁 Packs Cadeaux (Fleurs &amp; Chocolats)</span>
                  <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                    Vedette
                  </span>
                </Link>
                <Link
                  href="/categories/gourmettes"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-800 hover:bg-amber-50 hover:text-amber-700 flex items-center justify-between"
                >
                  <span>🏷️ Gourmettes d'Identité Gravées</span>
                  <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">
                    Offerte
                  </span>
                </Link>
                <Link
                  href="/categories/boucles-oreilles"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-800 hover:bg-amber-50 hover:text-amber-700"
                >
                  💎 Boucles Fermoir à Vis Bébé
                </Link>
                <Link
                  href="/categories/pendentifs-medailles"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-800 hover:bg-amber-50 hover:text-amber-700"
                >
                  🪬 Pendentifs &amp; Médailles Khmissa
                </Link>
                <Link
                  href="/categories/bracelets-cordons"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-800 hover:bg-amber-50 hover:text-amber-700"
                >
                  🧵 Bracelets Cordons (0-10 ans)
                </Link>
                <Link
                  href="/categories/epingles-bebe"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-800 hover:bg-amber-50 hover:text-amber-700"
                >
                  🧷 Épingles de Berceau &amp; Broches
                </Link>
                <Link
                  href="/panier"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-3 py-2.5 rounded-lg text-sm font-semibold text-stone-800 hover:bg-amber-50 hover:text-amber-700"
                >
                  🛒 Mon Panier ({totalItemsCount})
                </Link>
              </div>
            </div>

            {/* Bas du tiroir */}
            <div className="p-4 bg-stone-50 border-t border-stone-100 space-y-3">
              <a
                href={`tel:${storeConfig.phone}`}
                className="flex items-center space-x-3 text-stone-800 text-xs font-medium"
              >
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-stone-500">Conseiller Joaillier</p>
                  <p className="font-bold">{storeConfig.phone}</p>
                </div>
              </a>

              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}?text=Bonjour%20Rymas%20Jewelry`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center space-x-2 py-2.5 bg-[#25D366] hover:bg-[#1ebd56] text-white rounded-xl text-xs font-bold shadow-md transition-colors"
              >
                <span>Commander sur WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
