"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { storeConfig } from "@/data/storeConfig";
import { X, ShoppingBag, MessageCircle, Check, Calendar, MapPin, Heart } from "lucide-react";

export default function ProductModal() {
  const { selectedProductForModal, setSelectedProductForModal, addToCart, generateDirectProductWhatsAppLink } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [engravingText, setEngravingText] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedCity, setSelectedCity] = useState("Casablanca");
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;
  const images = [product.image, product.secondaryImage].filter(Boolean);

  const handleAddToCart = () => {
    addToCart(product, quantity, { engravingText, customMessage, deliveryDate });
    setSelectedProductForModal(null);
  };

  const handleWhatsAppOrder = () => {
    const link = generateDirectProductWhatsAppLink(product, quantity, {
      engravingText,
      customMessage,
      deliveryDate,
      city: selectedCity,
    });
    window.open(link, "_blank");
    setSelectedProductForModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fade-in">
      {/* Fond sombre translucide */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setSelectedProductForModal(null)}
      />

      {/* Boîte Modale */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {/* Bouton Fermer */}
        <button
          onClick={() => setSelectedProductForModal(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-stone-700 shadow-md flex items-center justify-center transition-colors"
          aria-label="Fermer la fenêtre"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Corps de la modale */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            {/* Colonne Galerie Photo */}
            <div className="space-y-2.5">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-stone-100 shadow-inner">
                <Image
                  src={images[activeImageIndex] || product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-stone-900/90 text-amber-300 px-3 py-1 rounded-full shadow">
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Miniatures si multiples images */}
              {images.length > 1 && (
                <div className="flex space-x-2">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        activeImageIndex === i ? "border-brand-primary scale-105" : "border-stone-200 opacity-70"
                      }`}
                    >
                      <Image src={img} alt={`Vue ${i + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Colonne Informations & Options */}
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-semibold text-brand-primary uppercase tracking-wider">
                  Composition d'Exception
                </span>
                <h2 className="text-base sm:text-xl font-serif font-bold text-stone-900 leading-tight">
                  {product.name}
                </h2>
              </div>

              {/* Prix */}
              <div className="flex items-baseline space-x-2">
                <span className="text-xl sm:text-2xl font-black text-brand-primary">
                  {product.price} {storeConfig.currency}
                </span>
                {product.oldPrice && (
                  <span className="text-xs text-stone-400 line-through">
                    {product.oldPrice} {storeConfig.currency}
                  </span>
                )}
              </div>

              <p className="text-xs text-stone-600 leading-relaxed">{product.description}</p>

              {/* Caractéristiques */}
              <div className="bg-amber-50/60 rounded-xl p-3 text-xs space-y-1.5 border border-amber-200/60">
                {product.goldWeight && (
                  <div className="flex items-center space-x-2 text-stone-800">
                    <Check className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                    <span><strong>Matière :</strong> Or 18 Carats Garanti ({product.goldWeight})</span>
                  </div>
                )}
                {product.engravingFree && (
                  <div className="flex items-center space-x-2 text-stone-800">
                    <Check className="w-3.5 h-3.5 text-amber-700 flex-shrink-0" />
                    <span><strong>Personnalisation :</strong> Gravure prénom &amp; date offerte</span>
                  </div>
                )}
                {product.isPack && (
                  <div className="flex items-center space-x-2 text-stone-800">
                    <Check className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                    <span><strong>Coffret Pack :</strong> Roses éternelles &amp; chocolats belges inclus</span>
                  </div>
                )}
                <div className="flex items-center space-x-2 text-stone-800">
                  <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span><strong>Garantie :</strong> Poinçon d'État officiel &amp; certificat d'authenticité</span>
                </div>
              </div>

              {/* Quantité */}
              <div className="flex items-center space-x-3 pt-1">
                <span className="text-xs font-semibold text-stone-700">Quantité :</span>
                <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-2.5 py-1 text-sm font-bold text-stone-600 hover:text-stone-900"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-2.5 py-1 text-sm font-bold text-stone-600 hover:text-stone-900"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* OPTIONS PERSONNALISÉES (DATE & MESSAGE CARTE) */}
          <div className="border-t border-stone-100 pt-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center space-x-1.5">
              <Heart className="w-3.5 h-3.5 text-brand-primary fill-brand-primary" />
              <span>Personnalisation &amp; Livraison</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Ville */}
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1 flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-brand-primary" />
                  <span>Ville de livraison</span>
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-brand-primary"
                >
                  {storeConfig.cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name} (+{city.deliveryFee} Dhs)
                    </option>
                  ))}
                </select>
              </div>

              {/* Date souhaitée */}
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1 flex items-center space-x-1">
                  <Calendar className="w-3 h-3 text-brand-primary" />
                  <span>Date de livraison souhaitée</span>
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-brand-primary"
                />
              </div>
            </div>

            {/* Gravure prénom si éligible */}
            {(product.engravingFree || product.category === "gourmettes" || product.isPack) && (
              <div>
                <label className="block text-[11px] font-semibold text-amber-900 mb-1 flex items-center space-x-1">
                  <span>Prénom &amp; Date à graver sur le bijou (Offert) :</span>
                </label>
                <input
                  type="text"
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder="Ex: Adam - 15/06/2026 ou Sofia ♡"
                  className="w-full text-xs p-2.5 rounded-xl border border-amber-300 bg-amber-50/40 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>
            )}

            {/* Mot pour la carte */}
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Mot de félicitations pour la carte offerte :
              </label>
              <textarea
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Ex: Bienvenue au monde petit ange ! Félicitations aux heureux parents..."
                rows={2}
                className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-amber-600 resize-none"
              />
            </div>
          </div>
        </div>

        {/* PIED DE MODALE : BOUTONS D'ACHAT STICKY */}
        <div className="p-4 bg-stone-50 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Bouton Ajouter au Panier */}
          <button
            onClick={handleAddToCart}
            className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Ajouter au panier</span>
          </button>

          {/* Bouton WhatsApp Express */}
          <button
            onClick={handleWhatsAppOrder}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Commander via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
