const AvisModel = (sequelize, DataTypes) => {
  return sequelize.define("Avis", {
    avis_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

export { AvisModel };
