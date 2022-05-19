const bookcategory = require("../models").bookcategory;
const authenticationMiddleware = require("../middlewares/authentication");
(exports.getcategories = async (req, res) => {
  try {
    const data = await bookcategory.findAll();
    return res.send({ status: 200, data });
  } catch (err) {
    return res.send({ status: 500, data: err.message });
  }
}),
  (exports.addcategory = [
    authenticationMiddleware,
    async (req, res) => {
      const { name } = req.body;
      try {
        await bookcategory.create({
          name,
        });
        return res.send({
          status: 200,
          message: "New category has been created",
        });
      } catch (err) {
        return res.send({ status: 500, data: err.message });
      }
    },
  ]);
exports.categorybyid = [
  authenticationMiddleware,
  async (req, res) => {
    const id = req.params.id;
    try {
      const data = await bookcategory.findOne({
        where: { id },
      });
      return res.json({ status: 200, data });
    } catch (err) {
      return res.send({ status: 500, data: err.message });
    }
  },
];
exports.updatecategory = [
  authenticationMiddleware,
  async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    try {
      const category = await bookcategory.findOne({
        where: { id },
      });
      category.name = name;
      await category.save();
      return res.json({ status: 200, message: "category updated" });
    } catch (err) {
      return res.send({ status: 500, data: err.message });
    }
  },
];
exports.deletecategory = [
  authenticationMiddleware,
  async (req, res) => {
    const id = req.params.id;
    try {
      const category = await bookcategory.findOne({
        where: { id },
      });
      await category.destroy();
      return res.json({ status: 200, message: "category Deleted" });
    } catch (err) {
      return res.send({ status: 500, data: err.message });
    }
  },
];
