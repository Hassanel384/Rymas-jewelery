"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { products, categories } from "@/data/products";
import { SlidersHorizontal, ArrowUpDown, Gift } from "lucide-react";

export default function CataloguePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended"); // "price-asc", "price-desc", "recommended"

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter((item) => {
      const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-1 w-full">
        {/* En-tête Catalogue */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
            Joaillerie Bébé &amp; Enfant (0-10 ans)
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
            Catalogue Rymas Jewelry
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Explorez nos gourmettes gravées en or 18 carats, boucles d'oreilles sécurisées à vis, pendentifs et coffrets cadeaux féeriques avec roses éternelles et chocolats belges.
          </p>
        </div>

        {/* BARRE DE FILTRES ET TRI */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-sm mb-8 space-y-4">
          {/* Catégories Onglets */}
          <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-brand-primary text-white shadow-sm"
                    : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Ligne inférieure : Nombre de résultats & Tri */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-100 text-xs">
            <span className="text-stone-500 font-medium">
              Affichage de <strong>{filteredAndSortedProducts.length}</strong> créations disponibles
            </span>

            <div className="flex items-center space-x-2">
              <span className="text-stone-500 flex items-center space-x-1">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span>Trier par :</span>
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-xs font-semibold text-stone-800 focus:outline-none focus:border-brand-primary"
              >
                <option value="recommended">Recommandés / Populaire</option>
                <option value="price-asc">Prix : croissant</option>
                <option value="price-desc">Prix : décroissant</option>
                <option value="rating">Meilleures notes</option>
              </select>
            </div>
          </div>
        </div>

        {/* GRILLE PRODUITS */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-white rounded-3xl border border-stone-200 p-8">
            <Gift className="w-12 h-12 text-stone-300 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-semibold text-stone-800">
              Aucun résultat pour cette recherche
            </h3>
            <p className="text-xs text-stone-500 max-w-sm mx-auto mt-1">
              Modifiez vos critères de recherche ou réinitialisez les catégories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setSortBy("recommended");
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-brand-primary text-white text-xs font-bold uppercase tracking-wider"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
