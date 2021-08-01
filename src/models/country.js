module.exports = (sequelize, DataTypes) => {
  const Country = sequelize.define('Country', {
    name: DataTypes.STRING,
  }, { timestamps: false, tableName: 'countries' });

  Country.associate = (models) => {
    Country.hasMany(models.PrayerGroup, { foreignKey: 'id', as: 'prayerGroups' });
  };

  return Country;
};