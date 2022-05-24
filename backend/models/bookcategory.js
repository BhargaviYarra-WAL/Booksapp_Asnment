"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class bookcategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      bookcategory.hasMany(models.Book, {
        foreignKey: "categoryid",
        as: "books",
      });
    }
  }
  bookcategory.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "bookcategory",
    }
  );
  return bookcategory;
};
