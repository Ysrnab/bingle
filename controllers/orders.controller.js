
const { Carts, CartItem, Items } = require('../database/models');
const Orders = require('../database/models/orders.model');
const { ErrorResponse } = require('../helpers/error.helper');
const { Response } = require('../helpers/response.helper');
const authorize = require('../middlewares/authorize.middleware')



class OrdersController {
    createOrder = async (req, res, next) => {
        try {
            const {  cartId } = req.body
            const token = req.headers['authorization']
            const user = await authorize.verify(token, "createOrder")

           
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
            
            const { CartItems } = result.dataValues
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
 

            const createdOrder = await Orders.create({
                user_id: user?.user_id,
                status: "pending",
                cart_id: cartId,
                amount: totalPrice
                
            })

            

            return new Response(res, 200, createdOrder)
        } catch (error) {
            next(error)
        }
    }

    updateOrder = async (req, res, next)=>{
        try {
            const token = req.headers['authorization']
            await authorize.verify(token, "updateOrder")

            const result = await Orders.update({
                status: "paid"
            },{
                where: {
                    id: req.body.orderId
                }, 
            })
            console.log(result)
            

            const getData = await Orders.findOne({
                where: {
                    id: req.body.orderId
                }
            })

            const data = {
                id: getData?.id,
                status: getData?.status,
                amount: getData?.amount
            }

            return new Response(res, 200, data)
        } catch (error) {
            next(error)
        }
    }

}

module.exports = { OrdersController }