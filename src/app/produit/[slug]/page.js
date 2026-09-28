"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";
import { storeConfig } from "@/data/storeConfig";
import { useCart } from "@/context/CartContext";
import {
  Star,
  Check,
  Truck,
  ShieldCheck,
  MessageCircle,
  ShoppingBag,
  Heart,
  Calendar,
  MapPin,
  ChevronRight,
  Share2,
  Sparkles,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  const product = products.find((p) => p.slug === slug || p.id === slug);
  if (!product) {
    notFound();
  }

  const { addToCart, generateDirectProductWhatsAppLink } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [engravingText, setEngravingText] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [selectedCity, setSelectedCity] = useState(storeConfig.cities[0].name);
  const [activeTab, setActiveTab] = useState("description");
  const [isCopied, setIsCopied] = useState(false);

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.image, product.secondaryImage].filter(Boolean);

  const categoryObj = categories.find((c) => c.id === product.category);

  // Produits similaires
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.isFeatured))
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity, { engravingText, customMessage, deliveryDate, city: selectedCity });
  };

  const handleWhatsAppOrder = () => {
    const link = generateDirectProductWhatsAppLink(product, quantity, {
      engravingText,
      customMessage,
      deliveryDate,
      city: selectedCity,
    });
    window.open(link, "_blank");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  // Données structurées JSON-LD pour Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: images,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Rymas Jewelry",
    },
    offers: {
      "@type": "Offer",
      url: `https://rymas-jewelry.ma/produit/${product.slug}`,
      priceCurrency: "MAD",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating || "5.0",
      reviewCount: product.reviewsCount || "35",
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 w-full">
        {/* 1. FIL D'ARIANE (BREADCRUMB) */}
        <nav className="flex items-center space-x-2 text-xs text-stone-500 mb-6 overflow-x-auto no-scrollbar py-1">
          <Link href="/" className="hover:text-brand-primary transition-colors">
            Accueil
          </Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <Link href="/catalogue" className="hover:text-brand-primary transition-colors">
            Catalogue
          </Link>
          {categoryObj && (
            <>
              <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              <Link
                href={`/categories/${categoryObj.slug}`}
                className="hover:text-brand-primary transition-colors whitespace-nowrap"
              >
                {categoryObj.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="text-stone-900 font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* 2. FICHE PRODUIT : GALERIE + INFOS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start bg-white p-4 sm:p-8 rounded-3xl border border-stone-200/80 shadow-sm">
          {/* COLONNE GAUCHE : GALERIE D'IMAGES */}
          <div className="space-y-4">
            {/* Image Principale */}
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-stone-100 shadow-inner group">
              <Image
                src={images[activeImageIndex] || product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {product.badge && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-xs font-bold uppercase tracking-wider bg-stone-900/90 backdrop-blur-md text-amber-300 px-3 py-1.5 rounded-full shadow-md">
                    {product.badge}
                  </span>
                </div>
              )}
              {/* Bouton Partager */}
              <button
                onClick={handleShare}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-stone-700 shadow-md transition-all"
                title="Copier le lien du produit"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {isCopied && (
                <div className="absolute top-16 right-4 bg-stone-900 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow animate-fade-in">
                  Lien copié !
                </div>
              )}
            </div>

            {/* Miniatures d'images */}
            {images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto no-scrollbar pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImageIndex === i
                        ? "border-brand-primary ring-2 ring-brand-primary/20 scale-102"
                        : "border-stone-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`${product.name} vue ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* COLONNE DROITE : DÉTAILS, PRIX & COMMANDES */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-700">{product.rating} / 5</span>
                <span className="text-xs text-stone-400">({product.reviewsCount} avis clients vérifiés)</span>
              </div>

              <h1 className="text-xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                {product.name}
              </h1>

              {product.occasion && (
                <p className="text-xs text-brand-primary font-medium mt-1 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Parfait pour : {product.occasion}</span>
                </p>
              )}
            </div>

            {/* PRIX */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100 flex items-baseline justify-between">
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl sm:text-4xl font-black text-brand-primary">
                  {product.price} <span className="text-base font-semibold">{storeConfig.currency}</span>
                </span>
                {product.oldPrice && (
                  <span className="text-sm sm:text-base text-stone-400 line-through">
                    {product.oldPrice} {storeConfig.currency}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Fleurs Fraîches en Stock
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {product.description}
            </p>

            {/* ÉLÉMENTS INCLUS DANS CE COFFRET */}
            {product.includes && (
              <div className="space-y-2 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Ce qui est inclus dans votre commande :
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {product.includes.map((inc, i) => (
                    <div key={i} className="flex items-center space-x-2 text-stone-700">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FORMULAIRE DE PERSONNALISATION */}
            <div className="border-t border-stone-100 pt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Ville de livraison */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Ville de livraison :</span>
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-brand-primary"
                  >
                    {storeConfig.cities.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.name} (+{c.deliveryFee} Dhs)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date souhaitée */}
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Date souhaitée :</span>
                  </label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              {/* Gravure prénom & date offerte si produit éligible */}
              {(product.engravingFree || product.category === "gourmettes" || product.isPack) && (
                <div>
                  <label className="block text-xs font-semibold text-amber-900 mb-1 flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Prénom &amp; date de naissance à graver sur le bijou (Offert) :</span>
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

              {/* Message de la carte offerte */}
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1 flex items-center space-x-1">
                  <Heart className="w-3.5 h-3.5 text-amber-700 fill-amber-700" />
                  <span>Mot doux pour la carte offerte manuscrite :</span>
                </label>
                <textarea
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Ex: Bienvenue au monde petit ange ! Félicitations aux heureux parents..."
                  rows={2}
                  className="w-full text-xs p-3 rounded-xl border border-stone-200 bg-stone-50 focus:bg-white focus:outline-none focus:border-amber-600 resize-none"
                />
              </div>

              {/* Sélecteur de Quantité */}
              <div className="flex items-center space-x-4 pt-1">
                <span className="text-xs font-semibold text-stone-700">Quantité :</span>
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-sm font-bold text-stone-600 hover:text-stone-900"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-1.5 text-sm font-bold text-stone-600 hover:text-stone-900"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* BOUTONS D'ACHAT PRINCIPAUX */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3.5 px-5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Ajouter au Panier</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#25D366] hover:bg-[#1ebd56] text-white text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-transform hover:scale-102"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Commander sur WhatsApp</span>
                </button>
              </div>

              {/* RÉASSURANCE EXPRESS */}
              <div className="grid grid-cols-2 gap-2 pt-3 text-[11px] text-stone-500">
                <div className="flex items-center space-x-1.5">
                  <Truck className="w-3.5 h-3.5 text-brand-primary flex-shrink-0" />
                  <span>Livraison 2h à 24h au Maroc</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>Paiement à la livraison (Cash)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. ONGLETS DE DÉTAILS & CONSEILS */}
        <div className="mt-10 bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 shadow-sm">
          <div className="flex space-x-4 border-b border-stone-100 pb-3 text-xs sm:text-sm font-bold uppercase tracking-wider overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("description")}
              className={`pb-2 transition-all whitespace-nowrap ${
                activeTab === "description"
                  ? "border-b-2 border-brand-primary text-brand-primary"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              Description Détaillée
            </button>
            <button
              onClick={() => setActiveTab("livraison")}
              className={`pb-2 transition-all whitespace-nowrap ${
                activeTab === "livraison"
                  ? "border-b-2 border-brand-primary text-brand-primary"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              Livraison &amp; Villes
            </button>
            <button
              onClick={() => setActiveTab("conseils")}
              className={`pb-2 transition-all whitespace-nowrap ${
                activeTab === "conseils"
                  ? "border-b-2 border-brand-primary text-brand-primary"
                  : "text-stone-400 hover:text-stone-700"
              }`}
            >
              Entretien &amp; Garantie Or 18K
            </button>
          </div>

          <div className="pt-5 text-xs sm:text-sm text-stone-600 leading-relaxed">
            {activeTab === "description" && (
              <div className="space-y-3">
                <p>{product.description}</p>
                <p>
                  Chaque création <strong>Rymas Jewelry</strong> est confectionnée en or 18 carats véritable certifié (750‰) par des maîtres artisans joailliers au Maroc. Nous apportons un soin minutieux aux finitions douces et sécurisées spécialement adaptées aux bébés et enfants.
                </p>
                {product.goldWeight && (
                  <p><strong>Poids d&apos;or :</strong> {product.goldWeight}.</p>
                )}
              </div>
            )}

            {activeTab === "livraison" && (
              <div className="space-y-3">
                <p>
                  <strong>Casablanca :</strong> Livraison express sécurisée sous 24h avec remise en main propre et vérification du colis.
                </p>
                <p>
                  <strong>Rabat, Marrakech, Tanger, Fès, Meknès, Agadir et toutes les villes du Maroc :</strong> Expédition sous 24h à 48h dans un colis scellé et assuré avec suivi en temps réel par SMS et WhatsApp.
                </p>
                <p>
                  <strong>Paiement :</strong> Vous pouvez régler en espèces à la livraison (Cash on Delivery) en toute confiance lors de la remise en main propre de votre écrin.
                </p>
              </div>
            )}

            {activeTab === "conseils" && (
              <div className="space-y-3">
                <p>
                  1. <strong>Nettoyage délicat :</strong> Nettoyez le bijou à l&apos;eau tiède savonneuse avec un chiffon doux non abrasif pour conserver toute sa brillance.
                </p>
                <p>
                  2. <strong>Fermoirs de sécurité à vis :</strong> Vérifiez périodiquement le serrage du fermoir à vis pour les boucles d&apos;oreilles.
                </p>
                <p>
                  3. <strong>Rangement :</strong> Conservez le bijou dans son écrin de protection Rymas d&apos;origine pour éviter tout frottement.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 4. PRODUITS SIMILAIRES */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                Suggestions Rymas Jewelry
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 mt-1">
                Vous Aimerez Aussi
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
