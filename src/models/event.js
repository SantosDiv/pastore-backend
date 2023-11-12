module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: DataTypes.STRING,
    schedule_at: DataTypes.DATE
  }, { tableName: 'events' });

  Event.associate = (models) => {
    Event.belongsToMany(models.User, { through: 'EventUsers' });
  }

  return Event;
};