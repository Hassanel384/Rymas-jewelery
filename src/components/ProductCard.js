"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { storeConfig } from "@/data/storeConfig";
import { ShoppingBag, Star, MessageCircle, Eye, Sparkles, Gift } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart, generateDirectProductWhatsAppLink, setSelectedProductForModal } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsAdding(true);
    addToCart(product, 1);
    setTimeout(() => setIsAdding(false), 800);
  };

  const handleQuickWhatsApp = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const link = generateDirectProductWhatsAppLink(product, 1);
    window.open(link, "_blank");
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setSelectedProductForModal(product);
  };

  const productUrl = `/produit/${product.slug || product.id}`;

  const ageLabels = {
    "0-12m": "0-12 mois",
    "1-3y": "1-3 ans",
    "4-6y": "4-6 ans",
    "7-10y": "7-10 ans",
  };

  return (
    <div className="group bg-white rounded-2xl border border-stone-200/80 overflow-hidden shadow-subtle hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* 1. ZONE IMAGE & BADGES */}
      <Link
        href={productUrl}
        className="relative w-full aspect-square overflow-hidden bg-stone-100 block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image principale */}
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-opacity duration-500 ${
            isHovered && product.secondaryImage
              ? "opacity-0"
              : "opacity-100 group-hover:scale-105 transition-transform duration-500"
          }`}
        />

        {/* Image secondaire au survol */}
        {product.secondaryImage && (
          <Image
            src={product.secondaryImage}
            alt={`${product.name} vue alternative`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-500 ${
              isHovered ? "opacity-100 scale-105" : "opacity-0"
            }`}
          />
        )}

        {/* Badges Flottants */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          {product.badge && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-stone-900/90 backdrop-blur-md text-amber-300 px-2 py-0.5 rounded-full shadow-sm">
              {product.badge}
            </span>
          )}
          {product.isPack && (
            <span className="text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white px-2 py-0.5 rounded-full shadow-sm flex items-center space-x-1">
              <Gift className="w-2.5 h-2.5" />
              <span>Pack Cadeau</span>
            </span>
          )}
        </div>

        {/* Tag Âge flottant en haut à droite */}
        {product.ageRange && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="text-[10px] font-semibold bg-white/90 backdrop-blur-md text-stone-800 px-2 py-0.5 rounded-md shadow-xs">
              {ageLabels[product.ageRange] || product.ageRange}
            </span>
          </div>
        )}

        {/* Bouton Aperçu Rapide */}
        <button
          onClick={handleQuickView}
          className="hidden sm:flex absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 items-center justify-center transition-opacity z-10"
        >
          <span className="bg-white/95 text-stone-900 text-xs font-bold px-3 py-1.5 rounded-full shadow flex items-center space-x-1 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>Aperçu rapide</span>
          </span>
        </button>
      </Link>

      {/* 2. ZONE INFORMATIONS */}
      <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Note étoiles & Poids Or */}
          <div className="flex items-center justify-between mb-1 text-[11px]">
            <div className="flex items-center space-x-1">
              <div className="flex text-amber-400">
                <Star className="w-3 h-3 fill-amber-400" />
              </div>
              <span className="font-semibold text-stone-700">{product.rating}</span>
              <span className="text-stone-400">({product.reviewsCount})</span>
            </div>

            {product.goldWeight && (
              <span className="text-amber-800 font-semibold bg-amber-50 px-1.5 py-0.5 rounded text-[10px]">
                {product.goldWeight}
              </span>
            )}
          </div>

          {/* Titre du produit */}
          <Link href={productUrl}>
            <h3 className="text-xs sm:text-sm font-semibold text-stone-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Badge gravure offerte */}
          {product.engravingFree && (
            <div className="mt-1 flex items-center space-x-1 text-[10px] text-amber-700 font-medium">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Gravure prénom offerte</span>
            </div>
          )}
        </div>

        {/* PRIX ET ACTIONS */}
        <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-col space-y-2.5">
          {/* Ligne Prix */}
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-sm sm:text-base font-bold text-stone-900">
                {product.price} <span className="text-xs font-normal text-stone-600">{storeConfig.currency}</span>
              </span>
              {product.oldPrice && (
                <span className="text-[11px] text-stone-400 line-through">
                  {product.oldPrice} {storeConfig.currency}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-medium bg-emerald-50 px-1.5 py-0.5 rounded">
              Or 18K Garanti
            </span>
          </div>

          {/* BOUTONS D'ACHAT */}
          <div className="grid grid-cols-2 gap-1.5">
            {/* 1. Bouton Panier */}
            <button
              onClick={handleAddToCart}
              className={`w-full py-2 px-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all flex items-center justify-center space-x-1 shadow-sm ${
                isAdding
                  ? "bg-emerald-600 text-white"
                  : "bg-stone-900 hover:bg-stone-800 text-white"
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{isAdding ? "Ajouté !" : "Panier"}</span>
            </button>

            {/* 2. Bouton Commande Directe WhatsApp */}
            <button
              onClick={handleQuickWhatsApp}
              className="w-full py-2 px-2 rounded-xl text-[11px] sm:text-xs font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors flex items-center justify-center space-x-1"
              title="Commander ou demander conseil sur WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
