const { subCategory, Category } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const subCategories = await subCategory.findAll({
        where: {
          categoryId: req.params.id,
        },
        include: {
          model: Category,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });
      return res.json({
        message: "List of sub categories",
        data: subCategories,
      });
    } catch (error) {
      console.log(error);
    }
  },
  show: async (req, res) => {
    try {
      const subCategories = await subCategory.findOne({
        where: {
          id: req.params.id,
        },
        include: {
          model: Category,
          attributes: {
            // exclude: ["createdAt", "updatedAt"],
          },
        },
      });
      return res.json({
        message: "Detail of sub category",
        data: subCategories,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
