module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define("Category", { timestamp: false });
  const User = sequelize.define("User", { timestamp: false });
  const subCategory = sequelize.define("subCategory", { timestamp: false });
  const Notification = sequelize.define("Notification", {timestamp: false});
  const Order = sequelize.define(
    "Order",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "categories",
          key: "id",
        },
      },
      subCategoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "subCategories",
          key: "id",
        },
      },
      namaBarang: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.DATEONLY,
      },
      statusRequest: {
        type: DataTypes.ENUM("Accept", "Reject"),
      },
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      statusOrder: {
        type: DataTypes.ENUM("Requested","On Progress", "Done"),
        defaultValue: "Requested",
      },
      amount: {
        type: DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "orders",
    }
  );
  Order.belongsTo(User, { foreignKey: "userId" });
  Order.belongsTo(Category, { foreignKey: "categoryId" });
  Order.belongsTo(subCategory, { foreignKey: "subCategoryId" });
  Order.hasMany(Notification, { foreignKey: "orderId" });
  return Order;
};
