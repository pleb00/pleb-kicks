"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("Items", {
      fields: ["brandId"],
      type: "foreign key",
      name: "Items_brandId_fk",
      references: {
        table: "Brands",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("Items", "Items_brandId_fk");
  },
};
