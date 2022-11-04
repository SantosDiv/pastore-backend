module.exports = (sequelize, DataTypes) => {
  const Shepherd = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.JSONB,
    admin: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, { tableName: 'users' });

  Shepherd.associate = (models) => {
    Shepherd.belongsTo(models
      .PrayerGroup, { as: 'prayerGroup', foreignKey: 'prayerGroupId' });
  };

  return Shepherd;
};