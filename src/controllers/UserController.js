const express = require("express")
const app = express.Router()
const HttpStatus = require("../utils/HttpStatus")
const getLimitAndPage = require("../utils/PageLimit")
const UserService = require("../services/UserService")

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
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.post("/users", async (req, res) => {
    const user = req.body
    try {
        await UserService.create(user)
        res.sendStatus(HttpStatus.CREATED)
    }
    catch (error) {
        res.status(error.status || HttpStatus.BAD_REQUEST)
        res.send(error.message)
    }
})

app.put("/users/:id", async (req, res) => {
    const id = req.params.id
    const user = req.body
    try {
        await UserService.update(id, user)
        res.sendStatus(HttpStatus.OK)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.delete("/users/:id", async (req, res) => {
    const id = req.params.id
    try {
        await UserService.delete(id)
        res.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

module.exports = app