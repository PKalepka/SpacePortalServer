const baseRepository = require('./baseRepository');

module.exports = class AsteroidRepository {
  _connection = baseRepository.connection.get();

  _result = async (getResponse, createConnection) => {
    try {
      const connection = await createConnection;
      return await getResponse(connection);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  async listAsteroidsByDateRange(startDate, endDate) {
    const getResponse = async (connection) => {
      return await connection
        .getRepository('asteroid')
        .createQueryBuilder('asteroid')
        .where('asteroid.date >= :startDate', { startDate: startDate })
        .andWhere('asteroid.date <= :endDate', { endDate: endDate })
        .getMany();
    };

    return await this._result(getResponse, this._connection);
  }
  async addAsteroids(content) {
    const getResponse = async (connection) => {
      const repository = connection.getRepository('asteroid');
      const savedContent = await repository.save(content);
      console.log('Content has been saved: ', savedContent);

      return content;
    };

    return await this._result(getResponse, this._connection);
  }
};
