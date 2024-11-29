const { DataTypes, Model } = require("sequelize");
const { sequelizeTonitrus, sequelizeCable } = require("../database/databases");

class Product extends Model {}

// Initialize for the first database
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: sequelizeTonitrus, modelName: "product" }
);

class ProductCable extends Model {}
ProductCable.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
    },
  },
  { sequelize: sequelizeCable, modelName: "product" }
);

module.exports = { ProductTonitrus: Product, ProductCable };
