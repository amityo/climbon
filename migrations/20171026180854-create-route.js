const gradeEnum = "enum_routes_grade";
const typeEnum = "enum_routes_type";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('routes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            grade: {
                type: Sequelize.ENUM,
                values: ['v0', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9', 'v10',
                    '5c', '6a', '6b', '6c', '7a', '7b', '7c'],
                allowNull: false
            },
            type: {
                type: Sequelize.ENUM,
                values: ['boulder', 'traverse'],
                defaultValue: 'boulder',
                allowNull: false
            },
            color: {
                type: Sequelize.STRING,
                allowNull: false
            },
            setup_date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            is_available: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            end_date: {
                type: Sequelize.DATE,
                allowNull: true
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true
            },
            setters: {
                type: Sequelize.ARRAY(Sequelize.STRING)
            },
            location_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: "locations"
                }
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        })
    },
    down: (queryInterface) => {
        return Promise.all([
            queryInterface.dropTable('routes'),
            queryInterface.sequelize.query(`DROP TYPE ${gradeEnum}`),
            queryInterface.sequelize.query(`DROP TYPE ${typeEnum}`)])
    }
};