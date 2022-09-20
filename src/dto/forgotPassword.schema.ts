import * as yup from 'yup';

const forgotPasswordSchema = yup.object({
  body: yup.object({
    email: yup.string().required('Email is required').email('Email is not valid'),
  }),
});
export default forgotPasswordSchema;
