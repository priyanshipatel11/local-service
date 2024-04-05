const TypeModel = require("../models/TypeModel")

const createType = async(req,res)=>{
    try{
        const savedType = await TypeModel.create(req.body)
        res.status(201).json({
            message : "Type Created",
            data : savedType,
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

const getType = async(req,res)=>{
    try{
        const gettype = await TypeModel.find()
        res.status(200).json({
            message : "Data fetched",
            data : gettype,
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

const getTypeById = async(req,res)=>{
    try{
        const id = req.params.id
        console.log(req.params);
        console.log(id);

        const type = await TypeModel.findById(id)
        if(type == null){
            res.status(404).json({
                message : "Type Not Found",
                flag : -1
            })
        }
        else{
            res.status(200).json({
                message : "Get Type By Id",
                data : type,
                flag  : 1
            })
        }
    }
    catch(error){
        res.status(500).json({
            message : "Error in Getting Type",
            data : error,
            flag : -1
        })
    }
}

const updateTypeById = async(req,res)=>{
    try{
        const id = req.params.id
        const newType = req.body

        const updateType = await TypeModel.findByIdAndUpdate(id,newType)
        if(updateType == null){
            res.status(400).json({
                message : "User Not Found",
                flag : -1
            })
        }
        else{
            res.status(200).json({
                message : "Updating...",
                // data : updateCategory,
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

const deleteTypeById = async(req,res)=>{
    try{
        const id = req.params.id

        const deleteType = await TypeModel.findByIdAndDelete(id)
        if(deleteType == null){
            res.status(400).json({
                message : "User Not Found",
                flag : -1
            })
        }
        else{
            res.status(200).json({
                message : "Deleting...",
                data : deleteType,
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

module.exports = {
    createType,
    getType,
    getTypeById,
    updateTypeById,
    deleteTypeById
}