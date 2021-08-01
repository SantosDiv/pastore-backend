module.exports = (sequelize, DataTypes) => {
  const PrayerGroup = sequelize.define('PrayerGroup', {
    name: DataTypes.STRING,
    level: DataTypes.STRING,
  }, { timestamps: false, tableName: 'prayerGroups' });

  return PrayerGroup;
};