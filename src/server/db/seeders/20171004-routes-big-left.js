const createRoutes = require('../_helpers').createRoutes;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('routes',
            createRoutes('2017-10-04', ['Tom Dotan', 'Assaf Hili'], 6, [
                { grade: 'v2', color: 'black' },
                { grade: 'v3', color: 'pink' },
                { grade: 'v6', color: 'yellow' },
                { grade: 'v6', color: 'blue' },
                { grade: 'v1', color: 'green' },
                { grade: 'v5', color: 'purple' },
                { grade: 'v9', color: 'black' },
                { grade: 'v2', color: 'pink' },
                { grade: 'v8', color: 'yellow' },
                { grade: 'v0', color: 'purple' },
                { grade: 'v4', color: 'red' },
                { grade: 'v6', color: 'black' },
                { grade: 'v0', color: 'gray' },
                { grade: 'v5', color: 'green' },
                { grade: 'v3', color: 'black' },
                { grade: 'v4', color: 'purple' },
                { grade: 'v8', color: 'pink' },
                { grade: '7b', color: 'brown', type: 'traverse' }
            ])
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('routes', null);
    }
};
