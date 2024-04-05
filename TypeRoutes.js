const router = require('express').Router()
const typeController = require('../controllers/TypeController')

router.post('/type',typeController.createType)
router.get('/type',typeController.getType)
router.get('/type/:id',typeController.getTypeById)
router.put('/type/:id',typeController.updateTypeById)
router.delete('/type/:id',typeController.deleteTypeById)

module.exports = router