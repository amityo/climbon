const dbHelpers = require('../_helpers');

const FINISH_TYPE_ENUM = 'enum_user_routes_finish_type';

module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.createTable('user_routes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            finish_type: {
                type: Sequelize.ENUM,
                values: ['flash', 'onsight', 'send'],
                defaultValue: 'send'
            },
            completion_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                defaultValue: dbHelpers.currentDate()
            },
            number_of_tries: {
                type: Sequelize.INTEGER,
                defaultValue: -1,
                validate: { min: -1, max: 10 }
            },
            route_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'routes'
                }
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users'
                }
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
    down: (queryInterface) =>
        Promise.all([
            queryInterface.dropTable('user_routes'),
            queryInterface.sequelize.query(`DROP TYPE ${FINISH_TYPE_ENUM}`),
        ])
};