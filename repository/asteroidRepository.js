const typeorm = require('typeorm'),
    asteroid = require('../entity/asteroid'),
    EntitySchema = typeorm.EntitySchema;

function dbConnect() {
    return typeorm.createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "sa",
        database: "postgres",
        synchronize: true,
        entities: [new EntitySchema(require("../entity/asteroid"))]
    })
}

function listAsteroids(resolve) {
    return dbConnect().then(function (connection) {
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
    return dbConnect().then(function (connection) {
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