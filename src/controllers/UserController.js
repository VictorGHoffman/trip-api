const BaseController = require("./BaseController")
const UserService = require("../services/UserService")

class UserController extends BaseController {
    constructor () {
        super("users", UserService)
    }
}

module.exports = new UserController().app