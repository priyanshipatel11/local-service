const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const PORT = 4000;

// configuration
app.use(express.json())
app.use(cors())

//  connect to mongodb
var db = mongoose.connect("mongodb://127.0.0.1:27017/local-service-project")
db.then(()=>{
    console.log("Connect To MongoDB");
}).catch((error)=>{
    console.log(error);
})

// require all routes
const categoryRoutes = require('./routes/CategoryRoutes.js')
const roleRoutes = require('./routes/RoleRoutes.js')
const serviceProviderRoutes = require('./routes/ServiceProviderRoutes.js')
const serviceRoutes = require('./routes/ServiceRoutes.js')
const subcategoryRoutes = require('./routes/SubCategoryRoutes.js')
const typeRoutes = require('./routes/TypeRoutes.js')
const userRoutes = require('./routes/UserRoutes.js')
const bookingsRoutes = require('./routes/BookingsRoutes.js')
const uploadRoutes = require('./routes/UploadRoutes.js')

// providing all routes to server
app.use('/category',categoryRoutes)
app.use('/role',roleRoutes)
app.use('/serviceprovider',serviceProviderRoutes)
app.use('/service',serviceRoutes)
app.use('/subcategory',subcategoryRoutes)
app.use('/type',typeRoutes)
app.use('/user',userRoutes)
app.use('/booking',bookingsRoutes)
app.use('/upload',uploadRoutes)





app.listen(PORT,()=>{
    console.log("Server Is Running on " + `${PORT}`);
})