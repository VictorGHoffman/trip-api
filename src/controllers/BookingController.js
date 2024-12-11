const BaseController = require("./BaseController")
const BookingService = require("../services/BookingService")

class BookingController extends BaseController {
    constructor () {
        super("bookings", BookingService)
    }
}

module.exports = new BookingController().app