module.exports = (sequelize, DataTypes) => {
  const EvangelizationCenter = sequelize.define('EvangelizationCenter', {
    name: DataTypes.STRING,
  }, { timestamps: false, tableName: 'evangelizationCenters' });

  EvangelizationCenter.associate = (models) => {
    EvangelizationCenter.hasMany(models
      .PrayerGroup, { foreignKey: 'id', as: 'prayerGroups' });
  };

  return EvangelizationCenter;
};