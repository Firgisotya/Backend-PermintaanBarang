const { OrderDetail, Order, User,Category } = require("../models");

module.exports = {
  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const orderDetail = await OrderDetail.findByPk(id);
      const orderFound = await Order.findByPk(orderDetail.orderId);
      if (!orderDetail) {
        return res.status(400).json({
          status: "failed",
          message: "Order Detail not found",
        });
      }
      await orderDetail.destroy();
      const sumAmount = await OrderDetail.sum("amount", {
        where: {
          orderId: orderFound.id,
        },
      });
      await orderFound.update({
        amount: sumAmount == null ? 0 : sumAmount,
      });
      return res.json({
        status: "success",
        message: "Data has been deleted",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
      });
    }
  },
  show: async (req, res) => {
    try {
      const { id } = req.params;
      const orderDetail = await OrderDetail.findOne(
        {
          where: {
            orderId: id,
          },
        include: [
          {
            model: Order,
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
            include: [
              {
                model: User,
                attributes: {
                  exclude: ["password", "createdAt", "updatedAt"],
                }
              },
              {
                model: Category,
                attributes: {
                  exclude: ["createdAt", "updatedAt"],
                }
              }
            ]
          }
        ],
      });
      if (!orderDetail) {
        return res.status(400).json({
          status: "failed",
          message: "Order Detail not found",
        });
      }
      return res.json({
        status: "success",
        data: orderDetail,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
      });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const orderDetail = await OrderDetail.findByPk(id);
      if (!orderDetail) {
        return res.status(400).json({
          status: "failed",
          message: "Order Detail not found",
        });
      }
      await orderDetail.update({
        status,
      });
      const orderDetailFound = await OrderDetail.findAll({
        where: {
          orderId: orderDetail.orderId,
          status: "NULL",
        },
      });
      if (orderDetailFound.length == 0) {
        const order = await Order.findByPk(orderDetail.orderId);
        await order.update({
          status: "Done",
        });
      }
      return res.json({
        status: "success",
        message: "Data has been updated",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        status: "failed",
        message: "Internal Server Error",
      });
    }
  },
};
