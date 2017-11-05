const createRoutes = require('../_helpers').createRoutes;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('routes',
            createRoutes('2017-09-27', ['Tom Dotan', 'Assaf Hili'], 3, [
                { grade: 'v0', color: 'red' },
                { grade: '5c', color: 'brown', type: 'traverse' },
                { grade: 'v3', color: 'green' },
                { grade: 'v6', color: 'black' },
                { grade: 'v0', color: 'blue' },
                { grade: 'v5', color: 'yellow' },
                { grade: 'v4', color: 'purple' },
                { grade: 'v1', color: 'pink' },
                { grade: 'v0', color: 'purple' },
                { grade: 'v7', color: 'pink' },
                { grade: 'v3', color: 'red' },
                { grade: 'v2', color: 'green' },
                { grade: 'v3', color: 'blue' },
                { grade: 'v4', color: 'yellow' },
                { grade: 'v6', color: 'gray' },
                { grade: 'v0', color: 'red' },
                { grade: 'v2', color: 'yellow' },
                { grade: 'v4', color: 'green' },
                { grade: 'v1', color: 'blue' },
                { grade: 'v4', color: 'purple' },
                { grade: 'v5', color: 'blue' },
                { grade: 'v1', color: 'red' }
            ])
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('routes', null);
    }
};
