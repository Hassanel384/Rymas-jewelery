"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { heroSlides } from "@/data/products";
import { storeConfig } from "@/data/storeConfig";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto défilement toutes les 6 secondes
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const next = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] overflow-hidden bg-stone-900">
      {heroSlides.map((slide, index) => {
        const isActive = index === currentSlide;
        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            {/* Image d'arrière-plan */}
            <Image
              src={slide.bgImage}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover object-center transform scale-105 transition-transform duration-10000 ease-out"
            />

            {/* Voile dégradé sombre pour lisibilité mobile & desktop */}
            <div className={`absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r ${slide.color}`} />

            {/* Contenu textuel */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end md:justify-center pb-12 md:pb-0">
              <div className="max-w-xl text-white space-y-2 sm:space-y-4">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-brand-primary/80 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{slide.tag}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
                  {slide.title}
                </h1>

                <p className="text-xs sm:text-sm md:text-base text-stone-200 font-light leading-relaxed max-w-md">
                  {slide.subtitle}
                </p>

                <div className="pt-2 sm:pt-4 flex items-center space-x-3">
                  <a
                    href={slide.ctaLink}
                    className="inline-flex items-center justify-center px-5 py-2.5 sm:px-7 sm:py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-stone-950 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                  >
                    {slide.ctaText}
                  </a>
                  <a
                    href={`https://wa.me/${storeConfig.whatsappNumber}?text=Bonjour%20Rymas%20Jewelry%2C%20je%20souhaite%20un%20conseil%20pour%20un%20cadeau%20en%20or%2018k`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2.5 sm:px-5 sm:py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-white/20 transition-colors"
                  >
                    Conseil WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Flèches de navigation Desktop */}
      <button
        onClick={prev}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white items-center justify-center transition-colors"
        aria-label="Diapositive précédente"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md text-white items-center justify-center transition-colors"
        aria-label="Diapositive suivante"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicateurs de points (Dots) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === currentSlide ? "w-6 bg-brand-primary" : "w-1.5 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Aller à la diapositive ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
