"use client";

import React from "react";
import { ShieldCheck, Sparkles, Gift, Truck } from "lucide-react";

export default function TrustBadges() {
  const badges = [
    {
      icon: ShieldCheck,
      title: "Or 18K Garanti & Poinçonné",
      desc: "Titrage officiel 750‰ avec certificat d'authenticité et poinçon d'État sur chaque bijou.",
      color: "text-amber-700 bg-amber-50",
    },
    {
      icon: Sparkles,
      title: "Gravure Prénom Offerte",
      desc: "Gravure laser de précision réalisée dans notre atelier joaillier pour immortaliser les souvenirs.",
      color: "text-rose-700 bg-rose-50",
    },
    {
      icon: Gift,
      title: "Roses Éternelles & Chocolats",
      desc: "Roses naturelles stabilisées (durée 3 ans) et chocolats belges fins pur beurre de cacao.",
      color: "text-purple-700 bg-purple-50",
    },
    {
      icon: Truck,
      title: "Livraison Sécurisée & Cash",
      desc: "Colis joaillerie scellé. Vérifiez l'authenticité de votre bijou avant de régler à la livraison.",
      color: "text-emerald-700 bg-emerald-50",
    },
  ];

  return (
    <section className="py-8 sm:py-12 bg-white border-y border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {badges.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left p-3.5 sm:p-4 rounded-2xl bg-stone-50/70 border border-stone-100 shadow-sm"
              >
                <div className={`p-2.5 rounded-xl ${b.color} mb-2.5 sm:mb-0 sm:mr-3.5 flex-shrink-0`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-stone-500 mt-1 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
