const Users = require("./users.model")
const Items = require("./items.model")
const sequelize = require("./sequelize")
const Orders = require("./orders.model")
const CartItem = require("../models/cart-item.model")
const Carts = require("./carts.model")


//relasi item dan user
Items.belongsTo(Users, {
  foreignKey: 'user_id',
  as: 'owner'
})

Users.hasMany(Items, {
  as: 'Items'
})


// relasi order dan user
Orders.belongsTo(Users, {
  foreignKey: 'user_id'

})
Users.hasMany(Orders, {
  as: 'orders'
})

//relasi item - cart item - cart
CartItem.belongsTo(Items, {
  foreignKey: 'item_id'
})

Items.hasMany(CartItem, {
  as: 'cartItem'
})

CartItem.belongsTo(Carts, {
  foreignKey: 'cart_id'
})

Carts.hasMany(CartItem, {
  foreignKey: 'cart_id'

})

// relasi cart dan item
Carts.belongsToMany(Items, {through: CartItem})
Items.belongsToMany(Carts, {through: CartItem})

// relasi cart User
Carts.belongsTo(Users, {
  foreignKey: 'user_id'

})
Users.hasMany(Carts, {
  as: 'carts'
})

// //relasi order cart
// Carts.belongsTo(Orders, {
  

// })
// Orders.hasMany(Carts, {
//   as: 'carts',
//   foreignKey: 'cart_id'
// })

module.exports = {
  Users,
  Items,
  sequelize,
  Orders,
  CartItem,
  Carts
}