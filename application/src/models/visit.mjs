const VisiterModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Visiter",
    {
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
      date_visite: { type: DataTypes.DATE },
    },
    { timestamps: false }
  );
};

export { VisiterModel };
