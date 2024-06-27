'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('record', 'feed_type', {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: true,
      comment: '1亲喂，2瓶喂',
      after: 'type',
    })
    await queryInterface.addColumn('record', 'milk_type', {
      type: Sequelize.TINYINT.UNSIGNED,
      allowNull: true,
      comment: '1母乳，2奶粉',
      after: 'feed_type',
    })
    await queryInterface.addColumn('record', 'feed_time', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      comment: '亲喂时长，单位分钟',
      after: 'milk_type',
    })
    await queryInterface.addColumn('record', 'feed_capacity', {
      type: Sequelize.INTEGER.UNSIGNED,
      allowNull: true,
      comment: '瓶喂量，单位ml',
      after: 'feed_time',
    })
    await queryInterface.addColumn('record', 'has_poop', {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      comment: '是否有大便',
      after: 'feed_capacity',
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('record', 'feed_type')
    await queryInterface.removeColumn('record', 'milk_type')
    await queryInterface.removeColumn('record', 'feed_time')
    await queryInterface.removeColumn('record', 'feed_capacity')
    await queryInterface.removeColumn('record', 'has_poop')
  }
};
