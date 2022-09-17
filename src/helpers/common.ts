import { DataResponseSuccess } from '../types';

export const uppercaseFirstLetter = (char: string): string => {
  return char.charAt(0).toUpperCase() + char.slice(1);
};

export const createResponseSuccess = <T, M = unknown>(data: DataResponseSuccess<T, M>) => {
  const { data: _data, message, meta, status = 200 } = data;

  if (!meta) {
    return {
      data: _data,
      message,
      success: true,
      status,
    };
  }

  return {
    data: _data,
    message,
    success: true,
    status,
    meta,
  };
};
