
const { Response } = require('../helpers/response.helper')
const authorize = require('../middlewares/authorize.middleware')
const { Users, Items, Carts, CartItem } = require('../database/models')
const { ErrorResponse } = require('../helpers/error.helper')


class CartsController {
    getCarts = async (req, res, next) => {
        try {
            const token = req.headers['authorization']
            await authorize.verify(token, "getCarts")
            const result = await Carts.findAll({
                attributes: ['id', 'user_id', 'amount', 'created_at', 'updated_at']
            })
            // console.log(result)
            return new Response(res, 200, result)
        } catch (error) {
            next(error)
        }
    }
    getCartById = async (req, res, next) => {
        try {
            const token = req.headers['authorization']
            const user = await authorize.verify(token, "getCartById")


            const cartId = req.params.cartId

            const result = await Carts.findOne({
                where: {
                    user_id: user?.user_id,
                    id : cartId
                },
                include: {
                    model: CartItem,
                    attributes: ['qty'],
                    include: {
                        model: Items,
                        attributes: ['name', 'price']
                    }
                }
            })
            
            const {id,status, created_at, CartItems } = result.dataValues
            const arrCartItems = []
            let totalPrice = 0
            for(let i = 0; i < CartItems.length; i++){
                const item = CartItems[i]
                const itemData = item?.Item?.dataValues
                const totalItemPrice = itemData?.price * item?.qty
                totalPrice += totalItemPrice
                arrCartItems.push({
                    name: itemData?.name,
                    qty : item?.qty,
                    totalItemPrice: totalItemPrice
                })
            }

            const callback = {
                id: id,
                status: status,
                total_price: totalPrice,
                cart_items: arrCartItems,
                created_at: created_at,
            }

            return new Response(res, 200, callback)

        } catch (error) {
            next(error)
        }
    }

    getCartItem = async (req, res, next) => {
        try {
            const token = req.headers['authorization']
            await authorize.verify(token, "getCartItem")


            const result = await CartItem.findAll({
                include: [{
                    model: Items,
                    attributes: ['id', 'name', 'price']
                }, {
                    model: Carts,
                    attributes: ['id', 'user_id', 'status', 'amount', 'created_at', 'updated_at']
                }]
            })
            return new Response(res, 200, result)

        } catch (error) {
            next(error)
        }
    }

    createCart = async (req, res, next) => {
        try {
            const { userId } = req.body
            const token = req.headers['authorization']
            await authorize.verify(token, "createCart")

            const cart = await Carts.findOne({
                where: {
                    user_id: userId,
                    status: 'pending'
                }
            })
            //status deafaul "pending"
            // const total = 1000

            if (!cart) {
                const addCart = await Carts.create({
                    user_id: userId
                })
                return new Response(res, 200, addCart)
            }

            throw new ErrorResponse(422, "You have pending cart")



        } catch (error) {
            next(error)
        }
    }

    createCartItem = async (req, res, next) => {
        try {
            const token = req.headers['authorization']
            await authorize.verify(token, "createCartItem")

            const addCartItem = await CartItem.create({
                cart_id: req.params.cartId,
                item_id: req.body.itemId,
                qty: req.body.qty

            })
            return new Response(res, 200, addCartItem)
        } catch (error) {
            next(error)
        }
    }

   

}

module.exports = { CartsController }