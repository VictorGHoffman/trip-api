const BaseController = require("./BaseController")
const CountryService = require("../services/CountryService")

class CountryController extends BaseController {
    constructor () {
        super("countries", CountryService)
    }
}

module.exports = new CountryController().app