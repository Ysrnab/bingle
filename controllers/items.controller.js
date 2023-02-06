const Items = require('../database/models/items.model')
const Users = require('../database/models/users.model')
const { Response } = require('../helpers/response.helper')
const authorize = require('../middlewares/authorize.middleware')

class ItemsController {
    getItems = async (req, res, next) => {
        try {
            
            const token = req.headers['authorization']
            await authorize.verify(token, "getItems")

            // const { page = '1', limit = '5' } = req.query
            // const pageInt = Number(page)
            // const limitInt = Number(limit)
            // const offset = (pageInt - 1) * limitInt

            const data = await Items.findAll({
                attributes: ['id', 'name', 'price', 'stock'],
                // limit: limitInt,
                // offset: offset,
                include: [{
                    model: Users,
                    as: 'owner',
                    attributes: ['id', 'full_name']
                }]
            });

            return new Response(res, 200, data)
        } catch (error) {
            next(error)

        }
    }

    getItemsById = async (req, res, next) => {
        try {
            const token = req.headers['authorization']
            await authorize.verify(token, "getItemsById")

            const data = await Items.findOne({
                where: {
                    id: req.params.id
                }, attributes: ['id', 'name', 'price', 'stock']
            });

            return new Response(res, 200, data)
        } catch (error) {
            next(error)

        }
    }

    insertItems = async (req, res, next) => {
        try {
            const token = req.headers['authorization']
            await authorize.verify(token, "insertItems")

            const data = {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock
            }
            await Items.create(req.body);

            return new Response(res, 200, data)
        } catch (error) {
            next(error)
        }
    }

    updateItems = async (req, res, next) => {
        try {
            const token = req.headers['authorization']
            await authorize.verify(token, "updateItems")

            const data = {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
            }
            await Items.update(req.body, {
                where: {
                    id: req.params.id
                }
            })

            return new Response(res, 200, data)
        } catch (error) {
            next(error)
        }
    }

    deleteItems = async (req, res, next) => {
        try {
            const token = req.headers['authorization']
            await authorize.verify(token, "deleteItems")

            const data = {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock
            }
            await Items.destroy({
                where: { id: req.params.id }
            }
            )
            return new Response(res, 200)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { ItemsController }