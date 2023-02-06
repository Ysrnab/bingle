const express = require('express')
const UsersController = require("../controllers/users.controller")
const authorize = require('../middlewares/authorize.middleware')

const router = express.Router()


// users access
router.get('/users', new UsersController().getUsers)
router.get('/users/:id', new UsersController().getUsersById)
router.post('/register', new UsersController().register)
router.post('/login', new UsersController().login)


// admin access



module.exports = router;