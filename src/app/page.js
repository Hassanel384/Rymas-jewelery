"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import CategorySlider from "@/components/CategorySlider";
import ProductCard from "@/components/ProductCard";
import FilterBar from "@/components/FilterBar";
import GiftPackBuilder from "@/components/GiftPackBuilder";
import TrustBadges from "@/components/TrustBadges";
import CityCoverage from "@/components/CityCoverage";
import CustomerReviews from "@/components/CustomerReviews";
import Footer from "@/components/Footer";
import { products, categories } from "@/data/products";
import { storeConfig } from "@/data/storeConfig";
import { Sparkles, ArrowRight, Gift, ShieldCheck, PhoneCall, Award } from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedAge, setSelectedAge] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedOccasion, setSelectedOccasion] = useState("all");
  const [isPackOnly, setIsPackOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedAge !== "all" ||
    selectedGender !== "all" ||
    selectedOccasion !== "all" ||
    isPackOnly ||
    Boolean(searchQuery);

  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedAge("all");
    setSelectedGender("all");
    setSelectedOccasion("all");
    setIsPackOnly(false);
    setSearchQuery("");
  };

  // Filtrage combiné : Catégorie, Recherche, Âge, Genre, Occasion, Pack uniquement
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchAge = selectedAge === "all" || item.ageRange === selectedAge;
      const matchGender =
        selectedGender === "all" || item.gender === selectedGender || item.gender === "mixte";
      const matchOccasion =
        selectedOccasion === "all" || item.occasion === selectedOccasion;
      const matchPack = !isPackOnly || item.isPack;
      const matchSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchAge && matchGender && matchOccasion && matchPack && matchSearch;
    });
  }, [selectedCategory, selectedAge, selectedGender, selectedOccasion, isPackOnly, searchQuery]);

  const activeCategoryObj = categories.find((c) => c.id === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      {/* 1. EN-TÊTE PRINCIPAL */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 2. HERO CAROUSEL LUXE BÉBÉ & ENFANT */}
      <HeroSlider />

      {/* 3. STORIES / SLIDER DE CATÉGORIES BIJOUX & PACKS */}
      <CategorySlider
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 4. CONFIGURATEUR DE COFFRET SUR-MESURE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <GiftPackBuilder />
      </div>

      {/* 5. CATALOGUE COMPLET AVEC BARRE DE FILTRAGE MULTI-CRITÈRES */}
      <main id="catalogue" className="flex-1 py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* BARRE DE FILTRAGE MULTI-CRITÈRES */}
        <FilterBar
          selectedAge={selectedAge}
          setSelectedAge={setSelectedAge}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          selectedOccasion={selectedOccasion}
          setSelectedOccasion={setSelectedOccasion}
          isPackOnly={isPackOnly}
          setIsPackOnly={setIsPackOnly}
          onResetFilters={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* En-tête de section & décompte */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 border-b border-stone-200/80 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                Or 18 Carats Garanti &amp; Coffrets Naissance
              </span>
              {filteredProducts.length > 0 && (
                <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">
                  {filteredProducts.length} pièces trouvées
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
              {searchQuery
                ? `Résultats pour "${searchQuery}"`
                : activeCategoryObj?.name || "Tous nos bijoux & coffrets"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              {activeCategoryObj?.description ||
                "Gourmettes d'identité gravées, boucles d'oreilles à vis hypoallergéniques, pendentifs et packs cadeaux prêts à offrir."}
            </p>
          </div>
        </div>

        {/* GRILLE DES PRODUITS */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white rounded-3xl border border-stone-200 p-8 shadow-sm">
            <Gift className="w-12 h-12 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-semibold text-stone-800">
              Aucun bijou ne correspond à cette combinaison de filtres
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
              Essayez d'élargir la tranche d'âge ou réinitialisez les filtres pour découvrir notre collection.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-amber-600 transition-colors"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        )}

        {/* 6. BANNIÈRE CONSEIL & COMMANDE SUR-MESURE */}
        <section className="mt-12 sm:mt-16 rounded-3xl overflow-hidden relative bg-stone-900 text-white shadow-xl">
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />
          <div className="relative p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 text-center md:text-left max-w-xl">
              <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-400 text-stone-900 text-[10px] font-black uppercase tracking-wider">
                <Award className="w-3 h-3" />
                <span>Atelier Joaillerie Sur-Mesure</span>
              </span>
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-white leading-tight">
                Une Célébration Unique : Naissance, Sbou3 ou Baptême ?
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-light">
                Nos artisans joailliers gravent vos prénoms en lettres d'or et composent vos coffrets d'exception avec roses éternelles et chocolats de maître chocolatier. Conseil personnalisé 7j/7.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}?text=Bonjour%20Rymas%20Jewelry%2C%20je%20souhaite%20des%20conseils%20pour%20un%20cadeau%20en%20or%2018k%20pour%20un%20enfant`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#1ebd56] text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-transform hover:scale-105"
              >
                <span>Conseiller WhatsApp dédié</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`tel:${storeConfig.phone}`}
                className="w-full sm:w-auto px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold border border-white/20 flex items-center justify-center space-x-2 transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                <span>Appel direct</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* 7. RÉASSURANCE JOAILLERIE & SÉCURITÉ */}
      <TrustBadges />

      {/* 8. COUVERTURE DES VILLES */}
      <CityCoverage />

      {/* 9. AVIS CLIENTS */}
      <CustomerReviews />

      {/* 10. PIED DE PAGE */}
      <Footer />
    </div>
  );
}
