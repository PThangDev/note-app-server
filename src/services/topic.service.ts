import createHttpError from 'http-errors';

import { createResponseSuccess, createSlug } from '../helpers';
import FilterDocumentAPI from '../helpers/FilterDocumentAPI';
import { NoteModel, TopicModel } from '../models';
import { Pagination, RequestAuth, TopicUpdate } from '../types';

// Get topics
export const getTopics = async (req: RequestAuth) => {
  const { note_limit, note_page } = req.query;
  const noteLimit = Number(note_limit) || 8;

  const user = req?.user;

  const filter = {
    ...req.query,
    user: user?._id,
  };

  const topicsFiltered = new FilterDocumentAPI(
    TopicModel.find(filter)
      .populate({ path: 'user', select: '-password' })
      .populate({
        path: 'notes',
        match: { is_trash: false, is_pin: false },
        options: { limit: noteLimit, sort: '-createdAt' },
        populate: { path: 'topics' },
      }),
    filter
  )
    .search()
    .filter()
    .pagination()
    .sortable();
  const count = new FilterDocumentAPI(TopicModel.find(filter), filter).search().filter().count();

  const [topics, totalItems] = await Promise.all([topicsFiltered.query, count.query]);

  const pageCount = Math.ceil(totalItems / topicsFiltered.limit);

  const pagination: Pagination = {
    limit: topicsFiltered.limit,
    total: totalItems,
    page_size: topics.length,
    page_count: pageCount,
  };

  return createResponseSuccess({
    data: topics,
    message: 'Get topics successfully',
    meta: { pagination },
  });
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
  const { name, description, background } = req.body;

  const topic = await TopicModel.findOne({ user: user?._id, name });

  if (topic) throw createHttpError(400, 'Topic has already exist');

  const newTopic = new TopicModel({
    name,
    description,
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
  const { name, description, background, notes } = req.body;

  const topic = await TopicModel.findOne({ user: user?._id, _id: { $ne: id }, name });

  if (topic) throw createHttpError(400, 'Topic has already exist');

  const dataUpdate: TopicUpdate & { slug?: string } = {
    name,
    description,
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
  })
    .populate({ path: 'user', select: '-password' })
    .populate({ path: 'notes' });

  if (!topicUpdated)
    throw createHttpError(400, 'Update note failed. Invalid id or wrong data update');

  return createResponseSuccess({ data: topicUpdated, message: 'Update note successfully!' });
};
// Delete topic
export const deleteTopic = async (req: RequestAuth) => {
  const { user } = req;
  const { id } = req.params;

  const topicDeleted = await TopicModel.findOneAndDelete({ _id: id, user: user?._id });

  await NoteModel.updateMany({ user: user?._id, topics: id }, { $pull: { topics: id } });

  return createResponseSuccess({ data: topicDeleted, message: 'Delete note successfully' });
};
// Delete many topics
export const deleteTopics = async (req: RequestAuth) => {
  const { user } = req;
  const { topicIds } = req.body;

  const topicsDeleted = await TopicModel.deleteMany({ _id: topicIds, user: user?._id });

  await NoteModel.updateMany(
    { user: user?._id, topics: { $in: topicIds } },
    { $pullAll: { topics: topicIds } }
  );

  return createResponseSuccess({ data: topicsDeleted, message: 'Delete many notes successfully' });
};
