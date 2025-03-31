const ResideModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Reside",
    {
      lieu_id_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Lieus", key: "lieu_id" },
      },
      region_id_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "Regions", key: "region_id" },
      },
    },
    { timestamps: false }
  );
};
export { ResideModel };
