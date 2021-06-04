const typeorm = require('typeorm'),
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

module.exports = {
    dbConnect
}