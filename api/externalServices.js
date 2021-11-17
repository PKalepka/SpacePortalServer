const axios = require('axios');

module.exports = class ExternalService {
  _getApiNasaNeoFeedUrl = (startDate, endDate) => `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.DEV_API_KEY}`;

  async getFeedOnline(startDate, endDate) {
    const url = this._getApiNasaNeoFeedUrl(startDate, endDate);
    const getData = (res) => {
      console.log(`statusCode: ${res.statusCode}`);
      return res.data;
    };
    const response = await axios.get(url);

    return getData(response);
  }
};
