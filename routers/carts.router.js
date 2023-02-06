const express = require('express')
const { CartsController } = require("../controllers/carts.controller")

const router = express.Router()
const cartsController = new CartsController()


router.get('/carts', cartsController.getCarts)
router.get('/carts/:cartId', cartsController.getCartById)

router.get('/cart-item', cartsController.getCartItem)

router.post('/:cartId/cart-item', cartsController.createCartItem)
router.post('/carts', cartsController.createCart)


module.exports = router
