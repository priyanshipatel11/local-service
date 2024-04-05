const { error } = require('console')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: './uploads',
    filename : function(req,file,cb){
        // cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
        cb(null,file.originalname)
    }
})

const uploads = multer({
    storage : storage,
    limits : {fileSize: 1000000}
}).single("Myfiles")


const fileUpload = (req,res)=>{
    uploads(req,res,(error)=>{
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
                res.status(200).json({
                    message :"File Uploaded",
                    file : `uploads/${req.file.filename}`
                })
            }
        }
    })
}

module.exports = {
    fileUpload
}