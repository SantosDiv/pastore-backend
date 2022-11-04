module.exports = (sequelize, DataTypes) => {
  const PrayerGroup = sequelize.define('PrayerGroup', {
    name: DataTypes.STRING,
    levelGroup: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, { tableName: 'prayerGroups' });

  PrayerGroup.associate = (models) => {
    PrayerGroup.belongsTo(models.City, { as: 'city', foreignKey: 'cityId' });
    PrayerGroup.belongsTo(models.State, { as: 'state', foreignKey: 'stateId' });
    PrayerGroup.belongsTo(models.Country, { as: 'country', foreignKey: 'countryId' });
    PrayerGroup.belongsTo(models
      .EvangelizationCenter, { as: 'EvangelizationCenter', foreignKey: 'centerId' });
    PrayerGroup.hasMany(models.User, { as: 'user', foreignKey: 'prayerGroupId' });
  };

  return PrayerGroup;
};