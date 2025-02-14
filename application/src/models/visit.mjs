const VisitModel = (sequelize, DataTypes) => {
  return sequelize.define("Visite", {
    date_visite: {
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

export { VisitModel };
