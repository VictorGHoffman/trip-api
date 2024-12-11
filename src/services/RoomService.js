const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

class RoomService {
    async findAll(limit, page, orderBy) {
        orderBy = !orderBy ? "asc" : orderBy
        const rooms = await prisma.room.findMany({
            skip: page,
            take: limit,
            orderBy: {
                id: orderBy
            }
        })
        return rooms
    }

    async findById(id) {
        const room = await prisma.room.findUniqueOrThrow({
            where: {
                id: Number(id)
            },
            include: {
                hotel: true,
                bed: true
            }
        })
        return room
    }

    async create(room) {
        await prisma.room.create({
            data: room
        })
    }

    async update(id, room) {
        await prisma.room.update({
            where: {
                id: Number(id)
            },
            data: room
        })
    }

    async delete(id) {
        await prisma.room.delete({
            where: {
                id: Number(id)
            }
        })
    }
}

module.exports = new RoomService()