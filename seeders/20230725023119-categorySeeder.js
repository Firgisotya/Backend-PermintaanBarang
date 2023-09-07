"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("categories", [
      {
        name: "Alat Tulis",
        icon: "https://ik.imagekit.io/Lazuardi/PermintaanBarang/alatTulis.png?updatedAt=1691276046323",
        color: "0093DD",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Non Alat Tulis",
        icon: "https://ik.imagekit.io/Lazuardi/PermintaanBarang/kursi.png?updatedAt=1691276046301",
        color: "EB891B",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Elektronik",
        icon: "https://ik.imagekit.io/Lazuardi/PermintaanBarang/elektronik.png?updatedAt=1691276046367",
        color: "EB891B",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Lainnya",
        icon: "https://ik.imagekit.io/Lazuardi/PermintaanBarang/lainnya.png?updatedAt=1691276046295",
        color: "0093DD",
        createdAt: new Date(),
        updatedAt: new Date(),
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
