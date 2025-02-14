const PaysModel = (sequelize, DataTypes) => {
  return sequelize.define("Lieu", {
    lieu_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
};

export { PaysModel };
