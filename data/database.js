const dotenv = require("dotenv");
dotenv.config();

const MongoClient = require("mongodb").MongoClient;
let database;

const initDb = (callback) => {
    if(database) {
        console.log(`Database is already initalized`);
        return callback(null, database);
    }
    MongoClient.connect(process.env.MONGODB_URL)
        .then((client) => {
            database = client;
            callback(null, database);
        }).catch((err) => callback(err));
};

const getDb = () => {
    if(!database) {
        throw Error("Database not Intialized.");
    }
    return database;
};

module.exports = {
    initDb,
    getDb
};