"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const brands = require("../data/brands.json");
    const items = require("../data/item.json");

    await queryInterface.bulkInsert("Brands", brands, {});
    await queryInterface.bulkInsert("Items", items, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Brands", null, {});
    await queryInterface.bulkDelete("Items", null, {});
  },
};
