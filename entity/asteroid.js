module.exports = {
    name: "asteroid",
    columns: {
        id: {
            primary: true,
            type: "integer",
            generated: false
        },
        name: {
            type: "text"
        },
        is_potentially_hazardous: {
            type: "boolean"
        },
        date: {
            type: "text"
        }
    }
};