const { ErrorResponse } = require('../helpers/error.helper')

const validate = async (schema, bodies) => {
    try {
        await schema.validateAsync(bodies)
    } catch (error) {
        const massages = []

        error.details.forEach(detail => {
            massages.push({
                path: detail.path[0],
                massage: detail.message
            })
        })

        throw new ErrorResponse(400, massages)
    }
}

module.exports = { validate }