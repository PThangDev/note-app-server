class FilterDocumentAPI {
  public limit: number;
  private DEFAULT_PAGE: number;

  constructor(public query: any, private queryString: any) {
    this.limit = 300;
    this.DEFAULT_PAGE = 1;
  }
  pagination() {
    const limit = Number(this.queryString.limit) || this.limit;
    const page = Number(this.queryString.page) || this.DEFAULT_PAGE;
    const skip = limit * (page - 1);

    this.limit = limit;
    this.query = this.query.limit(limit).skip(skip);
    return this;
  }
  sortable(field?: string) {
    const { sort } = this.queryString;
    this.query = sort ? this.query.sort(sort) : this.query.sort('-createdAt');
    return this;
  }
  search() {
    const { search } = this.queryString;
    if (search) {
      this.query = this.query.find({
        $text: { $search: search },
      });
    } else {
      this.query = this.query.find();
    }
    return this;
  }
  filter() {
    const queryObj = { ...this.queryString };

    const excludedFields = ['page', 'sort', 'limit', 'search'];

    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, (match) => '$' + match);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }
  count() {
    this.query = this.query.count();
    return this;
  }
}

export default FilterDocumentAPI;
