const axios = require('axios'),
    config = require('config'),
    apiKey = config.get('ApiKey'),
    asteroidRepository = require('../repository/asteroidRepository');

function getFormattedDate(dayOfMonth) {
    var date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${dayOfMonth}`;
}

function getApiNasaNeoFeedUrl(start, end) {
    const today = new Date().getDate();
    const startDate = typeof start !== 'undefined'
        ? start
        : getFormattedDate(today);
    const endDate = typeof end !== 'undefined'
        ? end
        : getFormattedDate(today + 1);

    return `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
}

function deserializeFeed(data) {
    var result = [];
    var obj = data.near_earth_objects;

    for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            var arr = obj[prop];
            for (var i = 0; i < arr.length; i++) {
                result.push({
                    id: arr[i].id,
                    name: arr[i].name,
                    is_potentially_hazardous: arr[i].is_potentially_hazardous_asteroid,
                    date: prop
                })
            }
        }
    }

    return result;
}

function neoFeed(startDate, endDate, resolve) {
    const url = getApiNasaNeoFeedUrl(startDate, endDate);

    return axios
        .get(url)
        .then(res => {
            console.log(`statusCode: ${res.statusCode}`);
            return res.data;
        })
        .then(data => {
            const content = deserializeFeed(data);
            asteroidRepository.addAsteroids(content, resolve);
        })
        .catch(error => {
            console.error(error)
        });
};

module.exports = {
    neoFeed
}