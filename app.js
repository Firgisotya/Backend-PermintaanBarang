var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var categoriesRouter = require("./routes/categories");
var subCategoriesRouter = require("./routes/subCategories");
var ordersRouter = require("./routes/order");
var orderDetailsRouter = require("./routes/orderDetails");
var subCategoryDetailsRouter = require("./routes/subCategoryDetails");
var notificationRouter = require("./routes/notifications");

var app = express();

var cors = require("cors");
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});
app.use(cors({ origin: true, credentials: true }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/categories", categoriesRouter);
app.use("/sub-categories", subCategoriesRouter);
app.use("/orders", ordersRouter);
app.use("/order-details", orderDetailsRouter);
app.use("/sub-category-details", subCategoryDetailsRouter);
app.use("/notifications", notificationRouter);

module.exports = app;
