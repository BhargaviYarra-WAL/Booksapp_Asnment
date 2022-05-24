const express = require("express");
const {
  getcategories,
  addcategory,
  updatecategory,
  deletecategory,
  categorybyid,
} = require("../controllers/bookcategory");
const router = express.Router();
router.get("/", getcategories);
router.get("/:id", categorybyid);
router.post("/", addcategory);
router.put("/:id", updatecategory);
router.delete("/:id", deletecategory);
module.exports = router;
