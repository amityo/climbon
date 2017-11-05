module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('gyms', [{
            id: 1,
            name: 'Performance Rock',
            address: 'Rival 3, Tel Aviv-Yafo',
            website: 'http://www.performancerock.co.il',
            image: 'http://www.tlv.performancerock.co.il/images/main_logo.png'
        }]);

    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.bulkDelete('locations', null, {}),
            queryInterface.bulkDelete('gyms', null, {}),
        ])
    }
};
