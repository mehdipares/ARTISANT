module.exports = (sequelize, DataTypes) => {
  const Artisan = sequelize.define("artisan", {
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },
    note: {
      type: DataTypes.FLOAT
    },
    ville: { 
      type: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    site_web: {
      type: DataTypes.STRING
    },
    specialiteId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'specialites',
        key: 'id'
      }
    }
  });

  Artisan.associate = (models) => {
    Artisan.belongsTo(models.specialite, {
      foreignKey: "specialiteId",
      as: "specialite"
    });
  };

  return Artisan;
};
