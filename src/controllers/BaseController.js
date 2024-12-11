const express = require(`express`)
const app = express.Router()
const HttpStatus = require(`../utils/HttpStatus`)
const getLimitAndPage = require(`../utils/PageLimit`)

class BaseController {
    constructor (route, service) {
        this.service = service
        this.app = app
        this.registerRoutes(route)
        this.registerCustomRoutes()
    }

    registerRoutes(route) {
        this.app.get(`/${route}`, async (req, res) => {
            const { limit, page } = getLimitAndPage(req.query.limit, req.query.page)
            try {
                const data = await this.service.findAll(limit, page, req.query.sort)
                res.send(data)
            } catch (error) {
                res.status(error.status || HttpStatus.NOT_FOUND)
                res.send(error.message)
            }
        })

        this.app.get(`/${route}/:id`, async (req, res) => {
            const id = req.params.id
            try {
                const data = await this.service.findById(id)
                res.send(data)
            } catch (error) {
                res.status(error.status || HttpStatus.NOT_FOUND)
                res.send(error.message)
            }
        })

        this.app.post(`/${route}`, async (req, res) => {
            const data = req.body
            try {
                await this.service.create(data)
                res.sendStatus(HttpStatus.CREATED)
            } catch (error) {
                res.status(error.status || HttpStatus.BAD_REQUEST)
                res.send(error.message)
            }
        })

        this.app.put(`/${route}/:id`, async (req, res) => {
            const id = req.params.id
            const data = req.body
            try {
                await this.service.update(id, data)
                res.sendStatus(HttpStatus.OK)
            } catch (error) {
                res.status(error.status || HttpStatus.NOT_FOUND)
                res.send(error.message)
            }
        })

        this.app.delete(`/${route}/:id`, async (req, res) => {
            const id = req.params.id
            try {
                await this.service.delete(id)
                res.sendStatus(HttpStatus.NO_CONTENT)
            } catch (error) {
                res.status(error.status || HttpStatus.NOT_FOUND)
                res.send(error.message)
            }
        })
    }

    registerCustomRoutes() {

    }
}

module.exports = BaseController