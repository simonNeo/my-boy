'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('wx_mini_app', [
      {
        app_id: 'wx0e34d2b676655aed',
        app_secret: 'a302af11681789a0df886e99923c7bbd',
        original_id: 'gh_98d88387af93',
        name: '发芽全名猩',
        icon: 'https://deme-m-course.faya.life/cc/1683964910889-144.png',
        created_time: new Date(),
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
