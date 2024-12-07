const express = require("express")
const app = express.Router()
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

app.get("/users", async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true
        },
        where: {
            status: 1
        }
    })
    res.send(users)
})

app.get("/users/:id", async (req, res) => {
    const id = req.params.id
    try {
        const user = await prisma.user.findUniqueOrThrow({
            select: {
                id: true,
                username: true
            },
            where: {
                id: Number(id)
            },
        })
        res.send(user)
    } catch (error) {
        res.sendStatus(404)
    }
})

app.post("/users", async (req, res) => {
    const user = req.body
    await prisma.user.create({ data: user })
    res.sendStatus(201)
})

app.put("/users/:id", async (req, res) => {
    const id = req.params.id
    const user = req.body
    try {
        await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: user
        })
        res.sendStatus(200)
    } catch (error) {
        res.sendStatus(404)
    }
})

app.delete("/users/:id", async (req, res) => {
    const id = req.params.id
    try {
        await prisma.user.update({
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