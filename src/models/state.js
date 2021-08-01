module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('states', {
    name: DataTypes.STRING,
  }, { timestamps: false, tableName: 'states' });

  return State;
};