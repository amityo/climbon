const dbHelpers = require('../_helpers');

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            admin: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: dbHelpers.currentTimestamp()
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: dbHelpers.currentTimestamp()
            }
        }),
    down: (queryInterface) => queryInterface.dropTable('users')
};