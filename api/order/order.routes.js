const express = require('express')
const { getOrders, addOrder } = require('./order.controller')
const router = express.Router()

module.exports = router

router.get('/', getOrders)
router.post('/', addOrder) 