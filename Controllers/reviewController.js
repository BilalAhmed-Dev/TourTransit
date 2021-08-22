const catchAsync = require('../utils/catchAsync');
const Review = require('../models/reviewModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.checkIfAuthor = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);
  if (req.user.role !== 'admin') {
    if (review.user.id !== req.user.id)
      return next(new AppError(`You cannot edit someone's else review.`, 401));
  }
  next();
});

exports.setTourUserId = (req, res, next) => {
  if (req.params.tourId) {
    req.body.tour = req.params.tourId;
    req.body.user = req.user.id;
  }
  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
