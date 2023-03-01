'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('users', 'phone', { type: Sequelize.STRING, defaultValue: "" }),
      queryInterface.addColumn('users', 'level', { type: Sequelize.STRING, defaultValue: "" }),
      queryInterface.addColumn('users', 'avatar', { type: Sequelize.STRING, defaultValue: "" })
    ]);
  },

  down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('users', 'phone'),
      queryInterface.removeColumn('users', 'level'),
      queryInterface.removeColumn('users', 'avatar')
    ])
  }
};
