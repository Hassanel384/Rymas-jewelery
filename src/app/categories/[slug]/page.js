"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/data/products";
import { ChevronRight, ArrowUpDown, Gift, Sparkles } from "lucide-react";

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  const category = categories.find((c) => c.slug === slug || c.id === slug);
  if (!category && slug !== "tous") {
    notFound();
  }

  const [sortBy, setSortBy] = useState("recommended");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchCat = category?.id === "all" || slug === "tous" || p.category === category?.id;
      const matchSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [category, slug, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 w-full">
        {/* 1. FIL D'ARIANE */}
        <nav className="flex items-center space-x-2 text-xs text-stone-500 mb-6">
          <Link href="/" className="hover:text-brand-primary transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <Link href="/catalogue" className="hover:text-brand-primary transition-colors">
            Catégories
          </Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-stone-900 font-semibold">{category?.name || "Tous les produits"}</span>
        </nav>

        {/* 2. EN-TÊTE DE CATÉGORIE AVEC BANNIÈRE ÉLÉGANTE */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white p-6 sm:p-12 mb-8 shadow-md min-h-[190px] flex items-center">
          {category?.image && (
            <>
              <Image
                src={category.image}
                alt={category.name}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-stone-950/30" />
            </>
          )}
          <div className="relative z-10 max-w-2xl space-y-2.5">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-primary/80 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>Collection Or 18K Garanti</span>
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
              {category?.name || "Nos Bijoux Bébé & Enfant"}
            </h1>
            <p className="text-xs sm:text-sm text-stone-200 font-light leading-relaxed">
              {category?.description}
            </p>
          </div>
        </div>

        {/* 3. BARRE DE TRI ET STATS */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <span className="text-stone-600 font-medium">
            <strong>{filteredAndSortedProducts.length}</strong> modèles disponibles en livraison rapide
          </span>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
            <span className="text-stone-500 flex items-center space-x-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Trier par :</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-stone-800 focus:outline-none focus:border-brand-primary"
            >
              <option value="recommended">Recommandés &amp; Nouveautés</option>
              <option value="price-asc">Prix : croissant</option>
              <option value="price-desc">Prix : décroissant</option>
              <option value="rating">Meilleures notes (5 étoiles)</option>
            </select>
          </div>
        </div>

        {/* 4. GRILLE PRODUITS */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredAndSortedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-stone-200 p-8">
            <Gift className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-base font-serif font-semibold text-stone-800">
              Aucun produit trouvé dans cette sélection
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              Consultez nos autres catégories ou contactez-nous sur WhatsApp pour du sur-mesure.
            </p>
          </div>
        )}

        {/* 5. TEXTE SEO OPTIMISÉ POUR GOOGLE MAROC */}
        <section className="mt-16 bg-white p-6 sm:p-8 rounded-3xl border border-stone-100 text-xs text-stone-600 space-y-3 leading-relaxed">
          <h2 className="text-sm sm:text-base font-serif font-bold text-stone-900">
            Pourquoi Choisir Rymas Jewelry pour vos {category?.name} au Maroc ?
          </h2>
          <p>
            Chez <strong>Rymas Jewelry</strong>, chaque bijou en or 18 carats (750‰) est spécialement conçu pour respecter la peau délicate et la sécurité des bébés et des enfants de 0 à 10 ans. Des fermoirs à vis protecteurs pour les boucles d&apos;oreilles, aux gourmettes d&apos;identité gravées avec amour, en passant par les pendentifs protecteurs Khmissa et anges gardiens, chaque création est une promesse d&apos;éternité.
          </p>
          <p>
            Nous assurons une <strong>livraison express sécurisée sous 24h à 48h partout au Maroc</strong> (Casablanca, Rabat, Marrakech, Tanger, Fès, Meknès, Agadir...) avec certificat d&apos;authenticité officiel et paiement à la livraison en toute tranquillité.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
