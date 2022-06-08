const ContextStrategy = require("./db/strategies/base/contextStrategy");
const MongoDbB = require("./db/strategies/mongodb")
const Postgres = require("./db/strategies/postgres")

const contextMongo = new ContextStrategy(new MongoDbB())

contextMongo.create();

const contextPostgres = new ContextStrategy(new Postgres())

contextPostgres.create();
