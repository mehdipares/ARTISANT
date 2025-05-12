module.exports = (sequelize, DataTypes) => {
    return sequelize.define("specialite", {
      nom: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  };
  