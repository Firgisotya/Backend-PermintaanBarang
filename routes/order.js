var express = require("express");
const orderController = require("../controllers/orderController");
var router = express.Router();

/* GET home page. */
router.get("/", orderController.index);
router.get("/countByStatus", orderController.countByStatus);
router.get("/export/:id/:month", orderController.dataExport);
router.get("/history/getByuser/:id", orderController.showHistoryByUser);
router.get("/history/:month", orderController.getHistory);
router.get("/getByStatus/:status", orderController.getByStatus);
router.get("/mobile/:id", orderController.showMobile);
router.get("/byId/:id", orderController.findById);
router.put("/updateStatus/:id", orderController.updateStatusRequest);
router.get("/ambilBarang/:id", orderController.ambilBarang);
router.route("/:id").get(orderController.show).delete(orderController.delete);
router.post("/", orderController.store);

module.exports = router;
