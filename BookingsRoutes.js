const router = require('express').Router()
const bookingsController = require('../controllers/BookingsController')

router.post('/booking',bookingsController.createBookings)
router.get('/booking',bookingsController.getBookings)
router.get('/booking/:id',bookingsController.getBookingsById)
router.get('/statusdone',bookingsController.doneStatusById)
router.get('/statuspending',bookingsController.pendingStatusById)
router.get('/user/booking/:id',bookingsController.getBookingByUserId)
router.get('/getbookingbyserproid/:id',bookingsController.getBookingByServiceProviderId)
router.get('/getdonebookingbyserproid/:id',bookingsController.getDoneBookingByServiceProviderId)
router.put('/booking/:id',bookingsController.updateBookingsById)
router.put('/bookingstatus/:id',bookingsController.updateStatusById)
router.delete('/booking/:id',bookingsController.deleteBookingsById)

module.exports = router