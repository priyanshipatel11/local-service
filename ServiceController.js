const ServiceModel = require("../models/ServiceModel")
const multer = require('multer')
const path = require('path')
const cloudinaryController = require("./CloudinaryController")

const storage = multer.diskStorage({
    // destination: './uploads',
    filename : function(req,file,cb){
        // cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
        cb(null,file.originalname)
    }
})

const uploads = multer({
    storage : storage,
    limits : {fileSize: 1000000}
}).single("Myfiles")


const createService = async(req,res)=>{
    uploads(req,res,async(error)=>{
        if(error){
            res.status(500).json({
                message : "Error In Uploading File"
            })
        }
        else{
            if(req.file == undefined){
                res.status(400).json({
                    message : "No File Found"
                })
            }
            else{
                
              //data...
              const result = await cloudinaryController.uploadImage(req.file.path);
              //console.log("Upload Controller",result);
              //console.log("Upload Controller",result.secure_url);
              //console.log(req.body);
              const serviceobj = ({
                  name :req.body.name,
                  category:req.body.category,
                  subcat:req.body.subcat,
                  serviceprovider :req.body.serviceprovider,
                  type:req.body.type,
                  fees:req.body.fees,
                  area:req.body.area,
                  city:req.body.city,
                  state:req.body.state,
                  imageUrl :result.secure_url
              })
              const savedSer = await ServiceModel.create(serviceobj);
              res.status(200).json({
                  message : "File Uploaded",
                  data : savedSer
                  //file : uploads/${req.file.filename}
              })
            }
        }
    })
}

const getServices = async(req,res)=>{
    try{
        const getservices = await ServiceModel.find().populate("category").populate("subcat").populate("type").populate("serviceprovider")
        res.status(200).json({
            message : "Data fetched",
            data : getservices,
            flag : 1
        })
    }
    catch(error){
        res.status(500).json({
            message : "Data not found",
            data : error,
            flag : -1
        })
    }
}

const getServiceById = async (req,res)=>{
    try{
        const id = req.params.id
        console.log(req.params);
        console.log(id);
        
        const ser = await ServiceModel.findById(id).populate("category").populate("subcat").populate("type")
        if(ser == null){
            res.status(404).json({
                message : "Service Not Found",
                flag : -1
            })
        }
        else{
            res.status(200).json({
                message : "Get service By Id",
                data : ser,
                flag : 1
            })
        }
    }
    catch(error){
        res.status(500).json({
            message: "Error in getting ser",
            flag : -1,
            data : error
        })
    }
}

const updateServiceById = async(req,res)=>{
    try{
        const id = req.params.id
        const newSer = req.body

        const updateService = await ServiceModel.findByIdAndUpdate(id,newSer)
        if(updateService == null){
            res.status(400).json({
                message : "User Not Found",
                flag : -1
            })
        }
        else{
            res.status(200).json({
                message : "Updating...",
                // data : updateService,
                flag : 1
            })
        }
    }
    catch(error){
        res.status(500).json({
            message : "Error in Updating",
            data : error,
            flag : -1
        })
    }
}

const getServiceByServiceproviderId = async(req, res) => {
    const serviceProviderId = req.params.id; //loggedin service provider id
  
    try {
      const services = await ServiceModel.find({ serviceprovider: serviceProviderId }).populate("category").populate("subcat").populate("type");
      console.log(services)
      if (services && services.length > 0) {
        res.status(200).json({
          message: "service found",
          flag: 1,
          data: services,
        });
      } else {
        res.status(404).json({
          message: "no service found",
          flag: -1,
          data: [],
        });
      }
    } catch (err) {
      res.status(500).json({
        message: "no service found",
        flag: -1,
        data: [],
      });
    }
  };

const deleteServiceById = async(req,res)=>{
    try{
        const id = req.params.id

        const deleteService = await ServiceModel.findByIdAndDelete(id)
        if(deleteService == null){
            res.status(400).json({
                message : "User Not Found",
                flag : -1
            })
        }
        else{
            res.status(200).json({
                message : "Deleting...",
                data : deleteService,
                flag : 1
            })
        }
    }
    catch(error){
        res.status(500).json({
            message : "Error in Deleting",
            data : error,
            flag : -1
        })
    }
}

const filterservice = async(req,res) =>{
    console.log(req.query);
    try{
        const ser = await ServiceModel.find({ name: {$regex : req.query.name, $options : "(?i)"}}).populate("category").populate("subcat").populate("type").populate("serviceprovider")
        console.log(ser);
        if(ser && ser.length > 0){
            res.status(200).json({
                message : "Service Found",
                flag : 1,
                data : ser
            })
        }
        else{
            res.status(404).json({
                message : "Service Not Found",
                flag : -1,
                data : []
            })
        }
    }
    catch(err){
        res.status(505).json({
            message : "No Service Found",
            flag : -1,
            data : []
        })
    }
}

module.exports = {
    createService,
    getServices,
    getServiceById,
    updateServiceById,
    deleteServiceById,
    getServiceByServiceproviderId,
    filterservice
}