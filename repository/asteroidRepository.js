const typeorm = require('typeorm'),
    asteroid = require('../entity/asteroid'),
    baseRepository = require('./baseRepository'),
    EntitySchema = typeorm.EntitySchema;

function listAsteroids(resolve) {
    return baseRepository.dbConnect().then(function (connection) {
        connection.query(`SELECT * FROM "asteroid"`).then(function (rawData) {
            resolve(rawData);
        }).catch(function (error) {
            console.log("Error: ", error);
        });
    }).catch(function (error) {
        console.log("Error: ", error);
    });
}

function addAsteroids(content, resolve) {
    return baseRepository.dbConnect().then(function (connection) {
        const repository = connection.getRepository("asteroid");
        repository.save(content).then(function (savedContent) {
            console.log("Content has been saved: ", savedContent);

            resolve(content);
        }).catch(function (error) {
            console.log("Error: ", error);
        });
    }).catch(function (error) {
        console.log("Error: ", error);
    });
}

module.exports = {
    listAsteroids,
    addAsteroids
}