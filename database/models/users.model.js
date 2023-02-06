const { Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize')


class Users extends Model { }

Users.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  full_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "user"
  }
  
}, {
  sequelize: sequelize,
  timestamps: true,
  paranoid: true,
  underscored: true,
  deletedAt: 'deleted_at',
  updatedAt: 'updated_at',
  createdAt: 'created_at'
}, {
  freezeTableName: true
}
)

module.exports = Users;


