class ValidationError extends Error {
    constructor (message, statusCode) {
        super(message)
        this.name = "ValidationError"
        this.statusCode = statusCode
    }
}

module.exports = ValidationError