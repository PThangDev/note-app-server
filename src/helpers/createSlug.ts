import slugify from 'slugify';

const createSlug = (name: string = '') => {
  return slugify(name, { lower: true, locale: 'vi' });
};
export default createSlug;
