module.exports = (sequelize, DataTypes) => {
  const EventUser = sequelize.define('EventUser', {}, { timestamps: false });

  EventUser.associate = (models) => {
    models.User.belongsToMany(models.Event, { through: EventUser });
    models.Event.belongsToMany(models.User, { through: EventUser });
  }

  return EventUser;
};