const { sequelizeTonitrus, sequelizeCable } = require("../database/databases");
const { ProductTonitrus, ProductCable } = require("./Product");
const { ImageTonitrus, ImageCable } = require("./Image");

class DataModel {
  constructor() {
    // Ensure database sync
    sequelizeTonitrus.sync()
    sequelizeCable.sync()
  }

  // Method to insert data
  async saveData(name, source, imageUrls) {
    try {
      switch (source) {
        case "tonitrus":
          const productTonitrus = await ProductTonitrus.create({ name, source });
          const imagesTonitrus = imageUrls.map((url) => ({
            link: url,
            productId: productTonitrus.id,
          }));
          await ImageTonitrus.bulkCreate(imagesTonitrus);
          break;
        case "cablesandkits":
          const productCable = await ProductCable.create({ name, source });
          const imagesCable = imageUrls.map((url) => ({
            link: url,
            productId: productCable.id,
          }));
          await ImageCable.bulkCreate(imagesCable);
          break;
        default:
          break;
      }

      console.log(`Saved: ${name} with ${imageUrls.length} images`);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }

  // Get all data
  async getAllData(page = 1, limit = 10) {
    try {
      const offset = (page - 1) * limit;
      const products = await Product.findAndCountAll({
        include: Image,
        limit,
        offset,
      });

      // Format the response with pagination info
      const response = {
        totalItems: products.count,
        totalPages: Math.ceil(products.count / limit),
        currentPage: page,
        data: products.rows,
      };

      return response;
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  }
}

module.exports = DataModel;
