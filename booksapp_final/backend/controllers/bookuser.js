const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models").bookuser;
const authenticationMiddleware = require("../middlewares/authentication");

exports.getusers = [
  authenticationMiddleware,
  async (req, res) => {
    try {
      const data = await User.findAll();
      return res.send({ status: 200, data });
    } catch (err) {
      return res.send({ status: 500, data: err.message });
    }
  },
];
exports.userbyid = [
  authenticationMiddleware,
  async (req, res) => {
    const id = req.params.id;
    try {
      const data = await User.findOne({
        where: { id },
      });
      return res.json({ status: 200, data });
    } catch (err) {
      return res.send({ status: 500, data: err.message });
    }
  },
];

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const users = await User.findOne({ where: { username } });
    if (users) {
      const passCorrect = bcrypt.compareSync(password, users.password);
      if (!passCorrect) {
        res.status(401).json({ error: "Wrong users credentials" });
      } else {
        const payload = {
          users: { username },
        };
        const token = jwt.sign(payload, "secret_code", {
          expiresIn: 1200,
        });
        res.status(200).json({ token, users });
      }
    } else {
      res.status(400).json({ error: "username does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal error" });
  }
};
