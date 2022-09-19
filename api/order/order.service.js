const dbService = require('../../services/db.service')
const alsService = require('../../services/als.service')
const ObjectId = require('mongodb').ObjectId


const COLLECTION_NAME = 'order'

module.exports = {
    query,
    add,
}

async function query(filterBy) {
    let criteria = {}
    let { name, inStock, labels, sortBy } = filterBy

    if (name) {
        const regex = new RegExp(name, 'i')
        criteria.name = { $regex: regex }
    }

    if (inStock) {
        inStock = inStock === 'true'
        criteria.inStock = inStock
    }

    if (labels && labels.length > 0) {
        criteria.labels = { $in: labels }
    }

    try {
        const collection = await dbService.getCollection(COLLECTION_NAME)
        let orders = await collection.find(criteria)
        if (sortBy) orders.collation({ locale: 'en' }).sort({ [sortBy]: 1 }) //collation make it case insensitive

        orders = await orders.toArray()

        orders = orders.map(order => {
            order.createdAt = ObjectId(order._id).getTimestamp()
            return order
        })

        return orders
    } catch (err) {
        console.log(`ERROR: cannot find orders (order.service - query)`)
        console.log('err', err)
        throw err
    }
}

async function add(order) {
    try {
        const { loggedInUser } = alsService.getStore()
        const collection = await dbService.getCollection(COLLECTION_NAME)

        const newOrder = {
            name: order.name,
            img: order.img,
            price: order.price,
            labels: order.labels,
            inStock: order.inStock,
            owner: {
                _id: ObjectId(loggedInUser._id),
                fullname: loggedInUser.fullname
            },
        }

        const res = await collection.insertOne(newOrder)
        if (!res.insertedId) return null //will cause error 401
        newOrder._id = res.insertedId
        return newOrder
    } catch (err) {
        console.log('ERROR: cannot add order (order.service - add)')
        console.log('err', err)
        throw err
    }
}
