module.exports = (sequelize, DataTypes) => {
  const Attendence = sequelize.define('Attendence', {
    present: DataTypes.BOOLEAN,
    date: DataTypes.DATEONLY,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  }, { tableName: 'attendences' });

  Attendence.associate = (models) => {
    Attendence.belongsTo(models.User, { foreignKey: 'userId', as: 'users' });
    Attendence.belongsTo(models.PrayerGroup, { foreignKey: 'prayerGroupId', as: 'prayerGroups' });
  };
  return Attendence;
};
