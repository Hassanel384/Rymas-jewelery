"use client";

import React, { useState } from "react";
import { storeConfig } from "@/data/storeConfig";
import { MessageCircle, X } from "lucide-react";

export default function WhatsAppFloat() {
  const [isTooltipVisible, setIsTooltipVisible] = useState(true);

  return (
    <div className="fixed bottom-16 md:bottom-6 right-4 md:right-6 z-40 flex flex-col items-end space-y-2">
      {/* Bulle d'accueil engageante */}
      {isTooltipVisible && (
        <div className="bg-white rounded-2xl p-3 shadow-xl border border-stone-100 max-w-[220px] text-xs animate-fade-in relative">
          <button
            onClick={() => setIsTooltipVisible(false)}
            className="absolute top-1.5 right-1.5 text-stone-400 hover:text-stone-700"
            aria-label="Fermer le message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center space-x-1 text-emerald-600 font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>Conseiller Joaillier</span>
          </div>
          <p className="text-stone-700 text-[11px] leading-snug">
            Bonjour ! Besoin d'un conseil pour la gravure ou le choix d'un bijou en or 18k ? Écrivez-nous ✨
          </p>
        </div>
      )}

      {/* Bouton Rond WhatsApp */}
      <a
        href={`https://wa.me/${storeConfig.whatsappNumber}?text=Bonjour%20Rymas%20Jewelry%2C%20j%27aimerais%20avoir%20des%20conseils%20pour%20un%20cadeau%20en%20or%2018k`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#1ebd56] text-white shadow-floating flex items-center justify-center transition-transform hover:scale-110 active:scale-95"
        aria-label="Discuter sur WhatsApp"
      >
        <MessageCircle className="w-7 h-7 fill-white" />
      </a>
    </div>
  );
}
