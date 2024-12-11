const BaseController = require("./BaseController")
const HotelService = require("../services/HotelService")

class HotelController extends BaseController {
    constructor () {
        super("hotels", HotelService)
    }
}

module.exports = new HotelController().app