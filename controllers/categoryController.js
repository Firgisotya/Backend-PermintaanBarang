const { Category } = require("../models");

module.exports = {
  index: async (req, res) => {
    try {
      const categories = await Category.findAll();
      return res.json({
        data: categories,
        message: "List of categories",
      });
    } catch (error) {
      console.log(error);
    }
  },
  show: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      // tambahkan interval untuk menampilkan data
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      return res.json({
        data: category,
        message: "Detail of category",
      });
    } catch (error) {
      console.log(error);
    }
  },
};
