module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, { tableName: 'countries' });

  Country.associate = (models) => {
    Country.hasMany(models.PrayerGroup, { foreignKey: 'countryId', as: 'prayerGroups' });
  };

  return Country;
};