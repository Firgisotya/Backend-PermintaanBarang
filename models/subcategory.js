module.exports = function (sequelize, DataTypes) {
  const Category = sequelize.define("Category", { timestamp: false });
  const OrderDetail = sequelize.define("OrderDetail", { timestamp: false });
  const SubCategoryDetail = sequelize.define("SubCategoryDetails", {
    timestamp: false,
  });
  const subCategory = sequelize.define(
    "subCategory",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      unit: {
        type: DataTypes.STRING,
      },
      color: {
        type: DataTypes.STRING,
      },
      icon: {
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
      tableName: "subCategories",
    }
  );
  subCategory.belongsTo(Category, { foreignKey: "categoryId" });
  subCategory.hasMany(OrderDetail, { foreignKey: "subCategoryId" });
  subCategory.hasMany(SubCategoryDetail, { foreignKey: "subCategoryId" });
  return subCategory;
};
