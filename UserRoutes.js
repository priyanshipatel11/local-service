const router = require('express').Router()
const userController = require('../controllers/UserController')

router.post('/user',userController.createUser)
router.get('/user',userController.getUser)
router.get('/user/:id',userController.getUserById)
router.put('/user/:id',userController.updateUserById)
router.delete('/user/:id',userController.deleteUserById)
router.post('/user/login',userController.loginUser)
router.post('/user/isuserexist',userController.isUserExist)
router.post('/user/resetpassword',userController.resetPassword)

module.exports = router