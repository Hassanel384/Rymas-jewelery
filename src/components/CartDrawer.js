"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { storeConfig } from "@/data/storeConfig";
import { X, Trash2, ShoppingBag, MessageCircle, MapPin, Truck, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    selectedCity,
    setSelectedCity,
    generateWhatsAppCheckoutLink,
  } = useCart();

  const [checkoutMode, setCheckoutMode] = useState("direct"); // "direct" ou "form"
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  if (!isCartOpen) return null;

  const handleCityChange = (e) => {
    const city = storeConfig.cities.find((c) => c.name === e.target.value);
    if (city) setSelectedCity(city);
  };

  const handleWhatsAppCheckout = () => {
    const link = generateWhatsAppCheckoutLink({
      name: customerName,
      phone: customerPhone,
      address: customerAddress,
    });
    window.open(link, "_blank");
  };

  const handleFormOrderSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Veuillez remplir votre nom, numéro de téléphone et adresse.");
      return;
    }
    // Simulation enregistrement commande et notification
    setIsOrderPlaced(true);
    setTimeout(() => {
      // Envoyer aussi le récapitulatif sur WhatsApp pour confirmation
      handleWhatsAppCheckout();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Fond sombre */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          {/* 1. EN-TÊTE DU PANIER */}
          <div className="p-4 sm:p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-brand-primary" />
              <h2 className="text-base sm:text-lg font-serif font-bold text-stone-900">
                Votre Panier
              </h2>
              <span className="text-xs bg-brand-primary/10 text-brand-primary font-bold px-2 py-0.5 rounded-full">
                {items.length} {items.length > 1 ? "articles" : "article"}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-200 transition-colors"
              aria-label="Fermer le panier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 2. CORPS DU PANIER */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {isOrderPlaced ? (
              /* ÉCRAN DE CONFIRMATION DE COMMANDE */
              <div className="py-12 text-center space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-serif font-bold text-stone-900">
                  Commande Transmise avec Succès !
                </h3>
                <p className="text-xs text-stone-600 max-w-xs mx-auto leading-relaxed">
                  Merci {customerName}, notre équipe prépare vos fleurs fraîches. Vous recevez un message de confirmation sur votre WhatsApp.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      clearCart();
                      setIsOrderPlaced(false);
                      setIsCartOpen(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-stone-800"
                  >
                    Retour à la boutique
                  </button>
                </div>
              </div>
            ) : items.length === 0 ? (
              /* PANIER VIDE */
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-serif font-semibold text-stone-800">
                  Votre panier est vide
                </h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Découvrez nos magnifiques coffrets de roses, chocolats belges et bouquets frais !
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-block px-5 py-2.5 rounded-full bg-brand-primary text-white text-xs font-bold uppercase tracking-wider shadow hover:bg-brand-primary-hover"
                >
                  Découvrir les créations
                </button>
              </div>
            ) : (
              /* LISTE DES ARTICLES */
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex space-x-3 p-3 rounded-2xl bg-stone-50 border border-stone-100"
                  >
                    {/* Image Miniature */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-stone-200">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Détails */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-semibold text-stone-900 line-clamp-1 pr-2">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-stone-400 hover:text-red-600 transition-colors p-0.5"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Gravure prénom si existante */}
                      {item.engravingText && (
                        <p className="text-[10px] text-amber-800 font-medium line-clamp-1">
                          ✍️ Gravure : <strong>{item.engravingText}</strong>
                        </p>
                      )}

                      {/* Mot pour la carte si existant */}
                      {item.customMessage && (
                        <p className="text-[10px] text-stone-500 italic line-clamp-1">
                          💌 &ldquo;{item.customMessage}&rdquo;
                        </p>
                      )}

                      {/* Options pack sur-mesure */}
                      {item.customDetails?.addons?.length > 0 && (
                        <p className="text-[10px] text-stone-500 line-clamp-1">
                          🎁 {item.customDetails.addons.join(", ")}
                        </p>
                      )}

                      {/* Ligne Prix & Sélecteur Quantité */}
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs font-bold text-brand-primary">
                          {item.product.price * item.quantity} {storeConfig.currency}
                        </span>

                        <div className="flex items-center space-x-2 bg-white px-2 py-0.5 rounded-lg border border-stone-200 text-xs">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="text-stone-600 hover:text-stone-900 font-bold px-1"
                          >
                            -
                          </button>
                          <span className="font-semibold text-stone-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="text-stone-600 hover:text-stone-900 font-bold px-1"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* SÉLECTION DE LA VILLE & FRAIS DE LIVRAISON */}
                <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-stone-800 flex items-center space-x-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                      <span>Ville de livraison :</span>
                    </label>
                    <span className="text-xs font-bold text-amber-800">
                      {deliveryFee} {storeConfig.currency}
                    </span>
                  </div>

                  <select
                    value={selectedCity.name}
                    onChange={handleCityChange}
                    className="w-full text-xs p-2 rounded-xl border border-stone-200 bg-white focus:outline-none focus:border-brand-primary"
                  >
                    {storeConfig.cities.map((city) => (
                      <option key={city.name} value={city.name}>
                        {city.name} — {city.estimate} ({city.deliveryFee} Dhs)
                      </option>
                    ))}
                  </select>
                </div>

                {/* BASCOULE ENTRE COMMANDE WHATSAPP & FORMULAIRE */}
                <div className="flex bg-stone-100 p-1 rounded-xl text-xs font-semibold text-stone-700">
                  <button
                    onClick={() => setCheckoutMode("direct")}
                    className={`flex-1 py-1.5 rounded-lg transition-all ${
                      checkoutMode === "direct" ? "bg-white text-stone-900 shadow-sm font-bold" : "text-stone-500"
                    }`}
                  >
                    1 Clic WhatsApp
                  </button>
                  <button
                    onClick={() => setCheckoutMode("form")}
                    className={`flex-1 py-1.5 rounded-lg transition-all ${
                      checkoutMode === "form" ? "bg-white text-stone-900 shadow-sm font-bold" : "text-stone-500"
                    }`}
                  >
                    Formulaire Simple
                  </button>
                </div>

                {/* FORMULAIRE EXPRESS EN 1 PAGE SI SÉLECTIONNÉ */}
                {checkoutMode === "form" && (
                  <form onSubmit={handleFormOrderSubmit} className="space-y-2.5 pt-1 animate-fade-in text-xs">
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Votre nom complet"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full p-2 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="Numéro de téléphone (ex: 06 63 04 64 46)"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full p-2 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Adresse de livraison exacte (Quartier, Rue, N°)"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full p-2 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary"
                      />
                    </div>
                    <div className="flex items-center space-x-2 text-[11px] text-stone-600 bg-stone-50 p-2 rounded-lg border border-stone-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Mode : Paiement en espèces à la livraison (Cash on Delivery)</span>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* 3. PIED DU PANIER & TOTAL */}
          {!isOrderPlaced && items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50 space-y-3">
              <div className="space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Sous-total articles :</span>
                  <span className="font-semibold text-stone-900">{subtotal} {storeConfig.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison ({selectedCity.name}) :</span>
                  <span className="font-semibold text-stone-900">{deliveryFee} {storeConfig.currency}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total à payer :</span>
                  <span className="text-brand-primary text-lg">{total} {storeConfig.currency}</span>
                </div>
              </div>

              {/* BOUTON D'ACTION PRINCIPAL */}
              {checkoutMode === "direct" ? (
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Commander sur WhatsApp en 1 Clic</span>
                </button>
              ) : (
                <button
                  onClick={handleFormOrderSubmit}
                  className="w-full py-3.5 px-4 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <Truck className="w-5 h-5" />
                  <span>Confirmer la commande (Paiement Cash)</span>
                </button>
              )}

              <p className="text-[10px] text-center text-stone-500">
                🔒 Vos informations sont confidentielles • Support réactif 7j/7
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
