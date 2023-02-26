const mongoose = require("mongoose")

const productschema = mongoose.Schema({
    type : {type : String,required:true},
    image: {type : [String],required:true},
    title : {type : String,required:true},
    price : {type : Number,required:true},
    rating : {type : String,required:true},
    discount :{type : Number,required:true},
    category : {type : String,required:true},
    color :{type : String,required:true},
    gender :{type : String,required:true},
    packsize:{type : String,required:true}
})

const productModel = mongoose.model("product",productschema)

module.exports = {
    productModel
}