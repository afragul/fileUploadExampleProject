'use strict';
const freeUserRoleId=require("../config/config").freeUserRoleId;
const paidUserRoleId=require("../config/config").paidUserRoleId;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert(
    "Roles",
    [
      {
        id:freeUserRoleId,
        Name:"free user",
        FileQuota:1,
        TotalQuota:10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id:paidUserRoleId,
        Name:"paid user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],{}
   );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Roles",null,{});
  },
};
