'use strict;'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      account: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true,
      },
      pwd: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      babyName: {
        type: Sequelize.STRING(50),
        field: 'baby_name',
        allowNull: true,
      },
      babyBirthday: {
        type: Sequelize.DATE,
        field: 'baby_birthday',
        allowNull: true,
      },
      createdTime: {
        type: Sequelize.DATE,
        field: 'created_time',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
    await queryInterface.addColumn('record', 'user_id', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      comment: '用户id',
      after: 'id',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
    await queryInterface.removeColumn('record', 'user_id');
  },
};