import * as yup from 'yup';

export const createTopicSchema = yup.object({
  body: yup.object({
    name: yup
      .string()
      .required('Name is required')
      .min(4, 'Topic must have at least 4 characters')
      .max(20, 'Topic must be at most 20 characters'),
    background: yup.string().max(10).nullable(),
  }),
});

export const updateTopicSchema = yup.object({
  body: yup.object({
    name: yup
      .string()
      .min(4, 'Topic must have at least 4 characters')
      .max(20, 'Topic must be at most 20 characters')
      .nullable(),
    background: yup.string().max(10).nullable(),
  }),
});
