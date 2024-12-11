const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

class CityService {
    async findAll(limit, page, orderBy) {
        orderBy = !orderBy ? "asc" : orderBy

        const cities = await prisma.city.findMany({
            skip: page,
            take: limit,
            orderBy: {
                id: orderBy
            }
        })

        return cities
    }

    async findById(id) {
        const city = await prisma.city.findUniqueOrThrow({
            where: {
                id: Number(id)
            },
            include: {
                country: true
            }
        })
        return city
    }

    async create(city) {
        await prisma.city.create({
            data: city
        })
    }

    async update(id, city) {
        await prisma.city.update({
            where: {
                id: Number(id)
            },
            data: city
        })
    }

    async delete(id) {
        await prisma.city.delete({
            where: {
                id: Number(id)
            }
        })
    }
}

module.exports = new CityService()