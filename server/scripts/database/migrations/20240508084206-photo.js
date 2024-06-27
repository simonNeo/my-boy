'use strict;'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('timeline', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        field: 'user_id',
        comment: 'user表id',
        allowNull: false,
      },
      content: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '内容',
      },
      createdTime: {
        type: Sequelize.DATE,
        field: 'created_time',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
    await queryInterface.createTable('timeline_attachments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      timelineId: {
        type: Sequelize.INTEGER.UNSIGNED,
        field: 'timeline_id',
        comment: 'timeline表id',
        allowNull: false,
      },
      type: {
        type: Sequelize.TINYINT.UNSIGNED,
        defaultValue: 1,
        allowNull: false,
        comment: '附件类型, 1: 图片, 2: 视频',
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '附件名称',
      },
      url: {
        type: Sequelize.STRING(255),
        allowNull: false,
        comment: '附件地址',
      },
      createdTime: {
        type: Sequelize.DATE,
        field: 'created_time',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
    // 扩展表索引
    await queryInterface.addIndex('timeline', ['user_id']);
    await queryInterface.addIndex('timeline_attachments', ['timeline_id']);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('timeline');
    await queryInterface.dropTable('timeline_attachments');
  },
};