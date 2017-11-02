const Sequelize = require('sequelize');

module.exports = {
    currentTimestamp() {
        return Sequelize.literal('CURRENT_TIMESTAMP');
    },

    currentDate() {
        return Sequelize.literal('CURRENT_DATE');
    },

    createRoutes(date, setters, locationId, routes) {
        return routes.map((route) => 
            createRoute(
                route.grade,
                route.color,
                date, 
                setters, 
                locationId, 
                route.type || 'boulder'));
    }
};

function createRoute(grade, color, setupDate, setters, locationId, type = 'boulder') {
    return {
        grade: grade,
        type: type,
        color: color,
        setup_date: setupDate,
        setters: setters,
        location_id: locationId
    }
}