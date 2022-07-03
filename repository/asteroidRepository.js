const baseRepository = require('./baseRepository');

module.exports = class AsteroidRepository {
  _getConnection = async () => await baseRepository.connection.get();

  listAsteroidsByDateRange = async (startDate, endDate) => {
    const connection = await this._getConnection();

    return connection
      .getRepository('asteroid')
      .createQueryBuilder('asteroid')
      .where('asteroid.date >= :startDate', { startDate: startDate })
      .andWhere('asteroid.date <= :endDate', { endDate: endDate })
      .getMany();
  };

  getAsteroidsMinDate = async () => {
    const connection = await this._getConnection();

    return connection
      .getRepository('asteroid')
      .createQueryBuilder('asteroid')
      .select("MIN(asteroid.date)", "value")
      .getRawOne();
  };

  getAsteroidsMaxDate = async () => {
    const connection = await this._getConnection();

    return connection
      .getRepository('asteroid')
      .createQueryBuilder('asteroid')
      .select("MAX(asteroid.date)", "value")
      .getRawOne();
  };

  getAsteroidsCount = async () => {
    const connection = await this._getConnection();

    return connection
      .getRepository('asteroid')
      .createQueryBuilder('asteroid')
      .select("COUNT(asteroid.id)", "Count")
      .getRawOne();
  };

  addAsteroids = async (content) => {
    const connection = await this._getConnection();
    const repository = connection.getRepository('asteroid');
    const savedContent = await repository.save(content);
    console.log('Content has been saved: ', savedContent);

    return content;
  };
};
