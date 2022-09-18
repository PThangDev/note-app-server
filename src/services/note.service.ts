import createErrors from 'http-errors';

import { createResponseSuccess, createSlug } from '../helpers';
import { NoteModel } from '../models';
import { NoteUpdate, RequestAuth, User } from '../types';

// Get notes
export const getNotes = async (req: RequestAuth) => {
  const user = req.user as User;

  const filter = {
    ...req.query,
    user: user._id,
  };

  const notes = await NoteModel.find(filter);

  return createResponseSuccess({ data: notes, message: 'Get notes successfully' });
};
// Get note by id
export const getNoteDetail = async (req: RequestAuth) => {
  const user = req.user as User;
  const { id } = req.params;

  const note = await NoteModel.findOne({ user: user._id, _id: id }).populate({
    path: 'user',
    select: '-password',
  });

  if (!note) throw createErrors(404, 'Note does note exist');

  return createResponseSuccess({ data: note, message: 'Get note detail by id successfully' });
};
// Create notes
export const createNote = async (req: RequestAuth) => {
  const user = req.user as User;

  const { background, content, thumbnail, title, topics } = req.body;

  const newNote = new NoteModel({
    title,
    content,
    thumbnail,
    background,
    topics: topics || null,
    user: user._id,
    slug: createSlug(title),
  });

  await newNote.save();

  return createResponseSuccess({
    status: 201,
    data: newNote,
    message: 'Create new note successfully',
  });
};
// Update note
export const updateNote = async (req: RequestAuth) => {
  const { id } = req.params;
  const user = req.user as User;
  const { title, content, thumbnail, background, topics, is_pin, is_trash } = req.body;

  const dataUpdate: NoteUpdate = {
    title,
    content,
    thumbnail,
    background,
    topics,
    is_pin,
    is_trash,
    slug: '',
  };

  Object.keys(dataUpdate).forEach((key) =>
    dataUpdate[key as keyof NoteUpdate] === undefined || dataUpdate[key as keyof NoteUpdate] === ''
      ? delete dataUpdate[key as keyof NoteUpdate]
      : {}
  );

  if (dataUpdate.hasOwnProperty('title')) {
    dataUpdate.slug = createSlug(dataUpdate.title);
  }

  const noteUpdated = await NoteModel.findOneAndUpdate({ _id: id, user: user._id }, dataUpdate, {
    new: true,
  });

  if (!noteUpdated) throw createErrors(400, 'Update note failed. Account or note id is invalid');

  return createResponseSuccess({ data: noteUpdated, message: 'Update note successfully' });
};
// Delete note
export const deleteNote = async (req: RequestAuth) => {
  const user = req.user as User;
  const { id } = req.params;

  const noteDeleted = await NoteModel.findOneAndDelete({ _id: id, user: user._id });

  if (!noteDeleted) throw createErrors(404, 'Note does not exist');

  return createResponseSuccess({ data: noteDeleted, message: 'Delete note successfully' });
};
// Delete many notes
export const deleteNotes = async (req: RequestAuth) => {
  const { noteIds } = req.body;
  const user = req.user as User;

  const notesDeleted = await NoteModel.deleteMany(
    { _id: noteIds, user: user._id },
    { returnOriginal: true }
  );

  if (!notesDeleted || notesDeleted.deletedCount === 0)
    throw createErrors(400, 'Delete failed. Invalid notes');

  return createResponseSuccess({ data: notesDeleted, message: 'Delete many notes successfully' });
};
// Move many notes to trash
export const moveNotesToTrash = async (req: RequestAuth) => {
  const { noteIds } = req.body;
  const user = req.user as User;

  const dataUpdate = { is_trash: true };

  console.log(noteIds);

  const notesMovedToTrash = await NoteModel.updateMany(
    { _id: noteIds, user: user._id },
    dataUpdate,
    { new: true }
  );

  return createResponseSuccess({
    data: notesMovedToTrash,
    message: 'Move notes to trash successfully',
  });
};
