const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

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

    async create(data) {
        const user = await prisma.user.create({
            data
        })
        return user
    }

    async update(id, data) {
        const user = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data
        })
        return user
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