const express = require("express")
const app = express.Router()
const HttpStatus = require("../utils/HttpStatus")
const getLimitAndPage = require("../utils/PageLimit")
const CityService = require("../services/CityService")

app.get("/cities", async (req, res) => {
    const { limit, page } = getLimitAndPage(req.query.limit, req.query.page)
    try {
        const cities = await CityService.findAll(limit, page, req.query.sort)
        res.send(cities)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.get("/cities/:id", async (req, res) => {
    const id = req.params.id
    try {
        const city = await CityService.findById(id)
        res.send(city)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.post("/cities", async (req, res) => {
    const city = req.body
    try {
        await CityService.create(city)
        res.sendStatus(HttpStatus.CREATED)
    } catch (error) {
        res.status(error.status || HttpStatus.BAD_REQUEST)
        res.send(error.message)
    }
})

app.put("/cities/:id", async (req, res) => {
    const id = req.params.id
    const city = req.body
    try {
        await CityService.update(id, city)
        res.sendStatus(HttpStatus.OK)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.delete("/cities/:id", async (req, res) => {
    const id = req.params.id
    try {
        await CityService.delete(id)
        res.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

module.exports = app