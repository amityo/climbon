const User = require('../../models').User;
const Route = require('../../models').Route;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return User
            .findOne({ where: { username: 'Admin' }, attributes: ['id'] })
            .then(u => {
                return Route
                    .findOne({ attributes: ['id']})
                    .then(route => {
                        return queryInterface.bulkInsert('user_routes', [{
                            finish_type: 'flash',
                            number_of_tries: 1,
                            user_id: u.id,
                            route_id: route.id
                        }]);
                    })
            });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('user_routes', null, {})
    }
};
