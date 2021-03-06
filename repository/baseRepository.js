const typeorm = require('typeorm');
const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;

const connection = (function () {
  var instance;

  var createInstance = function () {
    return typeorm.createConnection({
      type: process.env.DEV_CONNECTION_TYPE,
      host: process.env.DEV_CONNECTION_HOST,
      port: process.env.DEV_CONNECTION_PORT,
      username: process.env.DEV_CONNECTION_USERNAME,
      password: process.env.DEV_CONNECTION_PWD,
      database: process.env.DEV_CONNECTION_DATABASE,
      synchronize: process.env.DEV_CONNECTION_SYNC,
      entities: [`${__dirname}/../**/*{.entity, .view}.js`],
      namingStrategy: new SnakeNamingStrategy(),
    });
  };

  return {
    get: () => {
      return instance || (instance = createInstance());
    },
    close: async () => {
      if (instance) {
        const connection = await instance;
        await connection.close();
        console.log('Database connection have been closed.');
      } else {
        console.log('Database connection was closed.');
      }
    },
  };
})();

module.exports = {
  connection,
};
