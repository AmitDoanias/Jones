const toyService = require('./order.service')

module.exports = {
    getOrders,
    addOrder,
}

async function getOrders(req, res) {
    try {
        const filterBy = req.query
        const toys = await toyService.query(filterBy || '{}')
        res.send(toys)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function addOrder(req, res) {
    try {
        let toy = req.body
        const savedToy = await toyService.add(toy)
        if (!savedToy) return res.status(401).send('Failed to add toy')
        res.send(savedToy)
    } catch (err) {
        res.status(500).send({ err: 'Failed to add toy' })
    }
}

