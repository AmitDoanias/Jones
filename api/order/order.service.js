const dbService = require('../../services/db.service')
const alsService = require('../../services/als.service')
const ObjectId = require('mongodb').ObjectId


const COLLECTION_NAME = 'orders'

module.exports = {
    query,
    add,
}

async function query(filterBy) {
    console.log('inside query from service')
    let criteria = {}
    try {
        const collection = await dbService.getCollection(COLLECTION_NAME)
        let orders = await collection.find(criteria).toArray()

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
    console.log('ORDER', order)
    try {
        const collection = await dbService.getCollection(COLLECTION_NAME)

        const newOrder = {
            meal: order.meal,
            price: order.price,
            createdAt: order.createdAt = ObjectId(order._id).getTimestamp(),
            user: {
                _id: ObjectId(order.user.userId),
                firstName: order.user.firstName,
                lastName: order.user.lastName,
                address: order.user.address,
                creditCard: order.user.creditCard
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



// [
//     {
//         "meal": "Meat,Sushi",
//         "price": "154",
//         "user": {
//             "userId": "0",
//             "firstName": "Dudi",
//             "lastName": "Cohen",
//             "address": "Hatizmoret 40",
//             "creditCard": "5324102910102948"
//         }
//     },
//     {
//         "meal": "Pizza,Coca Cola",
//         "price": "89",
//         "user": {
//             "userId": "1",
//             "firstName": "Menny",
//             "lastName": "Levi",
//             "address": "Hatizmoret 42",
//             "creditCard": "5324102912941038"
//         }
//     }
// ]