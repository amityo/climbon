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
                type: Sequelize.STRING
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
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        }),
    down: (queryInterface) => queryInterface.dropTable('user_routes')
};