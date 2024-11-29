'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      UPDATE products
      SET description = name
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('products', 'description');
  }
};
