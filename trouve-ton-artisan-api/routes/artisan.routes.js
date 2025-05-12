module.exports = (app) => {
    const db = require("../models");
    const Artisan = db.artisan;

    app.get("/artisans/top", async (req, res) => {
      try {
        const topArtisans = await Artisan.findAll({
          where: { is_top: true },
          order: [['note', 'DESC']],
          limit: 3
        });
        res.json(topArtisans);
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
      }
    });
  
    app.get("/artisans", async (req, res) => {
      try {
        const artisans = await Artisan.findAll();
        res.json(artisans);
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
      }
    });
    app.post("/artisans", async (req, res) => {
      try {
        const { nom, note, ville, image, description, site_web, specialiteId } = req.body;
  
        if (!nom || !ville || !specialiteId) {
          return res.status(400).json({ message: "Le nom, la ville et la spécialité sont requis." });
        }
  
        const newArtisan = await Artisan.create({
          nom,
          note,
          ville,
          image,
          description,
          site_web,
          specialiteId
        });
  
        res.status(201).json(newArtisan);
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
      }
    });
    app.put("/artisans/:id", async (req, res) => {
      try {
        const { nom, note, ville, description, site_web, specialiteId } = req.body;
        const { id } = req.params;
    
        const updated = await Artisan.update(
          { nom, note, ville, description, site_web, specialiteId },
          { where: { id } }
        );
        if (updated[0] === 0) return res.status(404).json({ message: "Artisan non trouvé" });
    
        res.json({ message: "Artisan mis à jour" });
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
      }
    });
    app.delete("/artisans/:id", async (req, res) => {
      try {
        const deleted = await Artisan.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ message: "Artisan non trouvé" });
        res.json({ message: "Artisan supprimé" });
      } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
      }
    });
  };
  