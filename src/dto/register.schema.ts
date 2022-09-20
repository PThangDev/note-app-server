import * as yup from 'yup';

const registerSchema = yup.object({
  body: yup.object({
    username: yup
      .string()
      .trim()
      .required('Username is required')
      .min(4, 'Username must have at least 4 characters')
      .max(20, 'Username must be at most 20 characters')
      .matches(
        /^(?=[a-zA-Z0-9._@]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/g,
        'Username cannot contain special characters'
      ),
    email: yup.string().required('Email is required').email('Email is not valid'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must have at least 6 characters')
      .max(15, 'Username must be at most 15 characters'),
  }),
});
export default registerSchema;
