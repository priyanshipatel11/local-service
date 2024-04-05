const RoleModel = require("../models/RoleModel")

const createRole = async(req,res)=>{
    try{
        const savedRole = await RoleModel.create(req.body)
        res.status(201).json({
            message : "Role Created",
            data : savedRole,
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

const getRole = async(req,res)=>{
    try{
        const getrole = await RoleModel.find()
        res.status(200).json({
            message : "Data fetched",
            data : getrole,
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

const getRoleById = async(req, res)=>{
    try{
        const id = req.params.id
        console.log(req.params);
        console.log(id);

        const role = await RoleModel.findById(id)
        if(role == null){
            res.status(404).json({
                message : "Role Not Found",
                flag : -1
            })
        }
        else{
            res.status(200).json({
                message : "Get Role By Id",
                data : role,
                flag  : 1
            })
        }
    }
    catch(error){
        res.status(500).json({
            message : "Error in Getting Role",
            data : error,
            flag : -1
        })
    }
}

const updateRoleById = async(req,res)=>{
    try{
        const id = req.params.id
        const newRole = req.body

        const updateRole = await RoleModel.findByIdAndUpdate(id,newRole)
        if(updateRole == null){
            res.status(400).json({
                message : "User Not Found",
                flag : -1
            })
        }
        else{
            res.status(200).json({
                message : "Updating...",
                // data : updateRole,
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

const deleteRoleById = async(req,res)=>{
    try{
        const id = req.params.id

        const deleteRole = await RoleModel.findByIdAndDelete(id)
        if(deleteRole == null){
            res.status(400).json({
                message : "User Not Found",
                flag : -1
            })
        }
        else{
            res.status(200).json({
                message : "Deleting...",
                data : deleteRole,
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
    createRole,
    getRole,
    getRoleById,
    updateRoleById,
    deleteRoleById
}