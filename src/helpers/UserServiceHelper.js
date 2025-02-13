const HttpStatus = require("../utils/HttpStatus")
const ValidationError = require("../exceptions/ValidationError")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

class UserServiceHelper {
    async validate(user) {
        for (const key in user) {
            user[key] = user[key].trim()
        }
        this.validateEmpty(user)

        this.validatePasswordLength(user)

        await this.validateEmail(user)

        this.validateGender(user)

        this.validateDate(user)
    }

    validateDate(user) {
        if (!user.birth_date.match(/^\d{4}-\d{2}-\d{2}$/)) {
            throw new ValidationError("Invalid birth date format", HttpStatus.BAD_REQUEST)
        }
    }

    validateGender(user) {
        if (user.gender.toUpperCase() !== "M" && user.gender.toUpperCase() !== "F") {
            throw new ValidationError("Gender must be 'M' or 'F'", HttpStatus.BAD_REQUEST)
        }
        user.gender = user.gender.toUpperCase()
    }

    async validateEmail(user) {
        if (!user.email.includes("@")) {
            throw new ValidationError("Invalid emails", HttpStatus.BAD_REQUEST)
        }
        const result = await prisma.user.findFirst({
            where: {
                email: user.email,
            }
        })
        if (result) {
            throw new ValidationError("Email already exists", HttpStatus.BAD_REQUEST)
        }
    }

    validatePasswordLength(user) {
        if (user.password.length < 8) {
            throw new ValidationError("Password must be at least 8 characters long", HttpStatus.BAD_REQUEST)
        }
    }

    validateEmpty(user) {
        if (!user.first_name || !user.last_name || !user.email || !user.password || !user.gender || !user.birth_date) {
            throw new ValidationError("There are empty fields", HttpStatus.BAD_REQUEST)
        }
    }
}

module.exports = new UserServiceHelper()