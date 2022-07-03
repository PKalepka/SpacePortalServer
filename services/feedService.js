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

    const startDate = typeof start !== 'undefined' ? new Date(Number(start)) : today;
    const endDate = typeof end !== 'undefined' ? new Date(Number(end)) : tomorrow;

    return { startDate, endDate };
  }

  _getDateRangeFormatted(start, end) {
    return {
      startFormatted: this._getFormattedDate(start),
      endFormatted: this._getFormattedDate(end),
    };
  }

  async _handleNewAsteroids(startDate, endDate) {
    var newAsteroids = await this._externalService.getFeedOnline(startDate, endDate);
    const content = this._asteroidMapper.fromApi(newAsteroids);
    await this._asteroidRepository.addAsteroids(content);

    return content;
  }

  async _handleAsteroidsIfNotExists(start, end) {
    if (start < end) {
      const { startFormatted, endFormatted } = this._getDateRangeFormatted(start, end);
      await this._handleNewAsteroids(startFormatted, endFormatted);
    }
  }

  async neoFeed(start, end) {
    const { startDate, endDate } = this._getDateRange(start, end);
    const { startFormatted, endFormatted } = this._getDateRangeFormatted(startDate, endDate);
    const minCachedDate = (await this._asteroidRepository.getAsteroidsMinDate()).value;
    const maxCachedDate = (await this._asteroidRepository.getAsteroidsMaxDate()).value;

    // if cache is empty
    // or
    // if date range of request doesn't intersect with total date range of cached objects
    const count = await this._asteroidRepository.getAsteroidsCount();
    if (count === 0 || endDate < minCachedDate || maxCachedDate < startDate) {
      return await this._handleNewAsteroids(startFormatted, endFormatted);
    }

    // otherwise add not existed objects into cache
    await this._handleAsteroidsIfNotExists(startDate, minCachedDate);
    await this._handleAsteroidsIfNotExists(maxCachedDate, endDate);

    // ASSUMPTION: we`re assuming that cached date range wasn't interrupted and cache already contains all necessary objects inside cached date range
    // If assumption is wrong than response will contain cahed objects only
    return await this._asteroidRepository.listAsteroidsByDateRange(startFormatted, endFormatted);
  }
};
