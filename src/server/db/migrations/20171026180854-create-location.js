const dbHelpers = require('../_helpers');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('locations', {
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
            room: {
                type: Sequelize.STRING,
                allowNull: false
            },
            section: {
                type: Sequelize.STRING,
                allowNull: false
            },
            sequence: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            gym_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'gyms'
                }
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
    down: (queryInterface) => queryInterface.dropTable('locations')
};