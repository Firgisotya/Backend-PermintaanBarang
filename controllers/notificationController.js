const { Op } = require("sequelize");
const { Notification } = require("../models");
const moment = require("moment");

module.exports = {
  index: async (req, res) => {
    try {
      const notifications = await Notification.findAll({
        where: {
          userId: req.params.id,
          createdAt: {
            // minggu ini
            [Op.between]: [
              //  hari ini - 7 hari
              moment().subtract(7, "days").toDate(),
              moment().toDate(),
            ],
          },
        },
        attributes: {},
        order: [
          ["createdAt", "DESC"],
          ["isOpen", "ASC"],
        ],
      });
      return res.json({
        data: notifications,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  update: async (req, res) => {
    try {
      const notification = await Notification.update(
        { isOpen: 1 },
        { where: { id: req.params.id } }
      );
      const notificationFound = await Notification.findOne({
        where: { id: req.params.id },
        attributes: {},
      });
      return res.json({
        data: notificationFound,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
  show: async (req, res) => {
    try {
      const notification = await Notification.findOne({
        where: { id: req.params.id },
        attributes: {},
      });
      return res.json({
        data: notification,
      });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  },
};
