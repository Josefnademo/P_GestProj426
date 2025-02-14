const LieuModel = (sequelize, DataTypes) => {
  return sequelize.define("Lieu", {
    lieu_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nom: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: { msg: "Ce nom est déjà pris." },
    },
    longitude: { type: DataTypes.DECIMAL(25, 18), allowNull: false },
    latitude: { type: DataTypes.DECIMAL(25, 18), allowNull: false },
    particularite: { type: DataTypes.TEXT, allowNull: false },
    histoire: { type: DataTypes.TEXT },
  });
};

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
  });
};

const PaysModel = (sequelize, DataTypes) => {
  return sequelize.define("Pays", {
    pays_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: { msg: "Ce nom est déjà pris." },
    },
  });
};

const RegionModel = (sequelize, DataTypes) => {
  return sequelize.define("Region", {
    region_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: { msg: "Ce nom est déjà pris." },
    },
  });
};

const AvisModel = (sequelize, DataTypes) => {
  return sequelize.define("Avis", {
    avis_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    description: { type: DataTypes.STRING(500) },
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
  });
};

const VisiterModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Visiter",
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
      date_visite: { type: DataTypes.DATE },
    },
    { timestamps: false }
  );
};

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

export {
  LieuModel,
  CompteModel,
  PaysModel,
  RegionModel,
  AvisModel,
  VisiterModel,
  AimeraitVisiterModel,
  EtreSitueDansModel,
  ResideModel,
};
