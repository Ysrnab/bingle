

class Response {
    constructor(res, status, data) {
        if (status <= 300) {
            this.status = true
            this.data = data
            this.error = {}
        } else {
            this.status = false
            this.data = {}
            this.error = data
        }

        return res.status(status).json({
            status: this.status,
            data: this.data,
            error: this.error
        })
    }
}
module.exports = { Response }