module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('Location', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        room: {
            type: DataTypes.STRING,
            allowNull: false
        },
        section: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // todo: think how to describe where each section is against another. probable fk to the same table (next_id).
        // for now use sequence (running number for each room)
        sequence: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true,
        tableName: 'locations',
        freezeTableName: true,
    });

    Location.associate = (models) => {
        Location.belongsTo(models.Gym);
        Location.hasMany(models.Route);
    };

    return Location;
};