module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
  }, { timestamps: false, tableName: 'cities' });

  City.associante = (models) => {
    City.hasMany(models.PrayerGroup, { foreignKey: 'id', as: 'prayerGroups' });
  };

  return City;
};