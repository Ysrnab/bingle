'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('items', [
      {
        name: 'Nila',
        price: 32000,
        stock: 100
      },
      {
        name: 'Lele',
        price: 25000,
        stock: 100
      },
      {
        name: 'Cumi cumi',
        price: 80000,
        stock: 100
      },
      {
        name: 'Udang',
        price: 75000,
        stock: 100
      },
      {
        name: 'kerang dara',
        price: 25000,
        stock: 100
      },
      {
        name: 'Tuna',
        price: 38000,
        stock: 100
      },
      {
        name: 'Tongkol',
        price: 34000,
        stock: 100
      },
      {
        name: 'Gurame',
        price: 45000,
        stock: 100
      },
      {
        name: 'Kembung',
        price: 36000,
        stock: 100
      },
      {
        name: 'Ikan Pangang',
        price: 75000,
        stock: 100
      }

    ], {});
  },

  async down(queryInterface, Sequelize) {


    await queryInterface.bulkDelete('items', null, {});

  }
};
