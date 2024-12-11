const express = require("express")
const app = express.Router()
const HttpStatus = require("../utils/HttpStatus")
const getLimitAndPage = require("../utils/PageLimit")
const BedService = require("../services/BedService")

app.get("/beds", async (req, res) => {
    const { limit, page } = getLimitAndPage(req.query.limit, req.query.page)
    try {
        const beds = await BedService.findAll(limit, page, req.query.sort)
        res.send(beds)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.get("/beds/:id", async (req, res) => {
    const id = req.params.id
    try {
        const bed = await BedService.findById(id)
        res.send(bed)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.post("/beds", async (req, res) => {
    const bed = req.body
    try {
        await BedService.create(bed)
        res.sendStatus(HttpStatus.CREATED)
    } catch (error) {
        res.status(error.status || HttpStatus.BAD_REQUEST)
        res.send(error.message)
    }
})

app.put("/beds/:id", async (req, res) => {
    const id = req.params.id
    const bed = req.body
    try {
        await BedService.update(id, bed)
        res.sendStatus(HttpStatus.OK)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.delete("/beds/:id", async (req, res) => {
    const id = req.params.id
    try {
        await BedService.delete(id)
        res.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

module.exports = app