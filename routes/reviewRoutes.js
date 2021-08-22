const express = require('express');
const { protect, restrictTo } = require('../Controllers/authController');
const {
  getAllReviews,
  createReview,
  deleteReview,
  updateReview,
  setTourUserId,
  getReview,
  checkIfAuthor,
} = require('../Controllers/reviewController');

const router = express.Router({ mergeParams: true });
router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setTourUserId, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restrictTo('admin', 'user'), checkIfAuthor, updateReview)
  .delete(restrictTo('admin', 'user'), checkIfAuthor, deleteReview);

module.exports = router;
