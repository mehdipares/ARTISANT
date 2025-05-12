const dbConfig = require("../config/db.config.js");
const { Sequelize, DataTypes } = require("sequelize");

// Connexion à la base MySQL
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect
  }
);

// Objet global db
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import des modèles
db.categorie = require("./categorie.model")(sequelize, DataTypes);
db.specialite = require("./specialite.model")(sequelize, DataTypes);
db.artisan = require("./artisan.model")(sequelize, DataTypes);

// Associations
db.categorie.hasMany(db.specialite, { onDelete: "CASCADE" });
db.specialite.belongsTo(db.categorie);

db.specialite.hasMany(db.artisan, { onDelete: "CASCADE" });
db.artisan.belongsTo(db.specialite);

// Export
module.exports = db;
