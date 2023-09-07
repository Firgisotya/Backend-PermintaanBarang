"use strict";
var bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        username: "Lazuardi",
        email: "lazuardi@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        role: "admin",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        username: "Shintya",
        email: "shintya@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        role: "admin",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        username: "Nazela",
        email: "nazela@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        role: "admin",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        username: "Anisa",
        email: "anisa@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        role: "admin",
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        username: "Firgi",
        email: "firgi@gmail.com",
        password: bcrypt.hashSync("123456", 10),
        role: "admin",
        createdAt : new Date(),
        updatedAt : new Date()
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
