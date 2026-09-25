import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./App.css";

export default function Order({ onBack }) {
  const formRef = useRef();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    zone: "Amizour",
    address: "",
    storeName: "",
    productDescription: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

const deliveryFees = {
    Amizour: 0,
    "El Kseur":0 ,
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
    setIsSubmitting(true);

    // Vos identifiants EmailJS intégrés
    const SERVICE_ID = "service_crh9nhh";
    const TEMPLATE_ID = "template_rtam7vv";
    const PUBLIC_KEY = "gbAHUCI8jA1A3DWbW";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(
        (result) => {
          console.log("Commande envoyée avec succès :", result.text);
          setIsSubmitting(false);
          setIsSubmitted(true);
        },
        (error) => {
          console.error("Erreur lors de l'envoi :", error.text);
          alert("Une erreur s'est produite lors de l'envoi. Veuillez réessayer.");
          setIsSubmitting(false);
        }
      );
  };

  if (isSubmitted) {
    return (
      <div className="order-container success-screen">
        <div className="success-card">
          <div className="success-icon">🎉</div>
          <h2>Commande transmise !</h2>
          <p>
            Merci <strong>{formData.fullName}</strong>. Votre commande a été envoyée par e-mail à notre équipe.
          </p>
          <div className="summary-box">
            <p><strong>Zone :</strong> {formData.zone}</p>
            <p><strong>Adresse :</strong> {formData.address}</p>
            <p><strong>Produits :</strong> {formData.productDescription}</p>
            <p><strong>Frais de livraison :</strong> {deliveryFees[formData.zone]} DZD</p>
          </div>
          <p className="confirmation-note">
            📞 Nous vous contacterons au <strong>{formData.phone}</strong> pour confirmer la livraison.
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

      <form ref={formRef} className="order-form" onSubmit={handleSubmit}>
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
            <label htmlFor="storeName">Magasin préféré (Optionnel)</label>
            <input
              type="text"
              id="storeName"
              name="storeName"
              placeholder="Ex: Superette Rahmani..."
              value={formData.storeName}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <fieldset className="form-section">
          <legend>📍 Coordonnées & Livraison</legend>

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
              required
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Adresse précise *</label>
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
            <label htmlFor="notes">Notes / Instructions (Optionnel)</label>
            <input
              type="text"
              id="notes"
              name="notes"
              placeholder="Ex: Appeler avant d'arriver..."
              value={formData.notes}
              onChange={handleChange}
            />
          </div>
        </fieldset>

        <div className="price-estimation">
          <span>Frais de livraison :</span>
          <strong>{deliveryFees[formData.zone]} DZD</strong>
        </div>

        <button type="submit" className="primary-btn submit-btn" disabled={isSubmitting}>
          {isSubmitting ? "Envoi en cours..." : "🚀 Confirmer la commande"}
        </button>
      </form>
    </div>
  );
}