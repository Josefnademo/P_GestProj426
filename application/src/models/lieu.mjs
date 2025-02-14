const LieuModel = (sequelize, DataTypes) => {
  return sequelize.define("Lieu", {
    lieu_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Ce nom de lieu est déjà pris." },
    },
    longitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    particularite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    histoire: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
};

export { LieuModel };
