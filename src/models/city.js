module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
  }, { timestamps: false, tableName: 'cities' });

  return City;
};