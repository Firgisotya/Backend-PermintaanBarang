const { subCategory, SubCategoryDetails } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const subCategoriesDetails = await SubCategoryDetails.findAll({
        where: {
          subCategoryId: req.params.id,
        },
        // include: {
        //   model: subCategory,
        //   attributes: {
        //     exclude: ["createdAt", "updatedAt"],
        //   },
        // },
        attributes: {
          exclude: ["createdAt", "updatedAt", "subCategoryId"],
        }
      });
      return res.json({
        message: "List of sub categories details",
        data: subCategoriesDetails,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
