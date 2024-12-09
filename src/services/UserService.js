const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()
const saltRounds = 10

class UserService {
    async findAll(limit, page, orderBy) {
        orderBy = !orderBy ? "" : orderBy
        const users = await prisma.user.findMany({
            select: {
                id: true,
                username: true,
                status: true
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
                username: true,
                status: true
            },
            where: {
                id: Number(id)
            }
        })
        return user
    }

    async create(user) {
        const salt = await bcrypt.genSaltSync(saltRounds)
        user.password = await bcrypt.hashSync(user.password, salt)

        const createdUser = await prisma.user.create({
            data: user
        })
        return createdUser
    }

    async update(id, user) {
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