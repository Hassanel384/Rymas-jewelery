"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { storeConfig } from "@/data/storeConfig";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Commande sur-mesure");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Redirection WhatsApp pré-remplie
    const text = `Bonjour *Decowin*, nouveau message de contact :\n• Nom : ${name}\n• Téléphone : ${phone}\n• Sujet : ${subject}\n• Message : ${message}`;
    const url = `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
    setTimeout(() => {
      window.open(url, "_blank");
    }, 1200);
  };

  const faqs = [
    {
      q: "Quels sont vos délais de livraison ?",
      a: "À Casablanca, nous livrons sous 2h à 4h ou selon le créneau de votre choix. Pour Rabat, Marrakech, Tanger, Fès, Meknès et Agadir, la livraison est garantie sous 24h dans un emballage thermique protecteur.",
    },
    {
      q: "Comment fonctionne le paiement à la livraison ?",
      a: "Vous réglez en espèces (Cash on Delivery) directement au livreur lors de la réception de vos fleurs et chocolats. Vous pouvez également opter pour un virement bancaire sur simple demande.",
    },
    {
      q: "La carte personnalisée est-elle gratuite ?",
      a: "Oui, absolument ! Chaque commande Decowin comprend une carte de vœux manuscrite de haute qualité sur laquelle nous calligraphions le mot doux ou de félicitations de votre choix.",
    },
    {
      q: "Proposez-vous la décoration florale de voiture de mariage ?",
      a: "Oui, nos fleuristes se déplacent à votre domicile ou salle des fêtes à Casablanca et environs pour installer la décoration florale complète sur ventouses protectrices (capot, poignées, rubans).",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <Header />

      <main className="flex-1 w-full py-8 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
            Service Client Dédié
          </span>
          <h1 className="text-2xl sm:text-4xl font-serif font-bold text-stone-900 mt-1">
            Contactez la Maison Decowin
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-2">
            Une question sur un bouquet, une demande pour un mariage ou un événement sur-mesure ? Notre équipe d'artisans est à votre écoute 7 jours sur 7.
          </p>
        </div>

        {/* 1. GRILLE COORDONNÉES + FORMULAIRE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* COLONNE GAUCHE : COORDONNÉES */}
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-stone-200/80 shadow-sm space-y-5">
              <h2 className="text-base font-serif font-bold text-stone-900 border-b border-stone-100 pb-3">
                Coordonnées &amp; Horaires
              </h2>

              <div className="space-y-4 text-xs text-stone-600">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-brand-primary flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">Atelier Floral</p>
                    <p className="text-stone-500 leading-snug">{storeConfig.address}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-brand-primary flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">Téléphone Direct</p>
                    <a href={`tel:${storeConfig.phone}`} className="text-brand-primary font-bold hover:underline">
                      {storeConfig.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 text-brand-primary flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">Email</p>
                    <a href={`mailto:${storeConfig.email}`} className="text-stone-700 hover:underline">
                      {storeConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-stone-900">Horaires d'Ouverture</p>
                    <p className="text-stone-500">{storeConfig.openingHours}</p>
                  </div>
                </div>
              </div>

              {/* Bouton WhatsApp direct */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${storeConfig.whatsappNumber}?text=Bonjour%20Decowin%2C%20je%20souhaite%20un%20renseignement`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#1ebd56] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Discussion WhatsApp Directe</span>
                </a>
              </div>
            </div>
          </div>

          {/* COLONNE DROITE : FORMULAIRE DE CONTACT */}
          <div className="lg:col-span-2 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm">
            <h2 className="text-xl font-serif font-bold text-stone-900 mb-2">
              Envoyez-nous un Message
            </h2>
            <p className="text-xs text-stone-500 mb-6">
              Remplissez le formulaire ci-dessous. Notre équipe vous répondra dans les plus brefs délais ou vous contactera directement sur WhatsApp.
            </p>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-3 animate-fade-in">
                <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Message Transmis avec Succès !
                </h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Merci {name}, votre demande a bien été envoyée. Vous allez être redirigé vers WhatsApp pour finaliser votre échange avec notre fleuriste.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Votre Nom &amp; Prénom *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: Sara El Amrani"
                      className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Numéro de Téléphone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Ex: 06 63 04 64 46"
                      className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Adresse Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">
                      Objet de votre demande
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary font-medium"
                    >
                      <option value="Commande sur-mesure">Composition florale sur-mesure</option>
                      <option value="Pack Fiançailles / Mariage">Pack Fiançailles ou Mariage</option>
                      <option value="Décoration Voiture">Décoration de voiture des mariés</option>
                      <option value="Suivi de commande">Suivi de ma commande en cours</option>
                      <option value="Autre demande">Autre demande spéciale</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    Votre Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Précisez votre demande, vos fleurs préférées, la ville ou la date souhaitée..."
                    className="w-full p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-brand-primary resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer ma demande</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* 2. SECTION FAQ */}
        <section className="mt-16 bg-white p-6 sm:p-10 rounded-3xl border border-stone-200/80 shadow-sm max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <HelpCircle className="w-8 h-8 text-brand-primary mx-auto mb-2" />
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
              Questions Fréquemment Posées
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-stone-100 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-stone-900 bg-stone-50/60 hover:bg-stone-50"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-stone-500 transition-transform ${
                      openFaq === i ? "rotate-180 text-brand-primary" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="p-4 bg-white text-xs text-stone-600 leading-relaxed border-t border-stone-100 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
