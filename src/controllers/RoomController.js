const express = require("express")
const app = express.Router()
const HttpStatus = require("../utils/HttpStatus")
const RoomService = require("../services/RoomService")

app.get("/rooms", async (req, res) => {
    const { limit, page } = getLimitAndPage(limit, page)
    res.sendStatus(HttpStatus.OK)
})

app.get("/rooms/:id", async (req, res) => {
    res.sendStatus(HttpStatus.OK)
})

app.post("/rooms", async (req, res) => {
    res.sendStatus(HttpStatus.OK)
})

app.put("/rooms/:id", async (req, res) => {
    res.sendStatus(HttpStatus.OK)
})

app.delete("/rooms/:id", async (req, res) => {
    res.sendStatus(HttpStatus.OK)
})

module.exports = app