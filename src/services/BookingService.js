const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

class BedService {
    async findAll(limit, page, orderBy) {
        orderBy = !orderBy ? "asc" : orderBy

        const bookings = await prisma.booking.findMany({
            skip: page,
            take: limit,
            orderBy: {
                id: orderBy
            }
        })

        return bookings
    }

    async findById(id) {
        const booking = await prisma.booking.findUniqueOrThrow({
            where: {
                id: Number(id)
            },
        })
        return booking
    }

    async create(booking) {
        await prisma.booking.create({
            data: booking
        })
    }

    async update(id, booking) {
        await prisma.booking.update({
            where: {
                id: Number(id)
            },
            data: booking
        })
    }

    async delete(id) {
        await prisma.booking.delete({
            where: {
                id: Number(id)
            }
        })
    }
}

module.exports = new BedService()