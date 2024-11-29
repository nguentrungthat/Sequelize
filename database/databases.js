const { Sequelize } = require("sequelize");

// First database
const sequelizeTonitrus = new Sequelize({
  dialect: "sqlite",
  host: "./database/Tonitrus.sqlite",
  logging: false, // Disable logging
});

// Second database
const sequelizeCable = new Sequelize({
  dialect: "sqlite",
  host: "./database/Cable.sqlite",
  logging: false,
});

module.exports = { sequelizeTonitrus, sequelizeCable };
