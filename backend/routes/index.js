var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/uploads/:name', (req, res) => {
  const filePath = path.join(__dirname, '../', `/uploads/${req.params.name}`);
  console.log(filePath);
  res.sendFile(filePath);
});
module.exports = router;
