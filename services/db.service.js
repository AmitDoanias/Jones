const MongoClient = require('mongodb').MongoClient

const config = require('../config')

module.exports = {
    getCollection
}

const dbName = 'ordersDB'
let dbConnection = null

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        throw err
    }
}

async function connect() {
    if (dbConnection) return dbConnection
    try {
        const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        dbConnection = db
        return db
    } catch (err) {
        throw err
    }
}




