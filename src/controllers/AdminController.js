const express = require("express")
const app = express.Router()
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

app.get("/admins", async (req, res) => {
    const admins = await prisma.admin.findMany({
        select: {
            id: true,
            username: true
        },
        where: {
            status: 1
        }
    })
    res.send(admins)
})

app.get("/admins/:id", async (req, res) => {
    const id = req.params.id
    try {
        const admin = await prisma.admin.findUniqueOrThrow({
            select: {
                id: true,
                username: true
            },
            where: {
                id: Number(id)
            },
        })
        res.send(admin)
    } catch (error) {
        res.sendStatus(404)
    }
})

app.post("/admins", async (req, res) => {
    const admin = req.body
    await prisma.admin.create({ data: admin })
    res.sendStatus(201)
})

app.put("/admins/:id", async (req, res) => {
    const id = req.params.id
    const admin = req.body
    try {
        await prisma.admin.update({
            where: {
                id: Number(id)
            },
            data: admin
        })
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(404)
    }
})

app.delete("/admins/:id", async (req, res) => {
    const id = req.params.id
    try {
        await prisma.admin.update({
            where: {
                id: Number(id)
            },
            data: {
                status: 0
            }
        })
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(404)
    }
})

module.exports = app