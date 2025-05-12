import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/artisans/top") // ← adapte le port si besoin
      .then((res) => setArtisans(res.data))
      .catch((err) => console.error("Erreur artisans:", err));
  }, []);

  return (
    <main className="container py-5">
      <h2>Les 3 artisans du mois</h2>
      <div className="row">
        {artisans.map((artisan) => (
          <div className="col-md-4 mb-4" key={artisan.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{artisan.nom}</h5>
                <p className="card-text">{artisan.specialite?.nom}</p>
                <p className="card-text">{artisan.localisation}</p>
                <p className="card-text">Note : ⭐ {artisan.note}/5</p>
                <Link to={`/artisan/${artisan.id}`} className="btn btn-primary">
                  Voir la fiche
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;
