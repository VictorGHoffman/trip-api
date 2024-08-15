const express = require("express")
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

async function main() {
    await prisma.user.create({
        data: {
            username: "John",
            password: "123456"
        }
    })
    return await prisma.user.findMany()
}

app.get("/", async (req, res) => {
    const users = await main()
    res.send(users)
})

app.listen(8080, () => {
    console.log("rodando")
})