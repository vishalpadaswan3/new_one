const express = require("express")
const { userModel } = require("../model/user.model.js")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { authoriser } = require("../Middleware/authentication.Middleware.js")


const fast = express.Router()


fast.get("/data", async (req, res) => {
    const sam = req.headers.authorization
    try {
        if (sam === "admin") {
            const user = await userModel.find()
            res.send(user)
        } else {
            res.status(404).send("You are not authorised")
        }
    } catch (error) {
        console.log(error.message)
    }
})

fast.post("/register", async (req, res) => {

    try {
        const { name, email, mobileNo, gender, password } = req.body
        const s = await userModel.find({ email })

        if (s.length === 0 && email !== "vishal@gmail.com") {
            bcrypt.hash(password, 5, async (err, hash) => {
                if (err) {
                    res.send(err.message)
                } else {
                    let user = new userModel({ name, email, mobileNo, gender, password: hash })
                    await user.save()
                    res.send({ "msg": "Registered Successfully" })
                }
            });
        } else {
            res.send({ "msg": "User already exist, please login" })
        }

    } catch (error) {
        res.send({ "msg": "Check Again", "error": error.message })
    }
})


fast.post("/login", async (req, res) => {

    const { email, password } = req.body
    try {
        const user = await userModel.find({ email })

        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userid: user[0]._id }, "project")
                    res.send({ "msg": "Login Successfully", "token": token, user })
                    req.headers.authorization = token
                } else {
                    res.send({ "msg": "Check Password" })
                }
            });

        } else {
            if (email === "vishal@gmail.com" && password === "vishal") {
                res.send({ "msg": "Welcome back Admin", "isAdmin": true })
            } else res.send({ "msg": "Wrong credentials" })
        }
    } catch (error) {
        res.send({ "msg": "Check Again", "error": error.message })
    }
})


fast.use(authoriser)
fast.patch("/update/:id", async (req, res) => {
    const s = req.params.id
    const payload = req.body
    try {
        const user = await userModel.findByIdAndUpdate({ _id: s }, payload)
        res.send({ "msg": "Data has been Updated" })
    } catch (error) {
        res.send({ "msg": "check again", "error": error.message })
    }
})

fast.delete("/delete/:id", async (req, res) => {
    const s = req.params.id
    try {
        const user = await userModel.findByIdAndDelete({ _id: s })
        res.send({ "msg": "Data has been Deleted" })
    } catch (error) {
        res.send({ "msg": "check again", "error": error.message })
    }
})

fast.get("/frontend/product.html", async (req, res) => {
    try {
        res.send("product page")
    } catch (error) {
        res.send({ "msg": "check again", "error": error.message })
    }
})




module.exports = {
    fast
}