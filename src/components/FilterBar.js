"use client";

import React from "react";
import { ageFilters, genderFilters, occasionFilters } from "@/data/products";
import { Filter, Baby, Sparkles, Calendar, RotateCcw } from "lucide-react";

export default function FilterBar({
  selectedAge,
  setSelectedAge,
  selectedGender,
  setSelectedGender,
  selectedOccasion,
  setSelectedOccasion,
  isPackOnly,
  setIsPackOnly,
  onResetFilters,
  hasActiveFilters,
}) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200/90 shadow-sm p-4 sm:p-5 mb-8">
      {/* Top Header of the Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-100 mb-4">
        <div className="flex items-center space-x-2 text-stone-800">
          <Filter className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-bold uppercase tracking-wider">
            Filtrer par Âge, Genre &amp; Événement
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center space-x-1.5 text-xs text-amber-700 hover:text-amber-800 font-semibold bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser les filtres</span>
          </button>
        )}
      </div>

      {/* Grid of Filter Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. FILTRE TRANCHE D'ÂGE */}
        <div>
          <label className="block text-xs font-bold text-stone-600 mb-1.5 flex items-center space-x-1.5">
            <Baby className="w-3.5 h-3.5 text-amber-600" />
            <span>Âge de l'enfant (0-10 ans) :</span>
          </label>
          <div className="flex flex-wrap gap-1.5">
            {ageFilters.map((age) => {
              const active = selectedAge === age.id;
              return (
                <button
                  key={age.id}
                  onClick={() => setSelectedAge(age.id)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
                    active
                      ? "bg-stone-900 border-stone-900 text-white shadow-sm"
                      : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  {age.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. FILTRE GENRE */}
        <div>
          <label className="block text-xs font-bold text-stone-600 mb-1.5">
            Destiné à :
          </label>
          <div className="flex flex-wrap gap-1.5">
            {genderFilters.map((gender) => {
              const active = selectedGender === gender.id;
              return (
                <button
                  key={gender.id}
                  onClick={() => setSelectedGender(gender.id)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
                    active
                      ? "bg-stone-900 border-stone-900 text-white shadow-sm"
                      : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
                  }`}
                >
                  {gender.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. FILTRE OCCASION */}
        <div>
          <label className="block text-xs font-bold text-stone-600 mb-1.5 flex items-center space-x-1.5">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Occasion spéciale :</span>
          </label>
          <select
            value={selectedOccasion}
            onChange={(e) => setSelectedOccasion(e.target.value)}
            className="w-full text-xs font-medium bg-stone-50 border border-stone-200 rounded-lg p-2 text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            {occasionFilters.map((occ) => (
              <option key={occ.id} value={occ.id}>
                {occ.label}
              </option>
            ))}
          </select>
        </div>

        {/* 4. FILTRE PACK CADEAU UNIQUEMENT */}
        <div className="flex flex-col justify-end">
          <button
            onClick={() => setIsPackOnly(!isPackOnly)}
            className={`w-full py-2 px-3 rounded-lg border text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
              isPackOnly
                ? "bg-amber-500 border-amber-600 text-stone-950 shadow-sm"
                : "bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-700" />
            <span>{isPackOnly ? "✓ Packs Fleurs & Chocolat actifs" : "Afficher Packs avec Fleurs & Chocolats"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
