'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [{
        name: "Bayu",
        profession: "Admin Micro",
        role: "admin",
        email: "bayuseptiankurniawan@gmail.com",
        password: await bcrypt.hash('12345678', 8),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: "Najib",
        profession: "Front End Developer",
        role: "student",
        email: "najib@gmail.com",
        password: await bcrypt.hash('12345678', 8),
        created_at: new Date(),
        updated_at: new Date()
      },


    ]);

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('users', null, {});

  }
};