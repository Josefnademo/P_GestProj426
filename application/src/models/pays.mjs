const PaysModel = (sequelize, DataTypes) => {
  return sequelize.define("Pays", {
    pays_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "ce nom de pays est déjà pris" },
    },
  });
};

export { PaysModel };
