const orderService = require('./order.service')

module.exports = {
    getOrders,
    addOrder,
}

async function getOrders(req, res) {
    try {
        const orders = await orderService.query()
        res.send(orders)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get orders' })
    }
}

async function addOrder(req, res) {
    try {
        let order = req.body
        const savedOrder = await orderService.addOrder(order)
        if (!savedOrder) return res.status(401).send('Failed to add order')
        res.send(savedOrder)
    } catch (err) {
        res.status(500).send({ err: 'Failed to add order' })
    }
}

