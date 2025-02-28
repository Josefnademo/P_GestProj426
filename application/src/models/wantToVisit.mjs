const AimeraitVisiterModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "AimeraitVisiter",
    {
      lieu_id_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Lieu", key: "lieu_id" },
      },
      compte_id_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Compte", key: "compte_id" },
      },
    },
    { timestamps: false }
  );
};
export { AimeraitVisiterModel };
