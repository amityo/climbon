module.exports = (sequelize, DataTypes) => {
  const UserRoute = sequelize.define('UserRoute', {
    finishType: {
      type: DataTypes.ENUM,
      values: ['flash', 'onsight', 'send'],
      defaultValue: 'send',
      field: 'finish_type'
    },
    completionDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'completion_date'
    },
    numberOfTries: {
      type: DataTypes.INTEGER,
      defaultValue: -1,
      field: 'number_of_tries',
      validate: { min: -1, max: 10 }
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