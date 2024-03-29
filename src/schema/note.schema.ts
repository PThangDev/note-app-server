import * as yup from 'yup';

export const createNoteSchema = yup.object({
  body: yup.object({
    title: yup
      .string()
      .required('Title is required')
      .min(4, 'Title must have at least 4 characters')
      .max(200, 'Title must be at most 200 characters'),
    content: yup
      .string()
      .required('Content is required')
      .max(20000, 'Content must be at most 20000 characters'),
    background: yup.string().nullable(),
    topics: yup.array(yup.string()).nullable(),
  }),
});

export const updateNoteSchema = yup.object({
  body: yup.object({
    title: yup
      .string()
      .min(4, 'Title must have at least 4 characters')
      .max(200, 'Title must be at most 200 characters')
      .nullable(),
    content: yup.string().max(20000, 'Content must be at most 20000 characters').nullable(),
    background: yup.string().nullable(),
    is_trash: yup.boolean().nullable(),
    is_pin: yup.boolean().nullable(),
  }),
});

export const deleteManyNoteSchema = yup.object({
  body: yup.object({
    noteIds: yup.array(yup.string()).required(),
  }),
});
