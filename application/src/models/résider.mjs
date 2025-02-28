const ResideModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Reside",
    {
      lieu_id_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Lieu", key: "lieu_id" },
      },
      region_id_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Region", key: "region_id" },
      },
    },
    { timestamps: false }
  );
};