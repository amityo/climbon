const User = require('../../models').User;
const usersController = require('../../controllers').users;

module.exports = {
    up: (queryInterface, Sequelize) => {
        return usersController.create({
            body: {
                username: 'Admin',
                password: 'Password1',
            }
        }).then(user => {
            User.update({
                admin: true
            }, {where : {id: user.id}})
            .then(res => res);
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null);
    }
};
