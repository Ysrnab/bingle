const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize')


class CartItem extends Model { }

CartItem.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    qty: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        dialectTypes: 'cart_id'
    },
    item_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        dialectTypes: 'item_id'
    }
}, {
    sequelize: sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    tableName: 'cart_item',
    freezeTableName: true
}
)

module.exports = CartItem;


