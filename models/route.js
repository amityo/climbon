module.exports = (sequelize, DataTypes) => {
	const Route = sequelize.define('Route', {
		type: {
			type: DataTypes.ENUM,
			values: ['boulder', 'traverse'],
			allowNull: false,
			defaultValue: DataTypes.ENUM('boulder')
		},
		grade: {
			type: DataTypes.ENUM,
			values: ['v0', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10', 'v1', '5c', '6a', '6b', '6c', '7a', '7b', '7c'],
			allowNull: false
		},
		color: {
			type: DataTypes.STRING,
			allowNull: false
		},
		// should only be date
		setupDate: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			field: 'setup_date'
		},
		isAvailable: {
			type: DataTypes.BOOLEAN,
			defaultValue: true,
			field: 'is_available'
		},
		endDate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
			field: 'end_date'
		},
		image: {
			type: DataTypes.STRING,
			validate: {
				isUrl: true
			}
		},
		// todo: should be array of fk to users (setters) or fk to many to many table (route setters)
		setters: {
			type: DataTypes.ARRAY(DataTypes.STRING)
		}
	}, {	
		underscored: true,
		tableName: 'routes',
		freezeTableName: true,
		underscoredAll: true });

	Route.associate = (models) => {
		Route.hasMany(models.UserRoute, {
			foreignKey: 'routeId',
			as: 'userRoute'
		});

		Route.belongsTo(models.Location);
	};

	return Route;
};