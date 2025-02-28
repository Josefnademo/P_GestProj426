const EtreSitueDansModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "EtreSitueDans",
    {
      lieu_id_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Lieu", key: "lieu_id" },
      },
      pays_id_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Pays", key: "pays_id" },
      },
    },
    { timestamps: false }
  );
};
export { EtreSitueDansModel };
