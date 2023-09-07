module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", { timestamp: false });
  const User = sequelize.define("User", { timestamp: false });
  const Notification = sequelize.define("Notification", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    orderId: {
      type: DataTypes.INTEGER,
      references: {
        model: "orders",
        key: "id",
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
  Notification.belongsTo(Order, { foreignKey: "orderId" });
  Notification.belongsTo(User, { foreignKey: "userId" });
  return Notification;
};
