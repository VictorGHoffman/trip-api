const express = require("express")
const app = express.Router()
const { PrismaClient } = require("@prisma/client")
const HttpStatus = require("../utils/HttpStatus")
const getLimitAndPage = require("../utils/PageLimit")
const UserService = require("../services/UserService")

const prisma = new PrismaClient()

app.get("/users", async (req, res) => {
    let { limit, page } = getLimitAndPage(req.query.limit, req.query.page)
    const users = await UserService.findAll(limit, page, req.query.sort)

    res.send(users)
})

app.get("/users/:id", async (req, res) => {
    const id = req.params.id

    try {
        const user = await UserService.findById(id)
        res.send(user)
    } catch (error) {
        res.sendStatus(HttpStatus.NOT_FOUND)
    }
})

app.post("/users", async (req, res) => {
    const user = req.body
    await UserService.create(user)
    res.sendStatus(HttpStatus.CREATED)
})

app.put("/users/:id", async (req, res) => {
    const id = req.params.id
    const user = req.body
    try {
        await UserService.update(id, user)
        res.sendStatus(HttpStatus.OK)
    } catch (error) {
        res.sendStatus(HttpStatus.NOT_FOUND)
    }
})

app.delete("/users/:id", async (req, res) => {
    const id = req.params.id
    try {
        await UserService.delete(id)
        res.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
        res.sendStatus(HttpStatus.NOT_FOUND)
    }
})

module.exports = app