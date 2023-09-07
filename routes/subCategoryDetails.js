var express = require("express");
const subCategoryDetailsController = require("../controllers/subCategoryDetailsController");

var router = express.Router();

/* GET home page. */
router.get("/:id", subCategoryDetailsController.index);


module.exports = router;
