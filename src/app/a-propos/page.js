"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import { storeConfig } from "@/data/storeConfig";
import { Sparkles, Heart, Flower2, ShieldCheck, MapPin, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <Header />

      <main className="flex-1 w-full">
        {/* 1. HERO BANNIÈRE À PROPOS */}
        <section className="relative bg-stone-900 text-white py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#d25d5d_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-brand-primary/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>La Maison Decowin</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              {storeConfig.tagline}
            </h1>
            <p className="text-sm sm:text-base text-stone-300 font-light leading-relaxed">
              Depuis notre atelier floral à Casablanca, nous transformons chaque bouquet et coffret de chocolat belge en un moment inoubliable pour vos êtres chers.
            </p>
          </div>
        </section>

        {/* 2. NOTRE HISTOIRE & SAVOIR-FAIRE */}
        <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-stone-100">
              <Image
                src="/images/categories/packs-cadeaux.jpg"
                alt="Atelier joaillerie et coffrets cadeaux"
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white shadow-lg text-xs text-stone-800">
                <p className="font-bold flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Ain Sebaa, Casablanca</span>
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Créations florales artisanales fraîches 7j/7
                </p>
              </div>
            </div>

            {/* Texte de présentation */}
            <div className="space-y-5 text-stone-600 text-xs sm:text-sm leading-relaxed">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                  Notre Passion Florale
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                  L'Excellence Florale &amp; Chocolatière au Maroc
                </h2>
              </div>

              <p>
                Fondée avec la volonté de réinventer l'art du cadeau et de la fleuristerie au Maroc, <strong>Decowin</strong> est née d'une conviction simple : chaque geste d'amour ou d'attention mérite une réalisation d'exception.
              </p>

              <p>
                Chaque matin, nos maîtres fleuristes sélectionnent à la main des roses fraîches velours, des lys majestueux et des fleurs nobles. Associés à des <strong>chocolats belges artisanaux pur beurre de cacao</strong>, nos coffrets signatures et boîtes magiques offrent une expérience sensorielle inoubliable dès l'ouverture.
              </p>

              <p>
                Qu'il s'agisse de célébrer un <em>anniversaire</em>, d'offrir le <em>cadeau idéal à votre fiancée</em> lors de vos fiançailles (Dfaâ / Hdia), ou de sublimer un cortège de mariage, notre équipe déploie tout son savoir-faire pour faire triompher l'émotion.
              </p>

              <div className="pt-2 flex items-center space-x-4">
                <Link
                  href="/catalogue"
                  className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-brand-primary text-white text-xs font-bold uppercase tracking-wider shadow-md hover:bg-brand-primary-hover transition-colors"
                >
                  <span>Explorer le catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-5 py-3 rounded-full border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition-colors"
                >
                  <span>Nous contacter</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 3. NOS 4 PILIERS DE QUALITÉ */}
        <section className="py-12 bg-white border-y border-stone-200/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                Nos Engagements
              </span>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mt-1">
                Pourquoi Faire Confiance à Decowin ?
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-stone-50 border border-stone-100 space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-brand-primary flex items-center justify-center">
                  <Flower2 className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">Fraîcheur Absolue</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Roses et fleurs coupées du jour garantissant une tenue éclatante en vase de plus d'une semaine.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-stone-50 border border-stone-100 space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">Chocolat Belge Pur</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Recettes de dégustation pur beurre de cacao, ganaches et pralinés d'exception.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-stone-50 border border-stone-100 space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Heart className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">Carte Manuscrite Offerte</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Votre message d'amour ou de félicitations est calligraphié avec élégance sur une carte de luxe.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-stone-50 border border-stone-100 space-y-2.5">
                <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-stone-900">Livraison Ponctuelle</h3>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Livreurs dédiés respectant scrupuleusement les créneaux horaires à Casablanca et dans tout le Maroc.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. RÉASSURANCE */}
        <TrustBadges />
      </main>

      <Footer />
    </div>
  );
}
