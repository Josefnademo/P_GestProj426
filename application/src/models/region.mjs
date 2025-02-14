const RegionModel = (sequelize, DataTypes) => {
  return sequelize.define("Region", {
    region_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "ce nom de region est déjà pris" },
    },
  });
};

export { RegionModel };
