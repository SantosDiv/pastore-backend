module.exports = (sequelize, DataTypes) => {
  const EventUser = sequelize.define('eventuser', {
    UserId: DataTypes.INTEGER,
    EventId: DataTypes.INTEGER,
  }, { tableName: 'event_users' });

  EventUser.associate = (models) => {
    models.User.belongsToMany(models.Event, { through: EventUser });
    models.Event.belongsToMany(models.User, { through: EventUser });
  }

  return EventUser;
};