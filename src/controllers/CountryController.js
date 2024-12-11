const express = require("express")
const app = express.Router()
const HttpStatus = require("../utils/HttpStatus")
const getLimitAndPage = require("../utils/PageLimit")
const CountryService = require("../services/CountryService")

app.get("/countries", async (req, res) => {
    const { limit, page } = getLimitAndPage(req.query.limit, req.query.page)
    try {
        const countries = await CountryService.findAll(limit, page, req.query.sort)
        res.send(countries)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.get("/countries/:id", async (req, res) => {
    const id = req.params.id
    try {
        const country = await CountryService.findById(id)
        res.send(country)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.post("/countries", async (req, res) => {
    const country = req.body
    try {
        await CountryService.create(country)
        res.sendStatus(HttpStatus.CREATED)
    } catch (error) {
        res.status(error.status || HttpStatus.BAD_REQUEST)
        res.send(error.message)
    }
})

app.put("/countries/:id", async (req, res) => {
    const id = req.params.id
    const country = req.body
    try {
        await CountryService.update(id, country)
        res.sendStatus(HttpStatus.OK)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

app.delete("/countries/:id", async (req, res) => {
    const id = req.params.id
    try {
        await CountryService.delete(id)
        res.sendStatus(HttpStatus.NO_CONTENT)
    } catch (error) {
        res.status(error.status || HttpStatus.NOT_FOUND)
        res.send(error.message)
    }
})

module.exports = app