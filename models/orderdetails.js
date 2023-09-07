module.exports = function (sequelize, DataTypes) {
  const Order = sequelize.define("Order", { timestamp: false });
  const SubCategory = sequelize.define("subCategory", { timestamp: false });
  const OrderDetail = sequelize.define(
    "OrderDetail",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      orderId: {
        type: DataTypes.INTEGER,
        references: {
          model: "orders",
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
      status: {
        type: DataTypes.ENUM("Accept", "Reject"),
      },
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
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
      tableName: "orderDetails",
    }
  );
  OrderDetail.belongsTo(Order, { foreignKey: "orderId" });
  OrderDetail.belongsTo(SubCategory, { foreignKey: "subCategoryId" });
  return OrderDetail;
};
