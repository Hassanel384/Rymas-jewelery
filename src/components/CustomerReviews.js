"use client";

import React from "react";
import { Star, CheckCircle2, Quote } from "lucide-react";

export default function CustomerReviews() {
  const reviews = [
    {
      name: "Salma B.",
      city: "Casablanca (Maârif)",
      occasion: "Pack Naissance Royal Or 18K",
      comment: "Le coffret de naissance était tout simplement magique ! La gourmette gravée au prénom de mon fils Rayan est d'une finesse incroyable, et les roses éternelles décorent sa chambre. Livraison en 24h très soignée.",
      rating: 5,
      date: "Il y a 3 jours",
    },
    {
      name: "Yassine E.",
      city: "Rabat (Agdal)",
      occasion: "Gourmette Bébé Gravure Offerte",
      comment: "J'ai commandé pour le Sbou3 de ma nièce. Le poinçon de l'or 18K est bien visible, le certificat officiel était inclus et la gravure laser est ultra nette. Merci à l'équipe WhatsApp pour les conseils !",
      rating: 5,
      date: "Il y a 1 semaine",
    },
    {
      name: "Kenza M.",
      city: "Marrakech (Guéliz)",
      occasion: "Boucles d'Oreilles Daisy à Vis",
      comment: "Premières boucles pour ma petite fille de 8 mois. Le fermoir à vis arrondi est extrêmement sécurisant, elle ne se blesse pas du tout en dormant. Bijou d'une pureté exceptionnelle.",
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
            Ils ont Choisi Rymas Jewelry
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
