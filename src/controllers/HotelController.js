const express = require("express")
const app = express.Router()
const HttpStatus = require("../utils/HttpStatus")
const getLimitAndPage = require("../utils/PageLimit")
const HotelService = require("../services/HotelService")

app.get("/hotels", async (req, res) => {
    const { limit, page } = getLimitAndPage(req.query.limit, req.query.page)
    try {
        const hotels = await HotelService.findAll(limit, page, req.query.sort)
        res.send(hotels)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.get("/hotels/:id", async (req, res) => {
    const id = req.params.id
    try {
        const hotel = await HotelService.findById(id)
        res.send(hotel)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.post("/hotels", async (req, res) => {
    const hotel = req.body
    try {
        await HotelService.create(hotel)
        res.sendStatus(HttpStatus.CREATED)
    } catch (error) {
        res.status(error.status || HttpStatus.BAD_REQUEST)
        res.send(error.message)
    }
})

app.put("/hotels/:id", async (req, res) => {
    const id = req.params.id
    const hotel = req.body
    try {
        await HotelService.update(id, hotel)
        res.sendStatus(HttpStatus.OK)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.delete("/hotels/:id", async (req, res) => {
    const id = req.params.id
    try {
        await HotelService.delete(id)
        res.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

module.exports = app