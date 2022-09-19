const orderService = require('./order.service')

module.exports = {
    getOrders,
    addOrder,
}

async function getOrders(req, res) {
    console.log('inside getOrders from controller')
    try {
        const filterBy = req.query
        const orders = await orderService.query(filterBy || '{}')
        res.send(orders)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function addOrder(req, res) {
    try {
        console.log('addOrder controller')
        let order = req.body
        const savedOrder = await orderService.add(order)
        console.log('savedOrder', savedOrder)
        if (!savedOrder) return res.status(401).send('Failed to add order')
        res.send(savedOrder)
    } catch (err) {
        res.status(500).send({ err: 'Failed to add order' })
    }
}

