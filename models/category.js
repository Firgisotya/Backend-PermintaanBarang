module.exports = function (sequelize, DataTypes) {
  const subCategory = sequelize.define("subCategory", { timestamp: false });
  const Order = sequelize.define("Order", { timestamp: false });
  const Category = sequelize.define(
    "Category",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      icon: {
        type: DataTypes.STRING,
      },
      color: {
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
      tableName: "categories",
    }
  );
  Category.hasMany(subCategory, { foreignKey: "categoryId" });
  Category.hasMany(Order, { foreignKey: "categoryId" });
  return Category;
};
