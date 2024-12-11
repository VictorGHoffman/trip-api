const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

class BedService {
    async findAll(limit, page, orderBy) {
        orderBy = !orderBy ? "asc" : orderBy

        const beds = await prisma.bed.findMany({
            skip: page,
            take: limit,
            orderBy: {
                id: orderBy
            }
        })

        return beds
    }

    async findById(id) {
        const bed = await prisma.bed.findUniqueOrThrow({
            where: {
                id: Number(id)
            },
            include: {
                room: true
            }
        })
        return bed
    }

    async create(bed) {
        await prisma.bed.create({
            data: bed
        })
    }

    async update(id, bed) {
        await prisma.bed.update({
            where: {
                id: Number(id)
            },
            data: bed
        })
    }

    async delete(id) {
        await prisma.bed.delete({
            where: {
                id: Number(id)
            }
        })
    }
}

module.exports = new BedService()