import * as yup from 'yup';

export const loginSchema = yup.object({
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

export const registerSchema = yup.object({
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

export const forgotPasswordSchema = yup.object({
  body: yup.object({
    email: yup.string().required('Email is required').email('Email is not valid'),
  }),
});

export const changePasswordSchema = yup.object({
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

export const resetPasswordSchema = yup.object({
  body: yup.object({
    newPassword: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must have at least 6 characters')
      .max(15, 'Username must be at most 15 characters')
      .notOneOf([yup.ref('oldPassword')], 'New password is same as password'),
  }),
});

export const activeAccountSchema = yup.object({
  body: yup.object({
    activeToken: yup.string().required('Active token is required'),
  }),
});
