const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

const COLLECTION_NAME = 'orders'

module.exports = {
    query,
    addOrder,
}

async function query() {
    let criteria = {}

    const utcTime = new Date()
    const midNight = new Date(utcTime.setUTCHours(0, 0, 0, 0))

    criteria.createdAt = {
        $gte: midNight
    }

    try {
        const collection = await dbService.getCollection(COLLECTION_NAME)
        let orders = await collection.find(criteria).toArray()
        return orders
    } catch (err) {
        console.log(`ERROR: cannot find orders (order.service - query)`, err)
        throw err
    }
}

async function addOrder(order) {

    let { meal, price, user } = order
    try {
        const collection = await dbService.getCollection(COLLECTION_NAME)

        const newOrder = {
            meal: meal,
            price: price,
            createdAt: _changeTimeZone(new Date()),

            user: {
                _id: ObjectId(user.userId),
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                creditCard: user.creditCard,
            },
        }
        const res = await collection.insertOne(newOrder)
        if (!res.insertedId) return null
        newOrder._id = res.insertedId
        return newOrder

    } catch (err) {
        console.log('ERROR: cannot add order (order.service - add)', err)
        throw err
    }
}

function _changeTimeZone(date) {
    const tzOffSet = date.getTimezoneOffset() * 60 * 1000
    return (new Date(Date.now() - tzOffSet))
}
