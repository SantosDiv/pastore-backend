module.exports = {
  up: (queryInterface, Sequelize) => {
    // EVENT belongsToMany USER
    return queryInterface.createTable(
      'event_users',
      {
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        UserId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        EventId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    // remove table
    return queryInterface.dropTable('event_users');
  },
}