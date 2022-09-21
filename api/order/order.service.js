const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

const COLLECTION_NAME = 'orders'

module.exports = {
    query,
    addOrder,
}

async function query() {
    let criteria = {}

    //Option 1: 
    // const midNight = new Date()
    // midNight.setHours(3, 0, 0, 0)

    //Option 2:
    utcTime = new Date()
    midNight = new Date(utcTime.setUTCHours(0, 0, 0, 0))

    criteria.createdAt = {
        $gte: midNight
    }

    console.log('criteria', criteria)
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
    try {
        const collection = await dbService.getCollection(COLLECTION_NAME)

        const newOrder = {
            meal: order.meal,
            price: order.price,
            createdAt: _changeTimeZone(new Date()),

            user: {
                _id: ObjectId(order.user.userId),
                firstName: order.user.firstName,
                lastName: order.user.lastName,
                address: order.user.address,
                creditCard: order.user.creditCard,
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
    let tzoffset = date.getTimezoneOffset() * 60 * 1000
    return (new Date(Date.now() - tzoffset))
}
