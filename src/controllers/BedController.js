const BedService = require("../services/BedService")
const BaseController = require("./BaseController")

class BedController extends BaseController {
    constructor () {
        super("beds", BedService)
    }
}

module.exports = new BedController().app
