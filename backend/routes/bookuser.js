const express = require("express");
const { getusers, userbyid, loginUser } = require("../controllers/bookuser");
const router = express.Router();
router.get("/", getusers);
router.get("/:id", userbyid);
router.post("/checklogin", loginUser);

module.exports = router;
