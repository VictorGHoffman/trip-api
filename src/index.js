const express = require("express")

const app = express()
const userController = require("./controllers/UserController")
const adminController = require("./controllers/AdminController")

app.use(express.json())

app.use("/", userController)
app.use("/", adminController)

app.get("/", async (req, res) => {
    res.send('oi')
})

app.listen(8080, () => {
    console.log("rodando")
})