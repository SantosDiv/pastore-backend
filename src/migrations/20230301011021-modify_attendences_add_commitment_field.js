'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('attendences', 'commitment', { type: Sequelize.STRING, defaultValue: "" })
    ])
  },

  down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('attendences', 'commitment')
    ])
  }
};
