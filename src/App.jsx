import { useState } from "react";
import "./App.css";
import Order from "./Order";

function App() {
  const [showOrder, setShowOrder] = useState(false);

  if (showOrder) {
    return <Order onBack={() => setShowOrder(false)} />;
  }

  return (
    <div className="app">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          <span className="logo-icon">🚚</span>
          <span>LivriDZ</span>
        </div>

        <nav>
          <a href="#accueil">Accueil</a>
          <a href="#comment">Comment ça marche</a>
          <a href="#zones">Zones</a>
        </nav>

        <button className="login-btn">Connexion</button>
      </header>

      {/* HERO */}
      <main>
        <section className="hero" id="accueil">
          <div className="hero-content">
            <div className="location-badge">
              📍 Amizour & El Kseur
            </div>

            <h1>
              Vous commandez.
              <br />
              <span>On vous livre.</span>
            </h1>

            <p>
              Besoin d'un produit à Amizour ou El Kseur ?
              <br />
              Dites-nous ce que vous voulez, on s'occupe du reste.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={() => setShowOrder(true)}
              >
                🛍️ Commander maintenant
              </button>

              <button className="secondary-btn">
                Comment ça marche ?
              </button>
            </div>
          </div>

          <div className="hero-card">
            <div className="delivery-circle">🏍️</div>

            <h3>Livraison locale</h3>

            <p>
              Un produit, une adresse,
              <br />
              une livraison.
            </p>

            <div className="card-line">
              <span>📍</span>
              <div>
                <strong>Zone de livraison</strong>
                <small>Amizour • El Kseur</small>
              </div>
            </div>

            <div className="card-line">
              <span>⚡</span>
              <div>
                <strong>Service rapide</strong>
                <small>Commande simple et directe</small>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="services" id="zones">
          <div className="section-title">
            <span>POURQUOI NOUS ?</span>
            <h2>Commander devient simple</h2>
            <p>
              Pas besoin de chercher pendant des heures.
              <br />
              Vous nous dites ce qu'il vous faut.
            </p>
          </div>

          <div className="service-grid">
            <div className="service-card">
              <div className="service-icon">🛍️</div>
              <h3>Vous choisissez</h3>
              <p>
                Indiquez simplement le produit que vous
                souhaitez commander.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">📦</div>
              <h3>On s'en occupe</h3>
              <p>
                Nous récupérons votre commande auprès
                du magasin indiqué.
              </p>
            </div>

            <div className="service-card">
              <div className="service-icon">🚴</div>
              <h3>On vous livre</h3>
              <p>
                Votre commande est livrée directement
                à l'adresse indiquée.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="how-section" id="comment">
          <div className="section-title">
            <span>COMMENT ÇA MARCHE ?</span>
            <h2>En seulement 3 étapes</h2>
          </div>

          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Passez votre commande</h3>
              <p>
                Indiquez le produit, le magasin et
                votre adresse.
              </p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3>Nous préparons</h3>
              <p>
                Nous nous occupons de récupérer
                votre produit.
              </p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3>Recevez votre commande</h3>
              <p>
                Votre commande arrive directement
                chez vous.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          🚚 LivriDZ
        </div>

        <p>
          Livraison locale à Amizour et El Kseur
        </p>

        <span>
          © 2026 LivriDZ — Tous droits réservés
        </span>
      </footer>
    </div>
  );
}

export default App;