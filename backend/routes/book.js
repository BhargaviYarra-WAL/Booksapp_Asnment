const express = require("express");

const {
  getbooks,
  addBook,
  updatebook,
  deletebook,
  bookbyid,
} = require("../controllers/book");
const router = express.Router();
router.get("/", getbooks);
router.get("/:id", bookbyid);
router.post("/", addBook);

router.put("/:id", updatebook);
router.delete("/:id", deletebook);
module.exports = router;
