const CompteModel = (sequelize, DataTypes) => {
  return sequelize.define("Compte", {
    compte_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: { msg: "Ce username est déjà pris." },
    },
    email: {
      type: DataTypes.STRING(50),
      unique: { msg: "Ce email est déjà pris." },
    },
    salt: { type: DataTypes.STRING, allowNull: false },
    hashedPassword: { type: DataTypes.STRING, allowNull: false },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: false,
    },
  });
};

export { CompteModel };
