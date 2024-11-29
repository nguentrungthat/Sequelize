const { DataTypes, Model } = require("sequelize");
const { sequelizeTonitrus, sequelizeCable } = require("../database/databases");
const { ProductTonitrus, ProductCable } = require("./Product");

class Image extends Model {}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    link: { type: DataTypes.STRING },
  },
  { sequelize: sequelizeTonitrus, modelName: "image" }
);

class ImageCable extends Model {}
ImageCable.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    link: { type: DataTypes.STRING },
  },
  { sequelize: sequelizeCable, modelName: "image" }
);

// Define relationship
ProductTonitrus.hasMany(Image, { foreignKey: "productId" });
Image.belongsTo(ProductTonitrus, { foreignKey: "productId" });

ProductCable.hasMany(ImageCable, { foreignKey: "productId" });
ImageCable.belongsTo(ProductCable, { foreignKey: "productId" });

module.exports = { ImageTonitrus: Image, ImageCable };
