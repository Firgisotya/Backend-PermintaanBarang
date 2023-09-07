var express = require("express");
const notificationController = require("../controllers/notificationController");
var router = express.Router();

/* GET home page. */
router.get("/user/:id", notificationController.index);
router.get("/show/:id", notificationController.show);
router.get("/update/:id", notificationController.update);

module.exports = router;
