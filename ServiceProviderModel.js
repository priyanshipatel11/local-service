const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SProviderSchema = new Schema({
    name:{
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required: true
    },
    phone:{
        type : String,
        unique : true
    },
    role: {
        type : mongoose.Types.ObjectId,
        ref : "Role"
    }
})

module.exports = mongoose.model('Serviceprovider', SProviderSchema)