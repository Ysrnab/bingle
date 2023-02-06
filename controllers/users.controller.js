const Users = require("../database/models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ErrorResponse } = require("../helpers/error.helper");
const { Response } = require('../helpers/response.helper');
const { validate } = require("../middlewares/validation.middleware");
const { registerSchema } = require("../validations/schemas/register.shema");
const dotenv = require('dotenv');
const authorize = require('../middlewares/authorize.middleware')


dotenv.config()

class UsersController {
    getUsers = async (req, res, next) => {
        try {
            const token = req.headers['authorization']
            await authorize.verify(token, 'getUsers')

            const result = await Users.findAll({
                attributes: ['id', 'full_name', 'email', 'role']
            })

            return new Response(res, 200, result)


        } catch (error) {
            next(error)
        }
    }

    getUsersById = async (req, res, next) => {
        try {
            const token = req.headers['authorization']
            await authorize.verify(token, 'getUsersById')

            const data = await Users.findOne({
                where: {
                    id: req.params.id
                },
                attributes: ['id', 'full_name', 'email', 'role']
            })

            return new Response(res, 200, data)
        } catch (error) {
            next(error)
        }
    }

    register = async (req, res, next) => {
        try {
            const { email, password, name } = req.body;
            // validare scheama
            await validate(registerSchema, req.body)
            // check email
            const isEmailExist = await Users.findOne({
                where: {
                    email
                },
                attributes: ['id']
            })

            if (isEmailExist) {
                throw new ErrorResponse(400, 'Email already exist')
            }

            // hashPassword

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);

            // create user
            const user = await Users.create({
                full_name: name,
                email,
                password: hashPassword
            })

            // generate token
            const jwtPayLoad = {
                user_id: user.id,
                full_name: user.name
            }

            const accessToken = jwt.sign(jwtPayLoad, process.env.JWT_KEY, { expiresIn: '30 days' })

            return new Response(res, 200, {
                accessToken
            })

        } catch (error) {
            next(error)
        }
    }

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body

            const user = await Users.findOne({
                where: { email }

            });

            if (!user) {
                throw new ErrorResponse(401, 'Email not found')

            }

            const match = await bcrypt.compare(password, user.dataValues.password)
            if (!match) {
                throw new ErrorResponse(401, 'Wrong password')
            }

            const jwtPayLoad = {
                user_id: user.id,
                name: user.full_name,
                role: user.role
            }

            const token = jwt.sign(jwtPayLoad, process.env.JWT_KEY, { expiresIn: '1 days' });
            console.log(jwtPayLoad)
            return new Response(res, 200, token)

        } catch (error) {
            next(error)
        }
    }

}

module.exports = UsersController;