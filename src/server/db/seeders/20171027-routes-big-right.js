const createRoutes = require('../_helpers').createRoutes;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('routes',
            createRoutes('2017-10-27', ['Assaf Hili', 'Shuky Chen'], 5, [
                { grade: 'v2', color: 'yellow' },
                { grade: 'v0', color: 'red' },
                { grade: 'v4', color: 'purple' },
                { grade: 'v1', color: 'blue' },
                { grade: 'v3', color: 'black' },
                { grade: 'v4', color: 'green' },
                { grade: 'v7', color: 'red' },
                { grade: 'v1', color: 'gray' },
                { grade: 'v5', color: 'blue' },
                { grade: 'v8', color: 'yellow' },
                { grade: 'v3', color: 'black' },
                { grade: 'v5', color: 'red' },
                { grade: 'v5', color: 'gray' },
                { grade: '6c', color: 'brown', type: 'traverse' },
                { grade: 'v6', color: 'pink' },
                { grade: 'v6', color: 'black' },
                { grade: 'v7', color: 'yellow' },
                { grade: 'v6', color: 'green' },
                { grade: 'v2', color: 'blue' },
            ])
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('routes', null);
    }
};
