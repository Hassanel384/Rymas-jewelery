"use client";

import React from "react";
import { MapPin, Clock, CheckCircle } from "lucide-react";

export default function CityCoverage() {
  const cities = [
    {
      name: "Casablanca",
      delay: "Sous 2h à 4h ou jour même",
      desc: "Ain Sebaa, Anfa, Maarif, Bourgogne, Californie, Sidi Maarouf, Ain Diab...",
      isFeatured: true,
    },
    {
      name: "Rabat / Salé / Témara",
      delay: "Sous 24h garantie",
      desc: "Agdal, Souissi, Hay Riad, Hassan, Harhoura...",
      isFeatured: false,
    },
    {
      name: "Marrakech",
      delay: "Sous 24h garantie",
      desc: "Guéliz, Hivernage, Palmeraie, Targa, Médina...",
      isFeatured: false,
    },
    {
      name: "Tanger",
      delay: "Sous 24h garantie",
      desc: "Malabata, Centre Ville, Iberia, Marshan...",
      isFeatured: false,
    },
    {
      name: "Fès / Meknès",
      delay: "Sous 24h",
      desc: "Centre Ville, Ville Nouvelle, Champs de Course...",
      isFeatured: false,
    },
    {
      name: "Agadir",
      delay: "Sous 24h à 48h",
      desc: "Baie d'Agadir, Sonaba, Founty, Talborjt...",
      isFeatured: false,
    },
  ];

  return (
    <section className="py-10 sm:py-16 bg-white border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
            Couverture Nationale
          </span>
          <h2 className="text-xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
            Bijouterie Or 18K &amp; Livraison Sécurisée au Maroc
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Notre atelier de joaillerie basé à Casablanca expédie vos bijoux en or 18 carats pour bébés et coffrets de naissance avec un soin infini dans les plus grandes villes du Royaume.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {cities.map((city, i) => (
            <div
              key={i}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                city.isFeatured
                  ? "bg-rose-50/40 border-brand-primary/30 shadow-md ring-1 ring-brand-primary/20"
                  : "bg-stone-50/50 border-stone-200/80 hover:bg-white hover:shadow-md"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-brand-primary" />
                  <h3 className="text-sm sm:text-base font-bold text-stone-900">{city.name}</h3>
                </div>
                {city.isFeatured && (
                  <span className="text-[10px] font-bold uppercase bg-brand-primary text-white px-2 py-0.5 rounded-full">
                    Express 2h
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-1.5 text-xs text-emerald-700 font-semibold mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{city.delay}</span>
              </div>

              <p className="text-[11px] text-stone-500 leading-relaxed">{city.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-amber-50 border border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
            <p className="text-xs text-amber-900">
              <strong>Une occasion spéciale ou une livraison hors des zones habituelles ?</strong> Notre équipe s'adapte à vos besoins sur simple appel ou message WhatsApp.
            </p>
          </div>
          <a
            href="https://wa.me/212674971315?text=Bonjour%20Deco%20%26%20Marc%2C%20je%20souhaite%20une%20livraison%20sp%C3%A9ciale"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors"
          >
            Contacter le service livraison
          </a>
        </div>
      </div>
    </section>
  );
}
