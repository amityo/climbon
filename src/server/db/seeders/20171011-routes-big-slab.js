const createRoutes = require('../_helpers').createRoutes;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('routes',
            createRoutes('2017-10-11', ['Ram Levin', 'Shuky Chen'], 4, [
                { grade: 'v3', color: 'pink' },
                { grade: 'v5', color: 'black' },
                { grade: 'v4', color: 'blue' },
                { grade: 'v7', color: 'yellow' },
                { grade: 'v6', color: 'red' },
                { grade: 'v0', color: 'yellow' },
                { grade: 'v1', color: 'red' },
                { grade: 'v5', color: 'black' },
                { grade: 'v3', color: 'green' }
            ])
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('routes', null);
    }
};
