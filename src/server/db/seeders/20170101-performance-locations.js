
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('locations', [
            createLocation('Cave Small Room', 'Small', 'Right', 1, id = 1),
            createLocation('Right Small Room', 'Small', 'Right', 2, id = 2),
            createLocation('Left Small Room', 'Small', 'Left', 3, id = 3),
            createLocation('Slab Big Room', 'Big', 'Right', 1, id = 4),
            createLocation('Right Big Room', 'Big', 'Right', 2, id = 5),
            createLocation('Left Big Room', 'Big', 'Left', 3, id = 6)
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('locations', null);
    }
};

const GYM_ID = 1;

function createLocation(name, room, section, seq, id = null) {
    res = {
        name: name,
        room: room,
        section: section,
        sequence: seq,
        gym_id: GYM_ID
    };
    if (id) res['id'] = id;
    return res;
}

