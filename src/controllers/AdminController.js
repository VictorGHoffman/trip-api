const express = require("express")
const app = express.Router()
const { PrismaClient } = require("@prisma/client")
const HttpStatus = require("../utils/HttpStatus")

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
        res.sendStatus(HttpStatus.NOT_FOUND)
    }
})

app.post("/admins", async (req, res) => {
    const admin = req.body
    await prisma.admin.create({ data: admin })
    res.sendStatus(HttpStatus.CREATED)
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
        res.sendStatus(HttpStatus.OK)
    } catch (error) {
        res.sendStatus(HttpStatus.NOT_FOUND)
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
        res.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
        res.sendStatus(HttpStatus.NOT_FOUND)
    }
})

module.exports = app