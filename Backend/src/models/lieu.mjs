const LieuModel = (sequelize, DataTypes) => {
  return sequelize.define("Lieu", {
    lieu_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: {
        msg: "Ce nom est déjà pris.",
      },
    },
    longitude: {
      type: DataTypes.DECIMAL(25, 18),
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(25, 18),
      allowNull: false,
    },
    particularite: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    histoire: { type: DataTypes.TEXT },
  });
};
export { LieuModel };
