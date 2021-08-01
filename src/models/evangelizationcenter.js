module.exports = (sequelize, DataTypes) => {
  const EvangelizationCenter = sequelize.define('EvangelizationCenter', {
    name: DataTypes.STRING,
  }, { timestamps: false, tableName: 'evangelizationCenters' });

  return EvangelizationCenter;
};