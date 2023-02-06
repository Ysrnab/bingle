const express = require("express")
const userRouter = require('./routers/users.router')
const itemRouter = require('./routers/items.router')
const cartRouter = require('./routers/carts.router')
const orderRouter = require('./routers/orders.router')

const app = express()

app.use(express.json())

app.use('/v1', itemRouter)
app.use('/v1', userRouter)
app.use('/v1', cartRouter)
app.use('/v1', orderRouter)

// error handler
app.use((err, req, res, next) =>{
    console.log(err)

    return res.status(err.status).json({
        status: false,
        data: {},
        error: err.error
    })
})


module.exports = app