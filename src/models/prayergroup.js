module.exports = (sequelize, DataTypes) => {
  const PrayerGroup = sequelize.define('PrayerGroup', {
    name: DataTypes.STRING,
    level: DataTypes.STRING,
  }, { timestamps: false, tableName: 'prayerGroups' });

  PrayerGroup.associate = (models) => {
    PrayerGroup.belongsTo(models.City, { as: 'city', foreignKey: 'id' });
    PrayerGroup.belongsTo(models.State, { as: 'state', foreignKey: 'id' });
    PrayerGroup.belongsTo(models.Country, { as: 'country', foreignKey: 'id' });
    PrayerGroup.belongsTo(models
      .EvangelizationCenter, { as: 'EvangelizationCenter', foreignKey: 'id' });
  };

  return PrayerGroup;
};