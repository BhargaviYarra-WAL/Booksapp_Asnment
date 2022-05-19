const { Sequelize } = require("sequelize");
const db = new Sequelize("westsidenode", "root", "Conscious@555", {
  host: "localhost",
  dialect: "mysql",
});
module.exports = db;
