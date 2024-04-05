const CategoryModel = require("../models/CategoryModel")

const createCategory = async(req,res)=>{
    try{
        const savedCat = await CategoryModel.create(req.body)
        res.status(201).json({
            message : "Category Created",
            data : savedCat,
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

const getCategories = async(req,res)=>{
    try{
        const getCat = await CategoryModel.find()
        res.status(200).json({
            message : "Data fetched",
            data : getCat,
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

const getCategoryById = async(req,res)=>{
    try{
        const id = req.params.id
        console.log(req.params);
        console.log(id);

        const category = await CategoryModel.findById(id)
        if(category == null){
            res.status(404).json({
                message : "Category Not Found",
                flag : -1
            })
        }
        else{
            res.status(200).json({
                message : "Get Category By Id",
                data : category,
                flag  : 1
            })
        }
    }
    catch(error){
        res.status(500).json({
            message : "Error in Getting Category",
            data : error,
            flag : -1
        })
    }
}

const updateCategoryById = async(req,res)=>{
    try{
        const id = req.params.id
        const newCat = req.body

        const updateCategory = await CategoryModel.findByIdAndUpdate(id,newCat)
        if(updateCategory == null){
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

const deleteCategoryById = async(req,res)=>{
    try{
        const id = req.params.id

        const deleteCategory = await CategoryModel.findByIdAndDelete(id)
        if(deleteCategory == null){
            res.status(400).json({
                message : "User Not Found",
                flag : -1
            })
        }
        else{
            res.status(200).json({
                message : "Deleting...",
                data : deleteCategory,
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
    createCategory,
    getCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
}