module.exports = (sequelize, DataTypes) => {
    return sequelize.define("categorie", {
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  };
  