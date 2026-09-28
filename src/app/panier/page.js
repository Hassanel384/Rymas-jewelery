"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { storeConfig } from "@/data/storeConfig";
import {
  Trash2,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  MapPin,
  Calendar,
  Heart,
} from "lucide-react";

export default function CartPage() {
  const {
    items,
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

  const [checkoutMode, setCheckoutMode] = useState("whatsapp"); // "whatsapp" ou "form"
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [isOrderSubmitted, setIsOrderSubmitted] = useState(false);

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerAddress) {
      alert("Veuillez renseigner votre nom, téléphone et adresse complète.");
      return;
    }
    setIsOrderSubmitted(true);
    setTimeout(() => {
      handleWhatsAppCheckout();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 w-full">
        {/* Titre de la page */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
              Commande Sécurisée
            </span>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
              Mon Panier
            </h1>
          </div>

          <Link
            href="/catalogue"
            className="text-xs font-bold text-stone-600 hover:text-brand-primary flex items-center space-x-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continuer mes achats</span>
          </Link>
        </div>

        {isOrderSubmitted ? (
          /* ÉCRAN DE CONFIRMATION DE COMMANDE */
          <div className="bg-white rounded-3xl p-8 sm:p-16 border border-stone-200 text-center max-w-2xl mx-auto space-y-4 shadow-sm animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Merci pour votre commande chez Decowin !
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-md mx-auto">
              Votre commande pour <strong>{customerName}</strong> à <strong>{selectedCity.name}</strong> a bien été enregistrée. Notre fleuriste prépare vos fleurs fraîches.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Ouvrir WhatsApp pour confirmer</span>
              </button>
              <button
                onClick={() => {
                  clearCart();
                  setIsOrderSubmitted(false);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-stone-900 text-white font-bold text-xs uppercase tracking-wider"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        ) : items.length === 0 ? (
          /* PANIER VIDE */
          <div className="bg-white rounded-3xl p-12 sm:p-20 border border-stone-200 text-center max-w-xl mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-900">
              Votre panier est vide pour le moment
            </h2>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Laissez-vous tenter par nos coffrets de roses, chocolats belges et arrangements floraux d'exception.
            </p>
            <div className="pt-2">
              <Link
                href="/catalogue"
                className="inline-block px-8 py-3.5 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-md transition-transform hover:scale-102"
              >
                Découvrir la collection
              </Link>
            </div>
          </div>
        ) : (
          /* CONTENU DU PANIER : 2 COLONNES */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* COLONNE GAUCHE (2/3) : LISTE DES ARTICLES */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-6 shadow-sm divide-y divide-stone-100">
                {items.map((item) => (
                  <div key={item.product.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      {/* Image */}
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-stone-100 flex-shrink-0 border border-stone-100">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Infos */}
                      <div className="space-y-1">
                        <Link
                          href={`/produit/${item.product.slug}`}
                          className="text-xs sm:text-sm font-bold text-stone-900 hover:text-brand-primary transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-brand-primary font-bold">
                          {item.product.price} {storeConfig.currency}
                        </p>

                        {/* Gravure personnalisée */}
                        {item.engravingText && (
                          <p className="text-[11px] text-amber-800 font-semibold">
                            ✍️ Gravure prénom/date : <strong>{item.engravingText}</strong>
                          </p>
                        )}

                        {/* Compléments pack cadeau */}
                        {item.customDetails?.addons?.length > 0 && (
                          <p className="text-[11px] text-stone-600">
                            🎁 Compléments : {item.customDetails.addons.join(", ")}
                          </p>
                        )}

                        {/* Mot doux personnalisé */}
                        {item.customMessage && (
                          <p className="text-[11px] text-stone-500 italic flex items-center space-x-1">
                            <Heart className="w-3 h-3 text-amber-700 flex-shrink-0" />
                            <span className="truncate max-w-xs">&ldquo;{item.customMessage}&rdquo;</span>
                          </p>
                        )}

                        {/* Date de livraison */}
                        {item.deliveryDate && (
                          <p className="text-[11px] text-stone-500 flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-brand-primary flex-shrink-0" />
                            <span>Livraison : {item.deliveryDate}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Quantité & Sous-total */}
                    <div className="flex items-center justify-between w-full sm:w-auto space-x-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                      {/* Contrôle de quantité */}
                      <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-stone-600 hover:text-stone-900 font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 font-bold text-stone-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-stone-600 hover:text-stone-900 font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Total article */}
                      <span className="text-sm font-black text-stone-900 min-w-[70px] text-right">
                        {item.product.price * item.quantity} {storeConfig.currency}
                      </span>

                      {/* Supprimer */}
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        title="Supprimer cet article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* SÉLECTEUR DE VILLE DE LIVRAISON */}
              <div className="bg-white rounded-3xl border border-stone-200/80 p-4 sm:p-6 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-brand-primary" />
                    <span>Sélectionner votre ville de livraison au Maroc :</span>
                  </h3>
                  <span className="text-xs font-bold text-brand-primary">
                    +{deliveryFee} {storeConfig.currency}
                  </span>
                </div>

                <select
                  value={selectedCity.name}
                  onChange={handleCityChange}
                  className="w-full text-xs p-3 rounded-2xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-brand-primary font-medium"
                >
                  {storeConfig.cities.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name} — {c.estimate} (+{c.deliveryFee} Dhs)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* COLONNE DROITE (1/3) : RÉCAPITULATIF & CHECKOUT */}
            <div className="bg-white rounded-3xl border border-stone-200/80 p-5 sm:p-6 shadow-sm space-y-5 sticky top-24">
              <h3 className="text-base font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
                Récapitulatif de la Commande
              </h3>

              <div className="space-y-2.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Sous-total articles :</span>
                  <span className="font-semibold text-stone-900">{subtotal} {storeConfig.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison ({selectedCity.name}) :</span>
                  <span className="font-semibold text-stone-900">{deliveryFee} {storeConfig.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span>Carte de vœux manuscrite :</span>
                  <span className="font-semibold text-emerald-600">Offerte</span>
                </div>
                <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-200">
                  <span>Total à régler :</span>
                  <span className="text-brand-primary text-xl font-black">{total} {storeConfig.currency}</span>
                </div>
              </div>

              {/* SÉLECTEUR DE MÉTHODE DE COMMANDE */}
              <div className="flex bg-stone-100 p-1 rounded-2xl text-xs font-semibold text-stone-700">
                <button
                  onClick={() => setCheckoutMode("whatsapp")}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    checkoutMode === "whatsapp" ? "bg-white text-stone-900 shadow font-bold" : "text-stone-500"
                  }`}
                >
                  WhatsApp (1 Clic)
                </button>
                <button
                  onClick={() => setCheckoutMode("form")}
                  className={`flex-1 py-2 rounded-xl transition-all ${
                    checkoutMode === "form" ? "bg-white text-stone-900 shadow font-bold" : "text-stone-500"
                  }`}
                >
                  Formulaire Cash
                </button>
              </div>

              {/* FORMULAIRE CASH ON DELIVERY */}
              {checkoutMode === "form" ? (
                <form onSubmit={handleFormSubmit} className="space-y-3 animate-fade-in text-xs">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Nom & Prénom"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      required
                      placeholder="Numéro de téléphone (ex: 06 63 04 64 46)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Adresse de livraison complète (Quartier, N°)"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Instructions pour le livreur (facultatif)"
                      rows={2}
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 px-4 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Valider &amp; Payer à la Livraison</span>
                  </button>
                </form>
              ) : (
                /* COMMANDE DIRECTE WHATSAPP */
                <div className="space-y-3">
                  <button
                    onClick={handleWhatsAppCheckout}
                    className="w-full py-4 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1ebd56] text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all"
                  >
                    <MessageCircle className="w-5 h-5 fill-white" />
                    <span>Commander sur WhatsApp en 1 Clic</span>
                  </button>
                  <p className="text-[11px] text-stone-500 text-center leading-snug">
                    Un récapitulatif complet de vos articles sera automatiquement généré et envoyé à notre artisan fleuriste sur WhatsApp.
                  </p>
                </div>
              )}

              {/* BADGES RÉASSURANCE */}
              <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 space-y-1.5">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Paiement en espèces lors de la livraison (Cash)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Truck className="w-3.5 h-3.5 text-brand-primary flex-shrink-0" />
                  <span>Livraison sécurisée et emballage isotherme</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
