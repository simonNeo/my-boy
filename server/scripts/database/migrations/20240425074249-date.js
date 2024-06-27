'use strict;'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('date', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      date: {
        type: Sequelize.STRING(11),
        allowNull: false,
        unique: true,
        comment: '发生日期',
      },
      createdTime: {
        type: Sequelize.DATE,
        field: 'created_time',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('date');
  },
};