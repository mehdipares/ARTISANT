import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ArtisanList() {
  const { categorie } = useParams();
  const [artisans, setArtisans] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/artisans?categorie=${categorie}`)
      .then((res) => setArtisans(res.data))
      .catch((err) => console.error("Erreur chargement artisans:", err));
  }, [categorie]);

  return (
    <main className="container py-5">
      <h2>Artisans dans la catégorie : {categorie}</h2>

      {artisans.length === 0 ? (
        <p>Aucun artisan trouvé pour cette catégorie.</p>
      ) : (
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
      )}
    </main>
  );
}

export default ArtisanList;
