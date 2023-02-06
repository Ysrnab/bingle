const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize')


class Carts extends Model { }

Carts.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'pending'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        dialectTypes: 'user_id'
    }
}, {
    sequelize: sequelize,
    timestamps: true,
    paranoid: true,
    underscored: true,
    deletedAt: 'deleted_at',
    updatedAt: 'updated_at',
    createdAt: 'created_at',
    tableName: 'carts'
    
},{
    freezeTableName: true}
)

module.exports = Carts;


