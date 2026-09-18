import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Order.css";

function Order({ onBack }) {
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSending(true);
    setSuccess(false);
    setError("");

    const form = event.currentTarget;

    const templateParams = {
      nom: form.nom.value,
      telephone: form.telephone.value,
      ville: form.ville.value,
      adresse: form.adresse.value,
      magasin: form.magasin.value || "Non précisé",
      produit: form.produit.value,
      quantite: form.quantite.value,
      prix: form.prix.value || "Non précisé",
      instructions:
        form.instructions.value || "Aucune instruction",
    };

    try {
      await emailjs.send(
        "service_crh9nhh",
        "template_rtam7vv",
        templateParams,
        "gbAHUCI8jA1A3DWbW"
      );

      setSuccess(true);
      form.reset();
    } catch (err) {
      console.error(err);

      setError(
        "Une erreur est survenue lors de l'envoi de la commande. Veuillez réessayer."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="order-page">
      <header className="order-header">
        <button
          type="button"
          className="back-btn"
          onClick={onBack}
        >
          ← Retour
        </button>

        <div className="order-logo">
          🚚 LivriDZ
        </div>
      </header>

      <main className="order-container">
        <div className="order-title">
          <span>🛍️ NOUVELLE COMMANDE</span>

          <h1>Qu'est-ce que vous voulez commander ?</h1>

          <p>
            Indiquez-nous ce dont vous avez besoin et nous
            nous occupons de la livraison.
          </p>
        </div>

        {success && (
          <div className="success-message">
            <div className="success-icon">✓</div>

            <div>
              <strong>Commande envoyée !</strong>

              <p>
                Votre commande a bien été reçue.
                Nous allons vous contacter prochainement.
              </p>
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form
          className="order-form"
          onSubmit={handleSubmit}
        >
          <div className="form-section">
            <h2>📍 Livraison</h2>

            <div className="form-group">
              <label>Ville *</label>

              <select name="ville" required>
                <option value="">
                  Sélectionnez votre ville
                </option>

                <option value="Amizour">
                  Amizour
                </option>

                <option value="El Kseur">
                  El Kseur
                </option>
              </select>
            </div>

            <div className="form-group">
              <label>
                Adresse de livraison *
              </label>

              <input
                type="text"
                name="adresse"
                placeholder="Ex : Centre-ville Amizour"
                required
              />
            </div>
          </div>

          <div className="form-section">
            <h2>🛍️ Produit</h2>

            <div className="form-group">
              <label>
                Nom du magasin
              </label>

              <input
                type="text"
                name="magasin"
                placeholder="Ex : Supermarché X"
              />
            </div>

            <div className="form-group">
              <label>
                Produit souhaité *
              </label>

              <input
                type="text"
                name="produit"
                placeholder="Ex : 2 pizzas Margherita"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Quantité *</label>

                <input
                  type="number"
                  name="quantite"
                  min="1"
                  defaultValue="1"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Prix approximatif (DA)
                </label>

                <input
                  type="number"
                  name="prix"
                  min="0"
                  placeholder="Facultatif"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                Photo du produit
              </label>

              <input
                type="file"
                name="photo"
                accept="image/*"
              />
            </div>
          </div>

          <div className="form-section">
            <h2>👤 Vos informations</h2>

            <div className="form-group">
              <label>
                Nom complet *
              </label>

              <input
                type="text"
                name="nom"
                placeholder="Votre nom"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Numéro de téléphone *
              </label>

              <input
                type="tel"
                name="telephone"
                placeholder="05 XX XX XX XX"
                required
              />
            </div>

            <div className="form-group">
              <label>
                Instructions supplémentaires
              </label>

              <textarea
                name="instructions"
                placeholder="Une information importante pour la livraison..."
                rows="4"
              ></textarea>
            </div>
          </div>

          <div className="order-summary">
            <div>
              <span>Frais de livraison</span>
              <strong>À confirmer</strong>
            </div>

            <div className="total-row">
              <span>Total</span>
              <strong>À confirmer</strong>
            </div>
          </div>

          <button
            type="submit"
            className="submit-order"
            disabled={sending}
          >
            {sending
              ? "⏳ Envoi en cours..."
              : "📦 Envoyer la commande"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default Order;