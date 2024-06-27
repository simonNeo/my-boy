'use strict;'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('record', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      date: {
        type: Sequelize.STRING(11),
        allowNull: false,
        comment: '发生日期',
      },
      time: {
        type: Sequelize.STRING(11),
        allowNull: false,
        comment: '发生时间',
      },
      type: {
        type: Sequelize.TINYINT.UNSIGNED,
        allowNull: false,
        comment: '类型，1：喂奶，2：换尿不湿，3:开始睡觉，4:睡醒，5:其他',
      },
      memo: {
        type: Sequelize.STRING(255),
        comment: '备注',
      },
      createdTime: {
        type: Sequelize.DATE,
        field: 'created_time',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
    queryInterface.addIndex('record', ['date'], { name: 'idx_date' });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('record');
  },
};