const express = require('express');
const { protect, restrictTo } = require('../Controllers/authController');
const {
  getCheckoutSession,
  createBooking,
  getBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
} = require('../Controllers/bookingController');

const router = express.Router();
router.use(protect);
router.get('/checkout-session/:tourID', getCheckoutSession);

router.use(restrictTo('admin', 'lead-guide'));
router.route('/').get(getAllBookings).post(createBooking);
router.route('/:id').get(getBooking).patch(updateBooking).delete(deleteBooking);

module.exports = router;
