const AdminService = require("../services/AdminService")
const BaseController = require("./BaseController")

class AdminController extends BaseController {
    constructor () {
        super("admins", AdminService)
    }
}

module.exports = new AdminController().app
