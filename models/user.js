module.exports = function (sequelize, DataTypes) {
  const Order = sequelize.define("Order", { timestamp: false });
  const Notification = sequelize.define("Notification", { timestamp: false });
  const User = sequelize.define(
    "User",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      username: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
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
      tableName: "users",
    }
  );
  User.hasMany(Order, { foreignKey: "userId" });
  User.hasMany(Notification, { foreignKey: "userId" });
  return User;
};
