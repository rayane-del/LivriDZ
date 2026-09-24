import React, { useState } from "react";
import "./Order.css"; // Créez ce fichier pour les styles spécifiques si besoin

export default function Order({ onBack }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    zone: "Amizour", // Valeur par défaut
    address: "",
    storeName: "",
    productDescription: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Tarifs de livraison personnalisés par zone
  const deliveryFees = {
    Amizour: 200,
    "El Kseur": 250,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Ici, vous ajouterez l'envoi vers un backend, Supabase, Firebase ou une API WhatsApp
    console.log("Commande envoyée :", formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="order-container success-screen">
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h2>Commande enregistrée !</h2>
          <p>
            Merci <strong>{formData.fullName}</strong>. Votre commande a bien été reçue.
          </p>
          <div className="summary-box">
            <p><strong>Zone :</strong> {formData.zone}</p>
            <p><strong>Adresse :</strong> {formData.address}</p>
            <p><strong>Produit :</strong> {formData.productDescription}</p>
            <p><strong>Frais de livraison estimés :</strong> {deliveryFees[formData.zone]} DZD</p>
          </div>
          <p className="confirmation-note">
            📞 Nous vous contacterons au <strong>{formData.phone}</strong> pour confirmer le prix total.
          </p>
          <button className="primary-btn" onClick={onBack}>
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-container">
      <div className="order-header">
        <button className="back-btn" onClick={onBack}>
          ← Retour
        </button>
        <h2>Passer une commande</h2>
      </div>

      <form className="order-form" onSubmit={handleSubmit}>
        {/* SECTION 1: DÉTAILS DE LA COMMANDE */}
        <fieldset className="form-section">
          <legend>🛍️ Que souhaitez-vous commander ?</legend>

          <div className="form-group">
            <label htmlFor="productDescription">Produit(s) à acheter *</label>
            <textarea
              id="productDescription"
              name="productDescription"
              rows="3"
              placeholder="Ex: 1x Pack d'eau, 2kg d'oranges, Pain..."
              required
              value={formData.productDescription}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="storeName">Magasin ou magasin préféré (Optionnel)</label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              placeholder="Ex: Superette Rahmani, Pharmacie du centre..."
              value={formData.storeName}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* SECTION 2: LIVRAISON & COORDONNÉES */}
        <fieldset className="form-section">
          <legend>📍 Où devons-nous livrer ?</legend>

          <div className="form-group">
            <label htmlFor="fullName">Nom et Prénom *</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Votre nom complet"
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Numéro de téléphone *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="06 XX XX XX XX"
              pattern="[0-9]{10}"
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="zone">Zone de livraison *</label>
            <select
              id="zone"
              name="zone"
              value={formData.zone}
              onChange={handleChange}
            >
              <option value="Amizour">Amizour (200 DZD)</option>
              <option value="El Kseur">El Kseur (250 DZD)</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="address">Adresse précise de livraison *</label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Ex: Quartier AADL, Bloc 4, N° 12"
              required
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Remarques pour le livreur (Optionnel)</label>
            <input
              type="text"
              id="notes"
              name="notes"
              placeholder="Ex: Appeler avant d'arriver, sonnerie en panne..."
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        {/* RÉCAPITULATIF PRIX LIVRAISON */}
        <div className="price-estimation">
          <span>Frais de livraison :</span>
          <strong>{deliveryFees[formData.zone]} DZD</strong>
        </div>

        {/* BOUTON D'ENVOI */}
        <button type="submit" className="primary-btn submit-btn">
          🚀 Confirmer la commande
        </button>
      </form>
    </div>
  );
}