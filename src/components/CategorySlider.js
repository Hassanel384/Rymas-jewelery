"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { categories } from "@/data/products";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CategorySlider({ selectedCategory, onSelectCategory }) {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative py-4 md:py-6 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base md:text-xl font-serif font-bold text-stone-900">
              Découvrez nos Univers Floraux
            </h2>
            <p className="text-xs text-stone-500">
              Sélectionnez une catégorie pour filtrer instantanément les créations
            </p>
          </div>

          {/* Boutons défilement Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            <button
              onClick={() => handleScroll("left")}
              className="p-1.5 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-brand-primary transition-colors"
              aria-label="Catégories précédentes"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-1.5 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-brand-primary transition-colors"
              aria-label="Catégories suivantes"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* LISTE HORIZONTALE DÉFILANTE (MOBILE STORIES / TOUCH SLIDER) */}
        <div
          ref={scrollRef}
          className="flex space-x-3 md:space-x-4 overflow-x-auto no-scrollbar scroll-smooth py-1 px-0.5"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  const el = document.getElementById("catalogue");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className={`flex-shrink-0 flex flex-col items-center group text-center focus:outline-none transition-all ${
                  isSelected ? "scale-105" : "hover:scale-102 opacity-90 hover:opacity-100"
                }`}
              >
                {/* Cercle avec photo & badge */}
                <div className="relative">
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full overflow-hidden p-0.5 transition-all ${
                      isSelected
                        ? "ring-3 ring-brand-primary ring-offset-2 shadow-md"
                        : "ring-1 ring-stone-200 group-hover:ring-brand-primary/50"
                    }`}
                  >
                    <div className="relative w-full h-full rounded-full overflow-hidden">
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 768px) 64px, 96px"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {cat.badge && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase bg-brand-primary text-white px-1.5 py-0.5 rounded-full shadow whitespace-nowrap">
                      {cat.badge}
                    </span>
                  )}
                </div>

                {/* Nom de la catégorie */}
                <span
                  className={`mt-2 text-xs md:text-sm font-medium max-w-[80px] md:max-w-[100px] leading-tight line-clamp-2 transition-colors ${
                    isSelected ? "text-brand-primary font-bold" : "text-stone-700 group-hover:text-stone-900"
                  }`}
                >
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
