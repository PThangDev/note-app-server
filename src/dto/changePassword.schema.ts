import * as yup from 'yup';

const changePasswordSchema = yup.object({
  body: yup.object({
    oldPassword: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must have at least 6 characters')
      .max(15, 'Username must be at most 15 characters'),
    newPassword: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must have at least 6 characters')
      .max(15, 'Username must be at most 15 characters')
      .notOneOf([yup.ref('oldPassword')], 'New password is same as password'),
  }),
});

export default changePasswordSchema;
