module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    level: DataTypes.STRING,
    avatar: DataTypes.STRING,
    role: DataTypes.JSONB,
    admin: DataTypes.BOOLEAN,
    active: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, { tableName: 'users' });

  User.associate = (models) => {
    User.belongsTo(models
      .PrayerGroup, { as: 'group', foreignKey: 'prayerGroupId' });
    User.hasMany(models.Attendence, { as: 'attendences', foreignKey: 'userId' });
  };

  return User;
};