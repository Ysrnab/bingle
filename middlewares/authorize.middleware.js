const dotenv = require('dotenv');
const jwt = require("jsonwebtoken");
const { reset } = require('nodemon');
const { ErrorResponse } = require('../helpers/error.helper');

dotenv.config()

const ADMIN_ACCESS = ["updateOrder","createOrder", "getCartById", "getCarts", "getCartItem", "createCart", "createCartItem", "getUsers", "getUsersById", "getItems", "getItemsById", "insertItems", "updateItems", "deleteItems"]
const USERS_ACCESS = ["createOrder", "getCartById", "getCarts", "getCartItem", "createCart", "createCartItem", "getUsersById", "getItems", "getItemsById"]

const verify = async (token, apiName) => {
    try {
        // console.log("verify", token)
        const pureToken = token.split(" ")[1]
        const decoded = jwt.verify(pureToken, process.env.JWT_KEY)

        console.log("decoded", decoded)
        console.log("apiName", apiName)
        console.log("cek", ADMIN_ACCESS.includes(apiName));

        // cek apakah role user boleh akses api name
        if (decoded.role === 'admin') {
            if (!ADMIN_ACCESS.includes(apiName)) {
                throw new ErrorResponse(421, "Access denied")
            } else {
                return decoded
            }

        } else if (decoded.role === 'user') {
            if (!USERS_ACCESS.includes(apiName)) {
                throw new ErrorResponse(422, "Access denied")
            } else {
                return decoded
            }
        } else {
            return new ErrorResponse(420, "Not authorized")
        }

    } catch (error) {
        // console.log('error', error)
        if (error instanceof jwt.JsonWebTokenError) {
            // console.log('err, ',new Error(error).message);
            if ("JsonWebTokenError: invalid token" == new Error(error).message) {
                throw new ErrorResponse(424, "Token invalid")
            } else {
                throw new ErrorResponse(425, "Problem in token")
            }
        } else {
            throw error
        }

    }
}

module.exports = { verify }