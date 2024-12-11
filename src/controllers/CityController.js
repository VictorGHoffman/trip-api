const BaseController = require("./BaseController")
const CityService = require("../services/CityService")

class CityController extends BaseController {
    constructor () {
        super("cities", CityService)
    }
}

module.exports = new CityController().app
