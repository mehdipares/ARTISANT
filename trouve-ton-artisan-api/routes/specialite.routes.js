module.exports = (app) => {
    const db = require("../models");
    const Specialite = db.specialite;
  
    app.get("/specialites", async (req, res) => {
      try {
        const specialites = await Specialite.findAll();
        res.json(specialites);
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
      }
    });
    app.post("/specialites", async (req, res) => {
      try {
        const { nom, categorieId } = req.body;
        if (!nom || !categorieId) {
          return res.status(400).json({ message: "Le nom et la categorieId sont requis." });
        }
  
        const newSpecialite = await Specialite.create({ nom, categorieId });
        res.status(201).json(newSpecialite);
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
      }
    });
    app.put("/specialites/:id", async (req, res) => {
      try {
        const { nom, categorieId } = req.body;
        const { id } = req.params;
    
        const updated = await Specialite.update({ nom, categorieId }, { where: { id } });
        if (updated[0] === 0) return res.status(404).json({ message: "Spécialité non trouvée" });
    
        res.json({ message: "Spécialité mise à jour" });
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
      }
    });
    app.delete("/specialites/:id", async (req, res) => {
      try {
        const deleted = await Specialite.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: "Spécialité non trouvée" });
        res.json({ message: "Spécialité supprimée" });
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
      }
    });
  };
  