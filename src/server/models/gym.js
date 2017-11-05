module.exports = (sequelize, DataTypes) => {
    const Gym = sequelize.define('Gym', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        website: {
            type: DataTypes.STRING,
            allowNull: false,
            validate : {
                isUrl: true
            }
        },
        image: {
            type: DataTypes.TEXT,
            validate: {
                isUrl: true
            }
        }  
    }, {
        underscored: true,
        tableName: 'gyms',
        freezeTableName: true,
    });

    Gym.associate = (models) => {
        Gym.hasMany(models.Location);
    };
    
    return Gym;
};