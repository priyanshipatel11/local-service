const SubCategoryModel = require("../models/SubCategoryModel")

const createSubCategory = async(req,res)=>{
    try{
        const savedSubCategory = await SubCategoryModel.create(req.body)
        res.status(201).json({
            message : "Sub Category Created",
            data : savedSubCategory,
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

const getSubCategories = async(req,res)=>{
    try{
        const getsubcat = await SubCategoryModel.find().populate("category")
        res.status(200).json({
            message : "Data fetched",
            data : getsubcat,
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

const getSubCategoryById = async(req,res)=>{
    try{
        const id = req.params.id
        console.log(req.params);
        console.log(id);

        const subCategory = await SubCategoryModel.findById(id).populate("category")
        if(subCategory == null){
            res.status(404).json({
                message : "Sub Category Not Found",
                flag : -1
            })
        }
        else{
            res.status(200).json({
                message : "Get Sub Category By Id",
                data :subCategory,
                flag  : 1
            })
        }
    }
    catch(error){
        res.status(500).json({
            message : "Error in Getting Sub Category",
            data : error,
            flag : -1
        })
    }
}

const updateSubCategoryById = async(req,res)=>{
    try{
        const id = req.params.id
        const newSubCat = req.body

        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(id,newSubCat)
        if(updateSubCategory == null){
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

const deleteSubCategoryById = async(req,res)=>{
    try{
        const id = req.params.id

        const deleteSubCategory = await SubCategoryModel.findByIdAndDelete(id)
        if(deleteSubCategory == null){
            res.status(400).json({
                message : "User Not Found",
                flag : -1
            })
        }
        else{
            res.status(200).json({
                message : "Deleting...",
                data : deleteSubCategory,
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
    createSubCategory,
    getSubCategories,
    getSubCategoryById,
    updateSubCategoryById,
    deleteSubCategoryById
}