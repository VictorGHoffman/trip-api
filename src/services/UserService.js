const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")
const UserServiceHelper = require("../helpers/UserServiceHelper")

const prisma = new PrismaClient()
const saltRounds = 10

class UserService {
    async findAll(limit, page, orderBy) {
        orderBy = !orderBy ? "asc" : orderBy
        const users = await prisma.user.findMany({
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                gender: true,
                birth_date: true
            },
            skip: page,
            take: limit,
            orderBy: {
                id: orderBy
            }
        })
        return users
    }

    async findById(id) {
        const user = await prisma.user.findUniqueOrThrow({
            select: {
                id: true,
                first_name: true,
                last_name: true,
                email: true,
                gender: true,
                birth_date: true
            },
            where: {
                id: Number(id)
            }
        })
        return user
    }

    async create(user) {
        user.gender = user.gender.toUpperCase()
        await UserServiceHelper.validate(user)

        const salt = await bcrypt.genSaltSync(saltRounds)
        user.password = await bcrypt.hashSync(user.password, salt)

        user.birth_date = new Date(user.birth_date)

        const createdUser = await prisma.user.create({
            data: user
        })
        return createdUser
    }

    async update(id, user) {
        user.gender = user.gender.toUpperCase()
        await UserServiceHelper.validate(user)

        const salt = await bcrypt.genSaltSync(saltRounds)
        user.password = await bcrypt.hashSync(user.password, salt)

        user.birth_date = new Date(user.birth_date)
        const updatedUser = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: user
        })
        return updatedUser
    }

    async delete(id) {
        const user = await prisma.user.delete({
            where: {
                id: Number(id)
            }
        })
        return user
    }
}

module.exports = new UserService()