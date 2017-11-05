const CONSTRAINT_NAME = 'route_user_unique'

module.exports = {
    up: (queryInterface) => {
        return queryInterface.addConstraint('user_routes', ['route_id', 'user_id'], {
            type: 'unique',
            name: CONSTRAINT_NAME
        })
    },
    down: (queryInterface) => queryInterface.removeConstraint('user_routes', CONSTRAINT_NAME)
};

