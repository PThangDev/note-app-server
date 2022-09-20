import * as yup from 'yup';

const activeAccountSchema = yup.object({
  body: yup.object({
    active_token: yup.string().required('Active token is required'),
  }),
});

export default activeAccountSchema;
