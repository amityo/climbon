const dbHelpers = require('../_helpers');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('gyms', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            address: {
                type: Sequelize.STRING,
                allowNull: false
            },
            website: {
                type: Sequelize.STRING,
                allowNull: false
            },
            image: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: dbHelpers.currentTimestamp()
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: dbHelpers.currentTimestamp()
            }
        })
    },
    down: (queryInterface) => queryInterface.dropTable('gyms')
};