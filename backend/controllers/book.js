const book = require("../models").Book;
const { body, validationResult } = require("express-validator");
const authenticationMiddleware = require("../middlewares/authentication");
const multer = require("multer");
let uniqueName = null;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({
  storage: storage,
  limits: { fieldNameSize: 1000, fileSize: 102400000 },
  fileFilter: (req, file, cb) => {
    console.log("File filter running..");
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png .jpg and .jpeg are allwed"));
    }
  },
});

(exports.getbooks = async (req, res) => {
  try {
    const data = await book.findAll();
    return res.send({ status: 200, data });
  } catch (err) {
    return res.send({ status: 500, data: err.message });
  }
}),
  (exports.addBook = [
    authenticationMiddleware,
    upload.single("image"),
    body("title")
      .trim()
      .isLength({ min: 5, max: 100 })
      .withMessage("title should have length min 5 ,max 100 chars"),
    body("description")
      .trim()
      .isLength({ min: 10, max: 500 })
      .withMessage("subject body should have range between 10 and 500"),
    body("author")
      .trim()
      .isLength({ min: 5, max: 50 })
      .withMessage("author name should have range from 5 to 50 chars"),
    body("availability")
      .trim()
      .isBoolean()
      .withMessage("Must be a boolean true or false"),
    body("price").trim().isLength({ min: 1 }).withMessage("price not be empty"),
    async (req, res) => {
      const errors = validationResult(req);
      console.log(errors);
      if (!errors.isEmpty()) {
        res.json({ status: 0,debug_data: errors });
      } else {
        const { title, author, description, price, availability, categoryid } =
          req.body;
        const newBook = {
          image: `/uploads/${uniqueName}`,
          title,
          author,
          description,
          price,
          availability,
          categoryid,
        };
        try {
          await book.create(newBook);

          return res.send({
            status: 200,
            data: "new book has been created successfully",
          });
        } catch (error) {
          return res.send({ status: 500, data: error.message });
        }
      }
    },
  ]);
exports.bookbyid = [
  authenticationMiddleware,
  async (req, res) => {
    const id = req.params.id;
    try {
      const data = await book.findOne({
        where: { id },
      });
      return res.json({ status: 200, data });
    } catch (err) {
      return res.send({ status: 500, data: err.message });
    }
  },
];

exports.updatebook = [
  authenticationMiddleware,
  body("title")
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage("title should have length min 5 ,max 100 chars"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage("subject body should have range between 10 and 500"),
  body("author")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("author name should have range from 5 to 50 chars"),
  body("availability")
    .trim()
    .isBoolean()
    .withMessage("Must be a boolean true or false"),
  body("price").trim().isLength({ min: 1 }).withMessage("price not be empty"),

  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.json({ status: 0, debug_data: errors });
    } else {
      const id = req.params.id;
      const { title, author, description, price, availability, categoryid } =
        req.body;

      try {
        const updatebook = await book.findOne({
          where: { id },
        });
        updatebook.title = title;
        updatebook.author = author;
        updatebook.description = description;
        updatebook.price = price;
        updatebook.availability = availability;
        updatebook.categoryid = categoryid;

        await updatebook.save();
        return res.json({ status: 200, message: "book updated" });
      } catch (err) {
        return res.send({ status: 500, data: err.message });
      }
    }
  },
];

exports.deletebook = [
  authenticationMiddleware,
  async (req, res) => {
    const id = req.params.id;
    try {
      const deletebook = await book.findOne({
        where: { id },
      });
      await deletebook.destroy();
      return res.json({ status: 200, message: "book Deleted" });
    } catch (err) {
      return res.send({ status: 500, data: err.message });
    }
  },
];
