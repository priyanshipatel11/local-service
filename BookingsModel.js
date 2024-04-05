const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookingSchema = new Schema({
    service : {
        type : mongoose.Types.ObjectId,
        ref : "Service"
    },
    serviceprovider:{
        type : mongoose.Types.ObjectId,
        ref : "Serviceprovider"
    },
    user : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
    totalamount : {
        type : Number
    },
    status : {
        type : String,
        default : "Pending"
    }

})

module.exports = mongoose.model('bookings',BookingSchema)
