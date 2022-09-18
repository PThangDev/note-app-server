import createHttpError from 'http-errors';

import { createResponseSuccess, createSlug } from '../helpers';
import { TopicModel } from '../models';
import { RequestAuth, TopicUpdate } from '../types';

// Get topics
export const getTopics = async (req: RequestAuth) => {
  const { note_limit, note_page } = req.query;

  const topics = await TopicModel.find({ user: req?.user?._id }).populate({
    path: 'user',
    select: '-password',
  });

  return createResponseSuccess({ data: topics, message: 'Get topics successfully' });
};
// Get topic detail
export const getTopic = async (req: RequestAuth) => {
  const { id } = req.params;
  const { user } = req;

  const noteDetail = await TopicModel.findOne({ _id: id, user: user?._id })
    .populate({
      path: 'user',
      select: '-password',
    })
    .populate({ path: 'notes' });

  if (!noteDetail) throw createHttpError(404, 'Note id is note valid');

  return createResponseSuccess({ data: noteDetail, message: 'Get note detail successfully' });
};
// Create new topic
export const createTopic = async (req: RequestAuth) => {
  const { user } = req;
  const { name, background } = req.body;

  const newTopic = new TopicModel({
    name,
    background,
    user: user?._id,
    slug: createSlug(name),
  });

  await newTopic.save();

  return createResponseSuccess({
    status: 201,
    data: newTopic,
    message: 'Create new topic successfully',
  });
};
// Update topic
export const updateTopic = async (req: RequestAuth) => {
  const { user } = req;
  const { id } = req.params;
  const { name, background, notes } = req.body;

  const dataUpdate: TopicUpdate & { slug?: string } = {
    name,
    background,
    notes,
  };

  Object.keys(dataUpdate).forEach((key) =>
    dataUpdate[key as keyof TopicUpdate] === undefined ||
    dataUpdate[key as keyof TopicUpdate] === ''
      ? delete dataUpdate[key as keyof TopicUpdate]
      : {}
  );

  if (dataUpdate.hasOwnProperty('name')) {
    dataUpdate.slug = createSlug(dataUpdate.name);
  }

  const topicUpdated = await TopicModel.findOneAndUpdate({ _id: id, user: user?._id }, dataUpdate, {
    new: true,
  });

  if (!topicUpdated)
    throw createHttpError(400, 'Update note failed. Invalid id or wrong data update');

  return createResponseSuccess({ data: topicUpdated, message: 'Update note successfully!' });
};
// Delete topic
export const deleteTopic = async (req: RequestAuth) => {
  const { user } = req;
  const { id } = req.params;

  const topicDeleted = await TopicModel.findOneAndDelete({ _id: id, user: user?._id });

  return createResponseSuccess({ data: topicDeleted, message: 'Delete note successfully' });
};
// Delete many topics
export const deleteTopics = async (req: RequestAuth) => {
  const { user } = req;
  const { topicIds } = req.body;

  const topicsDeleted = await TopicModel.deleteMany({ _id: topicIds, user: user?._id });

  return createResponseSuccess({ data: topicsDeleted, message: 'Delete many notes successfully' });
};
