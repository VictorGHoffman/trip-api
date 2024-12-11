const express = require("express")

const app = express()
const userController = require("./controllers/UserController")
const adminController = require("./controllers/AdminController")
const roomController = require("./controllers/RoomController")
const hotelController = require("./controllers/HotelController")

app.use(express.json())

app.use("/", userController)
app.use("/", adminController)
app.use("/", roomController)
app.use("/", hotelController)

app.get("/", async (req, res) => {
    res.send('oi')
})

app.listen(8080, () => {
    console.log("rodando")
})