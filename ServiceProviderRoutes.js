const router = require('express').Router()
const serviceProviderController = require('../controllers/ServiceProviderController')

router.post('/serviceprovider',serviceProviderController.createServiceProvider)
router.get('/serviceprovider',serviceProviderController.getSerProvider)
router.get('/serviceprovider/:id',serviceProviderController.getSerProviderById)
router.put('/serviceprovider/:id',serviceProviderController.updateServiceProviderById)
router.delete('/serviceprovider/:id',serviceProviderController.deleteserProviderById)
router.post('/serviceprovider/login',serviceProviderController.loginServiceProvider)
router.post('/serviceprovider/isserproexist',serviceProviderController.isServiceProviderExist)
router.post('/serviceprovider/resetpassword',serviceProviderController.resetPassword)
module.exports = router