const axios = require("axios");
const config = require("config");
const apiKey = config.get("ApiKey");
const asteroidRepository = require("../repository/asteroidRepository");

function getFormattedDate(dayOfMonth) {
  var date = new Date();
  return `${date.getFullYear()}-${date.getMonth()}-${dayOfMonth}`;
}

function getApiNasaNeoFeedUrl(startDate, endDate) {
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
          reference_id: arr[i].neo_reference_id,
          name: arr[i].name,
          is_potentially_hazardous: arr[i].is_potentially_hazardous_asteroid,
          date: prop,
          nasa_jpl_url: arr[i].nasa_jpl_url,
        });
      }
    }
  }

  return result;
}

function getFeedOnline(startDate, endDate, resolve) {
  const url = getApiNasaNeoFeedUrl(startDate, endDate);

  return axios
    .get(url)
    .then((res) => {
      console.log(`statusCode: ${res.statusCode}`);
      return res.data;
    })
    .then((data) => {
      const content = deserializeFeed(data);
      asteroidRepository.addAsteroids(content, resolve);
    })
    .catch((error) => {
      console.error(error);
    });
}

function neoFeed(start, end, resolve) {
  const today = new Date().getDate();
  const startDate =
    typeof start !== "undefined" ? start : getFormattedDate(today);
  const endDate =
    typeof end !== "undefined" ? end : getFormattedDate(today + 1);

  return asteroidRepository.listAsteroidsByDateRange(
    startDate,
    endDate,
    (content) => {
      content.length !== 0
        ? resolve(content)
        : getFeedOnline(startDate, endDate, resolve);
    }
  );
}

module.exports = {
  neoFeed,
};
