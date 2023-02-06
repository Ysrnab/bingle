const express = require('express')
const { ItemsController } = require("../controllers/items.controller")

const router = express.Router()
const itemsController = new ItemsController()


router.get('/items', itemsController.getItems)
router.get('/items/:id', itemsController.getItemsById)
router.post('/items', itemsController.insertItems)
router.patch('/items/:id', itemsController.updateItems)
router.delete('/items/:id', itemsController.deleteItems)


module.exports = router
