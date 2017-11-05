const createRoutes = require('../_helpers').createRoutes;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('routes',
            createRoutes('2017-10-11', ['Ram Levin', 'Shuky Chen'], 1, [
                { grade: 'v2', color: 'black' },
                { grade: 'v5', color: 'red' },
                { grade: 'v1', color: 'purple' },
                { grade: 'v5', color: 'pink' },
                { grade: 'v8', color: 'yellow' },
                { grade: 'v4', color: 'gray' },
                { grade: 'v6', color: 'black' },
                { grade: 'v3', color: 'red' },
                { grade: 'v0', color: 'yellow' },
                { grade: 'v1', color: 'blue' }
            ])
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('routes', null);
    }
};
