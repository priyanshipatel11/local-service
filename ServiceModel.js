const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServiceSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    serviceprovider : {
        type : mongoose.Types.ObjectId,
        ref : "Serviceprovider"
    },
    category: {
        type : mongoose.Types.ObjectId,
        ref : "Category"
    },
    subcat: {
        type : mongoose.Types.ObjectId,
        ref : "Subcategory"
    },
    type : {
        type : mongoose.Types.ObjectId,
        ref :"Type"
    },
    fees:{
        type : Number
    },
    area : {
        type : String                               
    },
    city : {
        type : String
    },
    state : {
        type : String
    },
    imageUrl : {
        type : String
    }
})

module.exports = mongoose.model("Service",ServiceSchema)