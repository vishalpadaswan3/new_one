const express = require("express")
const { productModel } = require("../model/product.model.js")

const pro = express.Router()

pro.get("/products", async (req, res) => {
    try {
        const s = await productModel.find()
        console.log(s.length)
        res.send(s)
    } catch (error) {
        res.send({ "msg": "Something went wrong", "error": error.message })
    }

})

pro.post("/products/add", async (req, res) => {

    const s = await productModel.find()
    console.log(s.length)

    try {
        const payload = req.body
        const user = new productModel(payload)
        await user.save()
        // console.log(user)
        res.send({ "msg": "Data has been added" })
    } catch (error) {
        res.send({ "msg": "Something went wrong", "error": error.message })
    }
})

pro.delete("/products/delete/:id", async (req, res) => {
    const s = req.params.id
    console.log(s)
    try {
      await productModel.findByIdAndDelete(s)
        res.send({ "msg": "Deleted Successfully"})
    } catch (error) {
        res.send({ "msg": "Something went wrong", "error": error.message })
    }
})

pro.patch("/products/update/:id", async (req, res) => {
    const payload = req.body
    const s = req.params.id
    try {
        const user = await productModel.findByIdAndUpdate({ _id: s }, payload)
        res.send("Updated Successfully")
    } catch (error) {
        res.send({ "msg": "Something went wrong", "error": error.message })
    }
})

module.exports = {
    pro
}