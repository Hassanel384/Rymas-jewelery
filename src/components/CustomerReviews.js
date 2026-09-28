"use client";

import React from "react";
import { Star, CheckCircle2, Quote } from "lucide-react";

export default function CustomerReviews() {
  const reviews = [
    {
      name: "Salma B.",
      city: "Casablanca (Maârif)",
      occasion: "Pack Fiançailles & Roses",
      comment: "Le coffret de fiançailles était absolument somptueux ! Les fleurs sont restées impeccables pendant plus d'une semaine et le tiroir de chocolat belge a fait l'unanimité. Livraison en 3h chrono.",
      rating: 5,
      date: "Il y a 3 jours",
    },
    {
      name: "Yassine E.",
      city: "Rabat (Agdal)",
      occasion: "Boîte Magique Cœur & Chocolat",
      comment: "J'ai commandé à distance pour l'anniversaire de ma fiancée à Rabat. Le service client sur WhatsApp est d'une gentillesse rare, ils m'ont envoyé une photo du bouquet avant le départ du livreur. 10/10 !",
      rating: 5,
      date: "Il y a 1 semaine",
    },
    {
      name: "Kenza M.",
      city: "Marrakech (Guéliz)",
      occasion: "Bouquet 30 Roses Équateur",
      comment: "Qualité exceptionnelle des roses rouges. Rien à voir avec les fleuristes ordinaires. Emballage de luxe, carte manuscrite très bien rédigée. Je commanderai à nouveau sans hésiter.",
      rating: 5,
      date: "Il y a 2 semaines",
    },
  ];

  return (
    <section className="py-10 sm:py-16 bg-stone-50 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
            Témoignages &amp; Confiance
          </span>
          <h2 className="text-xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Ils ont Célébré avec Deco &amp; Marc
          </h2>
          <div className="flex items-center justify-center space-x-1 mt-2 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400" />
            ))}
            <span className="text-xs font-bold text-stone-700 ml-2">4.9 / 5 sur plus de 1 200 livraisons</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white p-5 sm:p-6 rounded-3xl border border-stone-100 shadow-sm flex flex-col justify-between space-y-4 relative"
            >
              <Quote className="w-8 h-8 text-rose-100 absolute top-4 right-4" />

              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;{r.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs font-bold text-stone-900">{r.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[10px] text-stone-400">{r.city} • {r.occasion}</p>
                </div>
                <span className="text-[10px] text-stone-400">{r.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
