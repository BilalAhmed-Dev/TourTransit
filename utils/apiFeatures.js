class APIFeatures {
  constructor(model, query) {
    this.model = model;
    this.query = query;
  }

  filter() {
    const queryShallowCopy = { ...this.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryShallowCopy[el]);

    const stringifiedQuery = JSON.stringify(queryShallowCopy);
    const parsedQuery = JSON.parse(
      stringifiedQuery.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    );

    this.model = this.model.find(parsedQuery);

    return this;
  }

  sort() {
    if (this.query.sort) {
      const sortBy = this.query.sort.split(',').join(' ');
      this.model = this.model.sort(sortBy);
    } else {
      this.model = this.model.sort('-createdAt _id');
    }

    return this;
  }

  limitFields() {
    if (this.query.fields) {
      const fields = this.query.fields.split(',').join(' ');
      this.model = this.model.select(fields);
    } else {
      this.model = this.model.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.query.page * 1 || 1;
    const limit = this.query.limit * 1 || 100;

    const skip = (page - 1) * limit;

    this.model = this.model.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
