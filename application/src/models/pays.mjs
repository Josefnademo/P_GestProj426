const PaysModel = (sequelize, DataTypes) => {
  return sequelize.define("Pays", {
    pays_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nom: {
      type: DataTypes.STRING(500),
      allowNull: false,
      unique: { msg: "Ce nom est déjà pris." },
    },
  });
};
export { PaysModel };
