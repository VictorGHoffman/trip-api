const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

class BedService {
    async findAll(limit, page, orderBy) {
        orderBy = !orderBy ? "asc" : orderBy

        const admins = await prisma.admin.findMany({
            select: {
                id: true,
                username: true
            },
            where: {
                status: 1
            },
            skip: page,
            take: limit,
            orderBy: {
                id: orderBy
            }
        })

        return admins
    }

    async findById(id) {
        const admin = await prisma.admin.findUniqueOrThrow({
            select: {
                id: true,
                username: true
            },
            where: {
                id: Number(id)
            },
            include: {
                room: true
            }
        })
        return admin
    }

    async create(admin) {
        await prisma.admin.create({
            data: admin
        })
    }

    async update(id, admin) {
        await prisma.admin.update({
            where: {
                id: Number(id)
            },
            data: admin
        })
    }

    async delete(id) {
        await prisma.admin.delete({
            where: {
                id: Number(id)
            }
        })
    }
}

module.exports = new BedService()