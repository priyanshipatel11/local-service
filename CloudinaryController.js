const cloudinary = require('cloudinary').v2

const uploadImage = async(file) =>{
    cloudinary.config({
        cloud_name : "djmpo9rcc",
        api_key : "962139515141714",
        api_secret : "SF8OyfjJa16sF4T9rUk6B8h4cU4"
    })

    const result = await cloudinary.uploader.upload(file)
    return result
}

module.exports = {
    uploadImage
}