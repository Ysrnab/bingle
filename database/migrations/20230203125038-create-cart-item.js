'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('cart_item', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      cart_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "carts",
          key: "id",
          as: "cart_id"
        }
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "items",
          key: "id",
          as: "item_id"
        }
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now()
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Date.now()
      },
      deleted_at: {
        type: Sequelize.DATE
      }
      });
     
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.dropTable('cart_item');
     
  }
};
