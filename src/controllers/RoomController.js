const express = require("express")
const app = express.Router()
const HttpStatus = require("../utils/HttpStatus")
const getLimitAndPage = require("../utils/PageLimit")
const RoomService = require("../services/RoomService")

app.get("/rooms", async (req, res) => {
    const { limit, page } = getLimitAndPage(req.query.limit, req.query.page)
    try {
        const rooms = await RoomService.findAll(limit, page, req.query.sort)
        res.send(rooms)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.get("/rooms/:id", async (req, res) => {
    const id = req.params.id
    try {
        const room = await RoomService.findById(id)
        res.send(room)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.post("/rooms", async (req, res) => {
    const room = req.body
    try {
        await RoomService.create(room)
        res.sendStatus(HttpStatus.CREATED)
    } catch (error) {
        res.status(error.status || HttpStatus.BAD_REQUEST)
        res.send(error.message)
    }
})

app.put("/rooms/:id", async (req, res) => {
    const id = req.params.id
    const room = req.body
    try {
        await RoomService.update(id, room)
        res.sendStatus(HttpStatus.OK)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.delete("/rooms/:id", async (req, res) => {
    const id = req.params.id
    try {
        await RoomService.delete(id)
        res.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

module.exports = app