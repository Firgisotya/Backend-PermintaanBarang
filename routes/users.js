var express = require("express");
const userController = require("../controllers/userController");
var router = express.Router();

/* GET users listing. */
router.get("/", userController.index);
router.route("/:id").get(userController.show).delete(userController.destroy);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/loginApps", userController.loginApps);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

module.exports = router;
