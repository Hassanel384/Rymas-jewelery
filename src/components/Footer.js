"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { storeConfig } from "@/data/storeConfig";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-24 md:pb-12 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* 1. PRÉSENTATION DE LA MARQUE */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 flex-shrink-0 p-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <Image
                  src="/images/logo-transparent.png"
                  alt="Rymas Jewelry Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-serif font-black text-white tracking-tight leading-tight block">
                  RYMAS <span className="text-amber-500 font-light">JEWELRY</span>
                </span>
                <p className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-bold mt-0.5">
                  {storeConfig.tagline}
                </p>
              </div>
            </div>
            <p className="text-stone-400 leading-relaxed text-xs">
              Maison de joaillerie d'exception dédiée aux tout-petits (0 à 10 ans). Nous façonnons des bijoux en or 18 carats poinçonnés et composons des coffrets cadeaux féeriques mariant roses éternelles durables (3 ans), chocolats fins belges et souvenirs inoubliables.
            </p>
            <div className="flex items-center space-x-2 text-amber-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Or 18K officiel (750‰) • Certificat inclus</span>
            </div>
          </div>

          {/* 2. CATÉGORIES POPULAIRES */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Nos Univers Précieux
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <Link href="/categories/packs-cadeaux" className="hover:text-amber-400 transition-colors">
                  🎁 Packs Cadeaux (Fleurs &amp; Chocolats)
                </Link>
              </li>
              <li>
                <Link href="/categories/gourmettes" className="hover:text-amber-400 transition-colors">
                  🏷️ Gourmettes d'Identité Gravées
                </Link>
              </li>
              <li>
                <Link href="/categories/boucles-oreilles" className="hover:text-amber-400 transition-colors">
                  💎 Boucles d'Oreilles Fermoir à Vis
                </Link>
              </li>
              <li>
                <Link href="/categories/pendentifs-medailles" className="hover:text-amber-400 transition-colors">
                  🪬 Médailles &amp; Pendentifs Khmissa
                </Link>
              </li>
              <li>
                <Link href="/categories/bracelets-cordons" className="hover:text-amber-400 transition-colors">
                  🧵 Bracelets Cordons Réglables (0-10 ans)
                </Link>
              </li>
              <li>
                <Link href="/categories/epingles-bebe" className="hover:text-amber-400 transition-colors">
                  🧷 Épingles de Berceau Traditionnelles
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. GUIDES & ENGAGEMENTS */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Nos Engagements Joaillerie
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li className="flex items-start space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Poinçon officiel d'État sur chaque bijou</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Fermoirs sécurisés hypoallergéniques</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Gravure prénom &amp; date de naissance offerte</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Écrin cadeau et carte manuscrite inclus</span>
              </li>
              <li className="flex items-start space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Vérification de l'article avant règlement</span>
              </li>
            </ul>
          </div>

          {/* 4. ATELIER & CONTACT CLIENT */}
          <div className="space-y-3">
            <h4 className="text-white text-xs font-bold uppercase tracking-wider">
              Atelier &amp; Contact
            </h4>
            <div className="space-y-2.5 text-stone-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`tel:${storeConfig.phone}`} className="hover:text-white">
                  {storeConfig.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`mailto:${storeConfig.email}`} className="hover:text-white">
                  {storeConfig.email}
                </a>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{storeConfig.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{storeConfig.openingHours}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}?text=Bonjour%20Rymas%20Jewelry`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebd56] text-white font-bold transition-colors shadow-sm"
              >
                <span>Commander sur WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* MENTIONS LÉGALES & COPYRIGHT */}
        <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row items-center justify-between text-stone-500 text-[11px] gap-3">
          <p>© {new Date().getFullYear()} {storeConfig.name}. Tous droits réservés. Spécialiste Joaillerie Bébé &amp; Coffrets Naissance Or 18K.</p>
          <div className="flex items-center space-x-4">
            <span>Paiement sécurisé à la livraison partout au Maroc</span>
            <span>•</span>
            <span className="flex items-center space-x-1 text-stone-400">
              <span>Façonné avec</span>
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
              <span>pour vos enfants</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
