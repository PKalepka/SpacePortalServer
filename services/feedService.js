const AsteroidRepository = require('../repository/asteroidRepository');
const ExternalService = require('./externalService');
const AsteroidMapper = require('../mapper/asteroid.mapper');

module.exports = class FeedApi {
  _asteroidRepository = new AsteroidRepository();

  _externalService = new ExternalService();

  _asteroidMapper = new AsteroidMapper();

  _getFormattedDate(dayOfMonth) {
    return `${dayOfMonth.getFullYear()}-${dayOfMonth.getMonth()}-${dayOfMonth.getDate()}`;
  }

  _getDateRange(start, end) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const startDate = typeof start !== 'undefined' ? start : this._getFormattedDate(today);
    const endDate = typeof end !== 'undefined' ? end : this._getFormattedDate(tomorrow);

    return { startDate, endDate };
  }

  async handleNewAsteroids(startDate, endDate) {
    var newAsteroids = await this._externalService.getFeedOnline(startDate, endDate);
    const content = this._asteroidMapper.fromApi(newAsteroids);
    await this._asteroidRepository.addAsteroids(content);

    return content;
  }

  async neoFeed(start, end) {
    const { startDate, endDate } = this._getDateRange(start, end);
    const content = await this._asteroidRepository.listAsteroidsByDateRange(startDate, endDate);

    return content.length === 0 ? await this.handleNewAsteroids(startDate, endDate) : content;
  }
};
