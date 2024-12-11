const BaseController = require("./BaseController")
const RoomService = require("../services/RoomService")

class RoomController extends BaseController {
    constructor () {
        super("rooms", RoomService)
    }
}

module.exports = new RoomController().app