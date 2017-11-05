const User = require('../../models').User;
const usersController = require('../../controllers').users;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return usersController.create({
            body: {
                username: 'Test',
                password: 'Password1',
            }
        }).then(res => res);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null);
    }
};
