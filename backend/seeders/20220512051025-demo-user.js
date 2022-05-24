"use strict";
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("bookusers", [
      {
        email: "abc@example.com",
        username: "abc",
        password: bcrypt.hashSync("abc123", salt),
        address: "Hyderabad,Madhapur",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "jhon@example.com",
        username: "jhon",
        password: bcrypt.hashSync("jhon123", salt),
        address: "Banglore",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete("bookusers", {
      [Op.or]: [{ username: "abc" }, { username: "jhon" }],
    });
  },
};
