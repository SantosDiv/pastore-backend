module.exports = (sequelize, DataTypes) => {
  const EvangelizationCenter = sequelize.define('EvangelizationCenter', {
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, { tableName: 'evangelizationCenters' });

  EvangelizationCenter.associate = (models) => {
    EvangelizationCenter.hasMany(models
      .PrayerGroup, { foreignKey: 'centerId', as: 'prayerGroups' });
  };

  return EvangelizationCenter;
};