require("dotenv").config(); // Charge les variables .env

const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données
const db = require("./models");
console.log("DB object :", db);

db.sequelize.sync().then(() => {
  console.log("✅ Base de données synchronisée !");
}).catch((err) => {
  console.error("❌ Erreur de connexion à la base :", err);
});

// Routes
require("./routes/categorie.routes")(app);
require("./routes/specialite.routes")(app);
require("./routes/artisan.routes")(app);
// Route test
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Trouve Ton Artisan 👷‍♂️");
});
app.get('/categorie/:nomCategorie', async (req, res) => {
  const { nomCategorie } = req.params;

  try {
    const [artisans] = await db.query(
      `SELECT artisans.*, categories.nom AS nom_categorie
       FROM artisans
       JOIN categories ON artisans.categorie_id = categories.id
       WHERE categories.nom = ?`,
      [nomCategorie]
    );

    if (!artisans.length) {
      return res.status(404).json({ message: 'Aucun artisan trouvé pour cette catégorie' });
    }

    res.json(artisans);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});
// Démarrage du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
});
