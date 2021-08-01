module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, { tableName: 'states' });

  State.associate = (models) => {
    State.hasMany(models.PrayerGroup, { foreignKey: 'stateId', as: 'prayerGroups' });
  };

  return State;
};