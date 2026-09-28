"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { storeConfig } from "@/data/storeConfig";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(storeConfig.cities[0]);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);

  // Charger le panier depuis le localStorage au démarrage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("decomarc_cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Erreur lors de la récupération du panier:", e);
    }
  }, []);

  // Sauvegarder le panier à chaque modification
  useEffect(() => {
    try {
      localStorage.setItem("decomarc_cart", JSON.stringify(items));
    } catch (e) {
      console.error("Erreur de sauvegarde du panier:", e);
    }
  }, [items]);

  const addToCart = (product, quantity = 1, options = {}) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const newItems = [...prevItems];
        newItems[existingIndex].quantity += quantity;
        if (options.customMessage) newItems[existingIndex].customMessage = options.customMessage;
        if (options.deliveryDate) newItems[existingIndex].deliveryDate = options.deliveryDate;
        return newItems;
      } else {
        return [
          ...prevItems,
          {
            product,
            quantity,
            engravingText: options.engravingText || "",
            customMessage: options.customMessage || "",
            deliveryDate: options.deliveryDate || "",
            customDetails: options.customDetails || product.customDetails || null,
          },
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = items.length > 0 ? (selectedCity?.deliveryFee ?? 0) : 0;
  const total = subtotal + deliveryFee;

  // Génération du lien de commande WhatsApp en 1 clic
  const generateWhatsAppCheckoutLink = (customerInfo = {}) => {
    if (items.length === 0) return `https://wa.me/${storeConfig.whatsappNumber}`;

    let msg = `Bonjour *Rymas Jewelry* ! 👋\n`;
    msg += `Je souhaite commander ce bijou / coffret en Or 18K depuis votre site :\n\n`;
    msg += `🛍️ *DÉTAIL DE LA COMMANDE :*\n`;

    items.forEach((item, index) => {
      msg += `• ${item.quantity}x *${item.product.name}* — ${item.product.price * item.quantity} Dhs\n`;
      if (item.engravingText) msg += `  ✍️ Gravure prénom/date : *${item.engravingText}*\n`;
      if (item.customDetails) {
        if (item.customDetails.boxColor) msg += `  🎁 Couleur boîte : ${item.customDetails.boxColor}\n`;
        if (item.customDetails.addons?.length) msg += `  🌸 Compléments : ${item.customDetails.addons.join(", ")}\n`;
      }
      if (item.deliveryDate) msg += `  📅 Date souhaitée : ${item.deliveryDate}\n`;
      if (item.customMessage) msg += `  💌 Mot pour la carte : "${item.customMessage}"\n`;
    });

    msg += `\n📍 *Ville de livraison :* ${selectedCity.name} (${deliveryFee === 0 ? "Gratuit" : `${deliveryFee} Dhs`})\n`;
    msg += `💰 *TOTAL À PAYER :* *${total} Dhs* (Paiement à la livraison après vérification)\n\n`;

    if (customerInfo.name || customerInfo.phone || customerInfo.address) {
      msg += `👤 *MES COORDONNÉES :*\n`;
      if (customerInfo.name) msg += `• Nom : ${customerInfo.name}\n`;
      if (customerInfo.phone) msg += `• Téléphone : ${customerInfo.phone}\n`;
      if (customerInfo.address) msg += `• Adresse précise : ${customerInfo.address}\n`;
    }

    msg += `\nMerci de me confirmer la préparation de mon bijou avec certificat ! ✨`;

    return `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  // Commande directe d'un seul produit via WhatsApp (1 clic depuis la fiche produit)
  const generateDirectProductWhatsAppLink = (product, quantity = 1, options = {}) => {
    let msg = `Bonjour *Rymas Jewelry* ! 👋\n\n`;
    msg += `Je souhaite commander cet article en Or 18K vu sur votre site web :\n`;
    msg += `🎁 *${product.name}*\n`;
    if (product.goldWeight) msg += `✨ *Or 18K Garanti :* ${product.goldWeight}\n`;
    msg += `💵 *Prix :* ${product.price} Dhs (Quantité : ${quantity})\n`;
    if (options.engravingText) msg += `✍️ *Gravure souhaitée :* ${options.engravingText}\n`;
    if (options.deliveryDate) msg += `📅 *Date de livraison souhaitée :* ${options.deliveryDate}\n`;
    if (options.city) msg += `📍 *Ville :* ${options.city}\n`;
    if (options.customMessage) msg += `💌 *Mot pour la carte offerte :* "${options.customMessage}"\n`;
    msg += `\nPouvez-vous me confirmer la disponibilité et la préparation du certificat ? Merci ! 👑`;

    return `https://wa.me/${storeConfig.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        selectedCity,
        setSelectedCity,
        subtotal,
        deliveryFee,
        total,
        totalItemsCount,
        generateWhatsAppCheckoutLink,
        generateDirectProductWhatsAppLink,
        selectedProductForModal,
        setSelectedProductForModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
