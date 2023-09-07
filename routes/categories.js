var express = require("express");
const categoryController = require("../controllers/categoryController");
var router = express.Router();

/* GET home page. */
router.get("/", categoryController.index);
router.route("/:id").get(categoryController.show);

module.exports = router;
