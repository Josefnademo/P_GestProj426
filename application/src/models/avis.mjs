const AvisModel = (sequelize, DataTypes) => {
  return sequelize.define("Avis", {
    avis_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING(500) },
    lieu_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Lieus", key: "lieu_id" },
    },
    compte_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Comptes", key: "compte_id" },
    },
  });
};

export { AvisModel };
