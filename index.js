const express = require("express")
const dotenv = require("dotenv").config()
const { connection } = require("./configue/db.js")
const cors = require("cors")
const {fast} = require("./Routes/user.Routes.js")
const {pro} = require("./Routes/product.route.js")


const app = express()
app.use(cors())
app.use(express.json())
app.use(pro)
app.use(fast)

app.get("/", (req, res) => {
    res.send("Homepage of backend")
})


app.listen(process.env.port, async () => {
    try {
        await connection
        console.log(`connected to db`)
    } catch (error) {
        console.log(error.message)
    }

    console.log(`${process.env.port} connected successfully`)
})