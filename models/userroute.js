module.exports = (sequelize, DataTypes) => {
  const UserRoute = sequelize.define('UserRoute', {
    finishType: {
      type: DataTypes.ENUM,
      values: ['flash', 'onsight', 'regular'],
      defaultValue: DataTypes.ENUM('regular')
    }
  }, {
    underscored: true,
    tableName: 'user_routes',
    freezeTableName: true,
  });

  UserRoute.associate = (models) => {
    UserRoute.belongsTo(models.Route)
    UserRoute.belongsTo(models.User)
  };

  return UserRoute;
};