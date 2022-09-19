const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/require.auth.middleware')
// const { getToys, getToyById, addToy, updateToy, removeToy } = require('./order.controller')
const { getOrders, addOrder } = require('./order.controller')
const router = express.Router()

module.exports = router

router.get('/', getOrders)
// router.get('/:toyId', getToyById)
router.post('/', requireAuth, requireAdmin, addOrder) /* FIX - remove auth of admin, one has to stay since we need owner */
// router.put('/', requireAuth, requireAdmin, updateToy) /* FIX - remove auth of admin, one has to stay since we need owner */
// router.delete('/:toyId', requireAuth, requireAdmin, removeToy) /* FIX - remove auth of admin, one has to stay since we need owner */