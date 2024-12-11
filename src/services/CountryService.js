const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

class CountryService {
    async findAll(limit, page, orderBy) {
        orderBy = !orderBy ? "asc" : orderBy

        const countries = await prisma.country.findMany({
            skip: page,
            take: limit,
            orderBy: {
                id: orderBy
            }
        })

        return countries
    }

    async findById(id) {
        const country = await prisma.country.findUniqueOrThrow({
            where: {
                id: Number(id)
            },
            include: {
                city: true
            }
        })
        return country
    }

    async create(country) {
        await prisma.country.create({
            data: country
        })
    }

    async update(id, country) {
        await prisma.country.update({
            where: {
                id: Number(id)
            },
            data: country
        })
    }

    async delete(id) {
        await prisma.country.delete({
            where: {
                id: Number(id)
            }
        })
    }
}

module.exports = new CountryService()