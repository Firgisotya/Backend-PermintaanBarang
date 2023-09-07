var express = require("express");
const orderDetailsController = require("../controllers/orderDetailsController");
var router = express.Router();

/* GET home page. */
router.route("/:id").get(orderDetailsController.show).delete(orderDetailsController.destroy).put(orderDetailsController.update);

module.exports = router;
