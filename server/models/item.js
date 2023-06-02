"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Brand, { foreignKey: "brandId" });
      Item.hasMany(models.Wishlist, { foreignKey: "itemId" });
    }
  }
  Item.init(
    {
      name: DataTypes.STRING,
      brandId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      size: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );

  Item.beforeCreate((instance) => {
    let { price } = instance;
    let convertedPrice = price * 15000;
    instance.price = convertedPrice;
  });
  return Item;
};
