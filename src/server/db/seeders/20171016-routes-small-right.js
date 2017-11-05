const createRoutes = require('../_helpers').createRoutes;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('routes',
            createRoutes('2017-10-16', ['Nimrod Marcus', 'Assaf Hili'], 2, [
                { grade: 'v3', color: 'purple' },
                { grade: 'v4', color: 'yellow' },
                { grade: 'v2', color: 'pink' },
                { grade: 'v3', color: 'green' },
                { grade: 'v0', color: 'gray' },
                { grade: 'v2', color: 'purple' },
                { grade: 'v6', color: 'blue' },
                { grade: 'v10', color: 'black' },
                { grade: 'v7', color: 'gray' },
                { grade: 'v1', color: 'yellow' },
                { grade: 'v5', color: 'blue' },
                { grade: 'v6', color: 'red' },
                { grade: 'v5', color: 'black' },
                { grade: 'v0', color: 'green' },
                { grade: 'v2', color: 'yellow' },
                { grade: 'v1', color: 'green' },
                { grade: '7a', color: 'brown', type: 'traverse' },
                { grade: 'v0', color: 'purple' }
            ])
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('routes', null);
    }
};
