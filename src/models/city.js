module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, { tableName: 'cities' });

  City.associante = (models) => {
    City.hasMany(models.PrayerGroup, { foreignKey: 'cityId', as: 'prayerGroups' });
  };

  return City;
};