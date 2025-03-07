const RegionModel = (sequelize, DataTypes) => {
  return sequelize.define("Region", {
    region_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: { msg: "Ce nom est déjà pris." },
    },
  });
};

export { RegionModel };
