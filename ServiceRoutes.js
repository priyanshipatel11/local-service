const router = require('express').Router()
const serviceController = require('../controllers/ServiceController')

router.post('/service',serviceController.createService)
router.get('/service',serviceController.getServices)
router.get('/service/:id',serviceController.getServiceById)
router.get('/services/:id',serviceController.getServiceByServiceproviderId)
router.get('/filterservice',serviceController.filterservice)
router.put('/service/:id',serviceController.updateServiceById)
router.delete('/service/:id',serviceController.deleteServiceById)

module.exports = router 