const express = require('express');

const userHandlers = require('../Controllers/userController');
const authController = require('../Controllers/authController');

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  restrictTo,
  logout,
} = authController;
const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  updateMe,
  deleteMe,
  RejectPasswordUpdate,
  uploadUserPhoto,
  resizeUserPhoto,
} = userHandlers;

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.use(protect);
router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, resizeUserPhoto, updateMe);
router.patch('/updatePassword', updatePassword);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));
router.route('/').get(getAllUsers);

router
  .route('/:id')
  .get(getUser)
  .patch(RejectPasswordUpdate, updateUser)
  .delete(restrictTo('admin'), deleteUser);

module.exports = router;
