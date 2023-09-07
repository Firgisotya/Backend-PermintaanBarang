const {
  Order,
  User,
  Category,
  subCategory,
  Notification,
} = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

module.exports = {
  index: async (req, res) => {
    try {
      const orders = await Order.findAll({
        attributes: {
          // exclude: ["userId", "categoryId"],
        },
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Category,
            attributes: {},
          },
        ],
      });
      return res.json(orders);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  store: async (req, res) => {
    try {
      const { userId, categoryId, subCategoryId, namaBarang, date, amount } =
        req.body;

      const order = await Order.create({
        userId,
        categoryId,
        subCategoryId,
        namaBarang,
        date,
        amount,
      });

      return res.status(201).json({ status: "success", data: order });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  show: async (req, res) => {
    try {
      const order = await Order.findAll({
        where: {
          id: req.params.id,
        },
        attributes: {},
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Category,
            attributes: {},
          },
          {
            model: subCategory,
          },
        ],
      });
      return res.json(order);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  showMobile: async (req, res) => {
    try {
      const order = await Order.findByPk(req.params.id);
      return res.json({ data: order });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  countByStatus: async (req, res) => {
    try {
      const done = await Order.count({
        where: {
          statusOrder: "Done",
        },
      });
      const onProgress = await Order.count({
        where: {
          statusOrder: "On Progress",
        },
      });
      return res.json({ done, onProgress });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await Order.destroy({
        where: {
          id,
        },
      });
      return res.status(200).json({ message: "Data has been deleted" });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  getByStatus: async (req, res) => {
    try {
      const { status } = req.params;
      const orders = await Order.findAll({
        attributes: {},
        order: [["createdAt", "DESC"]],
        where: {
          statusOrder: {
            [Op.ne]: "Done",
          },
        },
        include: [
          {
            model: User,
            attributes: {
              exclude: ["password"],
            },
          },
          {
            model: Category,
            attributes: {},
          },
        ],
      });
      return res.json(orders);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  getHistory: async (req, res) => {
    try {
      const { month } = req.params;
      let startOfMonth;
      let endOfMonth;
      if (month) {
        startOfMonth = moment(month)
          .startOf("month")
          .format("YYYY-MM-DD HH:mm:ss");
        endOfMonth = moment(month).endOf("month").format("YYYY-MM-DD HH:mm:ss");
      } else {
        startOfMonth = moment().startOf("month").format("YYYY-MM-DD HH:mm:ss");
        endOfMonth = moment().endOf("month").format("YYYY-MM-DD HH:mm:ss");
      }
      const userIds = await Order.findAll({
        attributes: ["userId", "updatedAt"],
        where: {
          statusOrder: "Done",
          updatedAt: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
        group: ["userId"],
      });
      const listUserId = userIds.map((userId) => userId.userId);

      // sum amount from order done
      const amount = await Order.sum("amount", {
        where: {
          statusOrder: "Done",
          updatedAt: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
      });

      const data = await Promise.all(
        listUserId.map(async (userId) => {
          const orders = await Order.sum("amount", {
            where: {
              userId: userId,
              statusOrder: "Done",
            },
          });
          const user = await User.findByPk(userId, {
            attributes: {
              exclude: ["password"],
            },
          });
          return {
            userId: user.id,
            userName: user.username,
            amount: orders,
          };
        })
      );

      const listOrder = await Order.findAll({
        where: {
          statusOrder: "Done",
          updatedAt: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
      });

      return res.json({
        userLength: userIds.length,
        amount: amount ? amount : 0,
        data,
        listData: listOrder,
      });
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  },
  showHistoryByUser: async (req, res) => {
    const { id } = req.params;
    try {
      const userFound = await User.findByPk(id, {
        attributes: {
          exclude: ["password"],
        },
      });
      const orders = await Order.findAll({
        attributes: {},
        // Order by createdAt DESC and status On Progress
        order: [["createdAt", "DESC"]],
        where: {
          userId: id,
          statusOrder: "Done",
        },
        include: [
          {
            model: Category,
            attributes: {},
          },
          {
            model: subCategory,
          },
        ],
      });
      return res.json({
        user: userFound,
        data: orders,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  updateStatusRequest: async (req, res) => {
    try {
      const { id } = req.params;
      const { statusRequest } = req.body;
      const orderFound = await Order.findByPk(id);
      orderFound.statusRequest = statusRequest;
      if (statusRequest == "Reject") {
        orderFound.statusOrder = "Done";
      } else {
        orderFound.statusOrder = "On Progress";
      }
      await orderFound.save();

      // Create notification
      const notification = await Notification.create({
        status: "unread",
        userId: orderFound.userId,
        orderId: orderFound.id,
      });

      res.status(200).json({
        statusRequest,
        orderFound,
        message: "Data has been updated",
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id, {
        include: [
          {
            model: Category,
          },
          {
            model: User,
            attributes: {},
          },
        ],
      });
      return res.status(200).json(order);
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  ambilBarang: async (req, res) => {
    try {
      const { id } = req.params;
      const order = await Order.findByPk(id);
      order.statusOrder = "Done";
      await order.save();

      return res
        .status(200)
        .json({ message: "Data has been updated", data: order });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  dataExport: async (req, res) => {
    try {
      const { id, month } = req.params;
      const dataFound = await Order.findAll({
        where: {
          userId: id,
          statusOrder: "Done",
          statusRequest:'Accept',
          date: {
            [Op.between]: [
              moment(month).startOf("month").format("YYYY-MM-DD"),
              moment(month).endOf("month").format("YYYY-MM-DD"),
            ],
          },
        },
      });
      return res.json(dataFound);
    } catch (error) {
      console.log(error);
      return res.json(error);
    }
  },
};
