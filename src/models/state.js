module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('states', {
    name: DataTypes.STRING,
  }, { timestamps: false, tableName: 'states' });

  State.associate = (models) => {
    State.hasMany(models.PrayerGroup, { foreignKey: 'id', as: 'prayerGroups' });
  };

  return State;
};