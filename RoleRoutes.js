const router = require('express').Router()
const roleController = require('../controllers/RoleController')

router.post('/role',roleController.createRole)
router.get('/role',roleController.getRole)
router.get('/role/:id',roleController.getRoleById)
router.put('/role/:id',roleController.updateRoleById)
router.delete('/role/:id',roleController.deleteRoleById)

module.exports = router