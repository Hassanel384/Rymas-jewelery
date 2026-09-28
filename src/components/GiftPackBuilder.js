"use client";

import React, { useState } from "react";
import { Sparkles, Gift, Check, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { storeConfig } from "@/data/storeConfig";

export default function GiftPackBuilder() {
  const { addToCart } = useCart();

  // Étape 1 : Choix du Bijou Or 18K
  const jewelryOptions = [
    {
      id: "j-gourmette",
      name: "Gourmette Bébé Or 18K (Plaque Lisse)",
      basePrice: 1350,
      gold: "1.45g Or 18K",
      age: "0-3 ans",
      image: "/images/bracelets-gourmettes/gourmette-bebe-leo-lifestyle.jpg",
    },
    {
      id: "j-boucles",
      name: "Boucles d'Oreilles Bébé Fermoir à Vis Or 18K",
      basePrice: 990,
      gold: "0.95g Or 18K",
      age: "0-5 ans",
      image: "/images/boucles-oreilles/boucles-daisy-bebe-lifestyle.jpg",
    },
    {
      id: "j-khmissa",
      name: "Pendentif Médaille Khmissa Protection Or 18K",
      basePrice: 890,
      gold: "1.20g Or 18K",
      age: "0-10 ans",
      image: "/images/pendentifs-medailles/pendentif-ange-bapteme-lifestyle.jpg",
    },
    {
      id: "j-cordon",
      name: "Bracelet Cordon Réglable Or 18K (Nuage/Étoile)",
      basePrice: 590,
      gold: "0.75g Or 18K",
      age: "0-10 ans",
      image: "/images/bracelets-gourmettes/cordon-khmissa-boules-1.webp",
    },
  ];

  // Étape 2 : Accompagnements Cadeaux
  const addOnOptions = [
    {
      id: "addon-rose",
      name: "Rose Éternelle Rouge sous Cloche (Dure 3 ans)",
      price: 250,
      desc: "Véritable rose naturelle stabilisée sans entretien",
    },
    {
      id: "addon-chocolat",
      name: "Boîte 350g Chocolats Belges & Dragées Dorées",
      price: 190,
      desc: "Pur beurre de cacao & amandes d'Avola",
    },
    {
      id: "addon-doudou",
      name: "Doudou Lange Gaze de Coton Bio (Norme CE)",
      price: 120,
      desc: "Matière hypoallergénique ultra douce pour nouveau-né",
    },
  ];

  // États du configurateur
  const [selectedJewelry, setSelectedJewelry] = useState(jewelryOptions[0]);
  const [selectedAddons, setSelectedAddons] = useState(["addon-rose", "addon-chocolat"]);
  const [boxColor, setBoxColor] = useState("rose"); // 'rose', 'bleu', 'creme'
  const [engravingText, setEngravingText] = useState("");
  const [cardMessage, setCardMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Calcul du prix total
  const addonsTotal = selectedAddons.reduce((acc, id) => {
    const item = addOnOptions.find((a) => a.id === id);
    return acc + (item ? item.price : 0);
  }, 0);

  const totalPrice = selectedJewelry.basePrice + addonsTotal;

  const toggleAddon = (id) => {
    if (selectedAddons.includes(id)) {
      setSelectedAddons(selectedAddons.filter((item) => item !== id));
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  const handleAddPackToCart = () => {
    const packProduct = {
      id: `custom-pack-${Date.now()}`,
      slug: `coffret-sur-mesure-${Date.now()}`,
      name: `Coffret Cadeau Sur-Mesure (${selectedJewelry.name})`,
      price: totalPrice,
      image: selectedJewelry.image,
      category: "packs-cadeaux",
      customDetails: {
        jewelry: selectedJewelry.name,
        gold: selectedJewelry.gold,
        boxColor: boxColor,
        engravingText: engravingText || "Sans gravure",
        cardMessage: cardMessage || "Félicitations aux heureux parents",
        addons: selectedAddons.map((id) => addOnOptions.find((a) => a.id === id)?.name),
      },
    };

    addToCart(packProduct, 1);
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 2500);
  };

  return (
    <section className="bg-gradient-to-b from-amber-50/70 via-stone-50 to-white py-12 px-4 sm:px-6 lg:px-8 rounded-3xl border border-amber-200/60 shadow-subtle my-12">
      <div className="max-w-5xl mx-auto">
        {/* Titre & Accroche */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Atelier Cadeaux Personnalisés</span>
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Composez Votre Coffret Bébé Sur-Mesure
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2">
            Associez le bijou en or 18 carats de votre choix avec des roses éternelles, des chocolats fins et une gravure personnalisée dans un écrin de luxe.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ÉTAPES DE CONFIGURATION */}
          <div className="lg:col-span-7 space-y-8">
            {/* ÉTAPE 1 : CHOISIR LE BIJOU */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-4 pb-2 border-b border-stone-100">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold">
                  1
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  Sélectionnez le bijou en Or 18K
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {jewelryOptions.map((jewel) => {
                  const isSelected = selectedJewelry.id === jewel.id;
                  return (
                    <div
                      key={jewel.id}
                      onClick={() => setSelectedJewelry(jewel)}
                      className={`cursor-pointer p-3 rounded-xl border transition-all flex items-center space-x-3 ${
                        isSelected
                          ? "border-amber-600 bg-amber-50/50 ring-1 ring-amber-600"
                          : "border-stone-200 hover:border-amber-300 bg-white"
                      }`}
                    >
                      <img
                        src={jewel.image}
                        alt={jewel.name}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold text-stone-900 truncate">
                          {jewel.name}
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {jewel.gold} • {jewel.age}
                        </div>
                        <div className="text-xs font-bold text-amber-700 mt-0.5">
                          {jewel.basePrice} {storeConfig.currency}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ÉTAPE 2 : CHOISIR LES COMPLÉMENTS CADEAUX */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-4 pb-2 border-b border-stone-100">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold">
                  2
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  Ajoutez les douceurs &amp; souvenirs
                </h3>
              </div>

              <div className="space-y-2.5">
                {addOnOptions.map((addon) => {
                  const checked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${
                        checked
                          ? "border-amber-600 bg-amber-50/40"
                          : "border-stone-200 hover:border-stone-300 bg-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                            checked
                              ? "bg-amber-600 border-amber-600 text-white"
                              : "border-stone-300 bg-white"
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-900">
                            {addon.name}
                          </div>
                          <div className="text-[11px] text-stone-500">
                            {addon.desc}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-stone-900">
                        +{addon.price} {storeConfig.currency}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ÉTAPE 3 : PERSONNALISATION (COULEUR ÉCRIN, GRAVURE & MOT DOUX) */}
            <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-sm">
              <div className="flex items-center space-x-2.5 mb-4 pb-2 border-b border-stone-100">
                <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-xs font-bold">
                  3
                </span>
                <h3 className="font-serif font-bold text-stone-900 text-base">
                  Personnalisation &amp; Finitions Royales
                </h3>
              </div>

              <div className="space-y-4">
                {/* Couleur de l'écrin */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-2">
                    Couleur de la boîte &amp; du ruban de satin :
                  </label>
                  <div className="flex space-x-3">
                    {[
                      { id: "rose", label: "Rose Poudré", bg: "bg-rose-200 border-rose-300" },
                      { id: "bleu", label: "Bleu Céleste", bg: "bg-sky-200 border-sky-300" },
                      { id: "creme", label: "Blanc Nacré & Or", bg: "bg-amber-100 border-amber-300" },
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setBoxColor(c.id)}
                        className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center space-x-2 transition-all ${
                          boxColor === c.id
                            ? "ring-2 ring-stone-900 font-bold"
                            : "opacity-80 hover:opacity-100"
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 rounded-full ${c.bg} border`} />
                        <span>{c.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Texte de gravure */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Prénom &amp; date à graver sur le bijou (Offert) :
                  </label>
                  <input
                    type="text"
                    value={engravingText}
                    onChange={(e) => setEngravingText(e.target.value)}
                    placeholder="Ex: Adam - 12.04.2026 ou Sofia ♡"
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* Mot pour la carte cadeau */}
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Message manuscrit calligraphié pour les parents :
                  </label>
                  <textarea
                    rows={2}
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    placeholder="Ex: Bienvenue à la petite princesse ! Tous nos vœux de bonheur..."
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RÉCAPITULATIF & VALIDATION EN DIRECT */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-stone-900 text-white p-6 rounded-3xl shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div className="flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-amber-400" />
                  <span className="font-serif font-bold text-lg">Votre Coffret Cadeau</span>
                </div>
                <span className="text-[11px] uppercase tracking-wider bg-amber-400/20 text-amber-300 font-bold px-2.5 py-0.5 rounded-full">
                  Prêt à offrir
                </span>
              </div>

              {/* Détails du pack */}
              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center text-stone-300">
                  <span>Bijou : {selectedJewelry.name}</span>
                  <span className="font-bold text-white">{selectedJewelry.basePrice} {storeConfig.currency}</span>
                </div>

                <div className="text-[11px] text-amber-300 pl-2 border-l border-amber-500/40">
                  {selectedJewelry.gold} • Poinçon officiel d'État inclus
                </div>

                {selectedAddons.length > 0 && (
                  <div className="pt-2 border-t border-stone-800 space-y-1.5">
                    <span className="text-stone-400 text-[11px] uppercase font-bold tracking-wider">
                      Accompagnements inclus :
                    </span>
                    {selectedAddons.map((id) => {
                      const item = addOnOptions.find((a) => a.id === id);
                      return (
                        <div key={id} className="flex justify-between text-stone-300 pl-2">
                          <span>• {item?.name}</span>
                          <span className="text-white font-medium">+{item?.price} {storeConfig.currency}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="pt-2 border-t border-stone-800 space-y-1">
                  <div className="text-stone-400 text-[11px]">
                    Boîte : <span className="text-white font-semibold capitalize">{boxColor}</span>
                  </div>
                  {engravingText && (
                    <div className="text-stone-400 text-[11px]">
                      Gravure : <span className="text-amber-300 font-semibold">{engravingText}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Total & Bouton d'ajout */}
              <div className="pt-4 border-t border-stone-800 space-y-4">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-xs text-stone-400 block">Prix total du pack :</span>
                    <span className="text-2xl sm:text-3xl font-serif font-black text-amber-400">
                      {totalPrice} {storeConfig.currency}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-light">
                    Livraison gratuite 24h
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleAddPackToCart}
                  className={`w-full py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center space-x-2 transition-all ${
                    isSuccess
                      ? "bg-emerald-600 text-white"
                      : "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 shadow-lg hover:scale-[1.02]"
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <Check className="w-5 h-5 text-white" />
                      <span>Pack ajouté au panier !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-stone-950" />
                      <span>Ajouter ce Pack sur-mesure au panier</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
