const ICrud = require("./interfaces/interfaceCrud");

class MongoDbB extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log("Item created in MongoDB")
    }
}

module.exports = MongoDbB