const { DataTypes, Model } = require('sequelize');
const sequelize = require('./sequelize')


class Orders extends Model { }

Orders.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  amount: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    dialectTypes: 'cart_id'
  },
}, {
  sequelize: sequelize,
  timestamps: true,
  paranoid: true,
  underscored: true,
  deletedAt: 'deleted_at',
  updatedAt: 'updated_at',
  createdAt: 'created_at',
  tableName: 'orders',
  freezeTableName: true
}
)

module.exports = Orders;


