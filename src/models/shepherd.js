module.exports = (sequelize, DataTypes) => {
  const Shepherd = sequelize.define('Shepherd', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    rule: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, { tableName: 'shepherds' });

  Shepherd.associate = (models) => {
    Shepherd.belongsTo(models
      .PrayerGroup, { as: 'prayerGroup', foreignKey: 'prayerGroupId' });
  };

  return Shepherd;
};