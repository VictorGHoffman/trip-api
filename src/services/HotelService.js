const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

class HotelService {
    async findAll(limit, page, orderBy) {
        orderBy = !orderBy ? "asc" : orderBy
        const hotels = await prisma.hotel.findMany({
            include: {
                city: true
            },
            skip: page,
            take: limit,
            orderBy: {
                id: orderBy
            }
        })
        return hotels
    }

    async findById(id) {
        const hotel = await prisma.hotel.findUniqueOrThrow({
            where: {
                id: Number(id)
            },
            include: { room: true, city: true }
        })
        return hotel
    }

    async create(hotel) {
        await prisma.hotel.create({
            data: hotel
        })
    }

    async update(id, hotel) {
        await prisma.hotel.update({
            where: {
                id: Number(id)
            },
            data: hotel
        })
    }

    async delete(id) {
        await prisma.hotel.delete({
            where: {
                id: Number(id)
            }
        })
    }
}

module.exports = new HotelService()