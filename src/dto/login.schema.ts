import * as yup from 'yup';

const loginSchema = yup.object({
  body: yup.object({
    account: yup
      .string()
      .required('Account is required')
      .min(4, 'Account must have at least 4 characters')
      .max(20, 'Account must be at most 20 characters')
      .matches(
        /^(?:[A-Z\d][A-Z\d_-]{5,10}|[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i,
        'Invalid. Account must be an your Email or Username'
      ),
    password: yup
      .string()
      .required('Password is required!')
      .min(6, 'Password must have at least 6 characters')
      .max(15, 'Username must be at most 15 characters'),
  }),
});
export default loginSchema;
