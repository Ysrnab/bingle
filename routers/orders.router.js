const express = require('express')
const {OrdersController} = require("../controllers/orders.controller")

const router = express.Router()


router.post('/order', new OrdersController().createOrder)
router.patch('/order', new OrdersController().updateOrder)




module.exports = router;