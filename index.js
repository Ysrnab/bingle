const app = require('./app')
const dotenv = require('dotenv')
// const Users = require('./models/users.model')

dotenv.config()
const port = process.env.PORT

app.listen(port, ()=> {
    console.log(`server runing on port ${port}`)
})
