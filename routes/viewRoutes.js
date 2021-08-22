const express = require('express');
const {
  getOverView,
  getTour,
  getLogInForm,
  getAccount,
  updateUserData,
  signUp,
  forgotPassword,
  resetPassword,
  getMyTours,
} = require('../Controllers/viewsController');
const { createBookingCheckout } = require('../Controllers/bookingController');
const { isLoggedIn, protect } = require('../Controllers/authController');

const router = express.Router();

router.get('/login', getLogInForm);
router.get('/forgotPassword', forgotPassword);
router.get('/resetPassword/:token', resetPassword);
router.get('/signUp', signUp);

router.get('/', createBookingCheckout, isLoggedIn, getOverView);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/me', protect, getAccount);
router.get('/my-tours', protect, getMyTours);
router.post('/submit-user-data', protect, updateUserData);

module.exports = router;
