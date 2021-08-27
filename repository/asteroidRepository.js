const asteroid = require("../entity/asteroid");
const baseRepository = require("./baseRepository");

var asteroidRepository = {
  connection: baseRepository.dbConnect(),
  listAsteroids: function (resolve) {
    return this.connection
      .then(function (connection) {
        connection
          .query(`SELECT * FROM "asteroid"`)
          .then(function (rawData) {
            resolve(rawData);
          })
          .catch(function (error) {
            console.log("Error: ", error);
          });
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  },
  listAsteroidsByDateRange: function (startDate, endDate, resolve) {
    return this.connection
      .then(function (connection) {
        connection
          .query(
            `SELECT * FROM "asteroid"
            WHERE date >= '${startDate}'
            AND date <  '${endDate}'`
          )
          .then(function (rawData) {
            resolve(rawData);
          })
          .catch(function (error) {
            console.log("Error: ", error);
          });
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  },
  addAsteroids: function addAsteroids(content, resolve) {
    return this.connection
      .then(function (connection) {
        const repository = connection.getRepository("asteroid");
        repository
          .save(content)
          .then(function (savedContent) {
            console.log("Content has been saved: ", savedContent);

            resolve(content);
          })
          .catch(function (error) {
            console.log("Error: ", error);
          });
      })
      .catch(function (error) {
        console.log("Error: ", error);
      });
  },
};

module.exports = asteroidRepository;
