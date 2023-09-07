var express = require("express");
const subCategoryController = require("../controllers/subCategoryController");

var router = express.Router();

/* GET home page. */
router.get("/byCategory/:id", subCategoryController.index);
router.route("/:id").get(subCategoryController.show);

module.exports = router;
