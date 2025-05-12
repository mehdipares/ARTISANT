module.exports = (app) => {
    const db = require("../models");
    const Categorie = db.categorie;
  
    app.get("/categories", async (req, res) => {
      try {
        const categories = await Categorie.findAll();
        res.json(categories);
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
      }
    });
    app.post("/categories", async (req, res) => {
      try {
        const { nom } = req.body;
        if (!nom) return res.status(400).json({ message: "Le nom est requis." });
  
        const newCategorie = await Categorie.create({ nom });
        res.status(201).json(newCategorie);
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
      }
    });
    app.put("/categories/:id", async (req, res) => {
      try {
        const { nom } = req.body;
        const { id } = req.params;
    
        const updated = await Categorie.update({ nom }, { where: { id } });
        if (updated[0] === 0) return res.status(404).json({ message: "Catégorie non trouvée" });
    
        res.json({ message: "Catégorie mise à jour" });
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
      }
    });
    app.delete("/categories/:id", async (req, res) => {
      try {
        const deleted = await Categorie.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: "Catégorie non trouvée" });
        res.json({ message: "Catégorie supprimée" });
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
      }
    });
    app.get("/categorie/:nomCategorie", async (req, res) => {
      const { nomCategorie } = req.params;
  
      try {
        const categorie = await Categorie.findOne({
          where: { nom: nomCategorie },
          include: [
            {
              model: Artisan,
              as: "artisans"
            }
          ]
        });
  
        if (!categorie || categorie.artisans.length === 0) {
          return res.status(404).json({ message: "Aucun artisan trouvé pour cette catégorie." });
        }
  
        res.json(categorie.artisans);
      } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({ message: "Erreur serveur" });
      }
    });
  };
  