module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define("subCategory", { timestamp: false });
  const SubCategoryDetail = sequelize.define(
    "SubCategoryDetails",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      subCategoryId: {
        type: DataTypes.INTEGER,
        references: {
          model: "subCategories",
          key: "id",
        },
      },
      name: {
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
      tableName: "subCategoryDetails",
    }
  );
  SubCategoryDetail.belongsTo(SubCategory, { foreignKey: "subCategoryId" });
  return SubCategoryDetail;
};
