const ServiceProviderModel = require("../models/ServiceProviderModel")
const encrypt = require("../util/encrypt")
const mailUtil = require("../util/MailUtil")

const createServiceProvider = async(req,res)=>{
    try{
        const hashedPassword = encrypt.encryptPassword(req.body.password)
        const serProviderObj = {
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword,
            phone : req.body.phone,
            role : req.body.role
        }
        const savedServiceProvider = await ServiceProviderModel.create(serProviderObj)
        const Mailres = await mailUtil.mailSend(savedServiceProvider.email,"Testing", "Welcome To Our App...")
        res.status(201).json({
            message : "Service Provider Created",
            data : savedServiceProvider,
            flag : 1
        })
    }
    catch(error){
        res.status(500).json({
            message : "Server Error",
            data : error,
            flag : -1
        })
    }
}

const getSerProvider = async(req,res)=>{
    try{
        const getserprovider = await ServiceProviderModel.find().populate("role")
        res.status(200).json({
            message : "Data fetched",
            data : getserprovider,
            flag : -1
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

const getSerProviderById = async(req,res)=>{
    try{
        const id = req.params.id
        console.log(req.params);
        console.log(id);
        const serProvider = await ServiceProviderModel.findById(id).populate("role")
        if(serProvider == null){
            res.status(404).json({
                message : "Service Provider Not Found",
                flag : -1,
                data : []
            })
        }
        else{
            res.status(200).json({
                message : "Get Service Provider By Id",
                data : serProvider,
                flag  : 1
            })
        }
    }
    catch(error){
        res.status(500).json({
            message : "Error in getting Service Provider",
            data : [],
            flag : -1
        })
    }
}


const updateServiceProviderById = async(req,res)=>{
    const id = req.params.id
    const newSerPro = req.body
    try{
        const updateSerProvider = await ServiceProviderModel.findByIdAndUpdate(id,newSerPro)
        if(updateSerProvider == null){
            res.status(400).json({
                message : "Service Provider Not Found",
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

const deleteserProviderById = async(req,res)=>{
    try{
        const id = req.params.id
        const deleteserProvider = await ServiceProviderModel.findByIdAndDelete(id)
        if(deleteserProvider == null){
            res.status(400).json({
                message : "Service Provider Not Found",
                flag : -1
            })
        }
        else{
            res.status(200).json({
                message : "Deleting...",
                data : deleteserProvider,
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


const loginServiceProvider = async (req, res) => {
    //select * from users where email = ? and password = ?
    //db -->password -->encrypt
    // req.body.password 123456 -->
    try{
        //kunal@gmail.com
        const email = req.body.email
        const password = req.body.password //123456

        const ServiceProviderFromMail = await ServiceProviderModel.findOne({email:email}) //db
        if(ServiceProviderFromMail!=null){
            console.log("Service Provider found")
            const flag = encrypt.comparePassword(password,ServiceProviderFromMail.password)
            if(flag==true){
                res.status(200).json({
                    message:"Service Provider login successfully",
                    flag:1,
                    data:ServiceProviderFromMail
                })
            }
            else{
                res.status(404).json({
                    message:"Service Provider not found",
                    flag:-1
                })
            }
        }
        else{
            res.status(404).json({
                message:"Service Provider not found",
                flag:-1
            })
        }
    }
    catch(err){

        res.status(500).json({
            message:"Error in login Service Provider",
            data:err,
            flag:-1
        })

    }
}

const isServiceProviderExist = async(req,res)=>{
    try {
        const email = req.body.email;
        const getServiceProvider = await ServiceProviderModel.findOne({email:email})
        console.log(getServiceProvider);
        if(getServiceProvider){
            res.status(200).json({
                message : "Service Provider Found",
                flag : 1,
                data : getServiceProvider
            })
        }
        else{
            res.status(404).json({
                message : "Service Provider Not Found",
                flag : -1,
            })
        }
    } catch (error) {
        res.status(500).json({
            message : "Error in finding Service Provider",
            flag : -1
        })
    }
}

const resetPassword = async(req,res)=>{
    const email = req.body.email
    const password = req.body.password

    console.log(email , password);

    const hashedPassword = await encrypt.encryptPassword(password)
    try {
        const updatePassword = await ServiceProviderModel.findOneAndUpdate({email:email},{$set:{password:hashedPassword}})
        res.status(200).json({
            message : "Password Updated Successfully",
            flag : 1,
        })
    } catch (error) {
        res.status(500).json({
            message : "Error in updating Password",
            flag : -1
        })
    }
}

module.exports = {
    createServiceProvider,
    getSerProvider,
    getSerProviderById,
    updateServiceProviderById,
    deleteserProviderById,
    loginServiceProvider,
    isServiceProviderExist,
    resetPassword
}