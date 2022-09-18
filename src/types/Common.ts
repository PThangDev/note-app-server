type TokenType = 'active_token' | 'access_token' | 'refresh_token';
export type Token = {
  [key in TokenType]?: string;
};

export interface Pagination {
  page_size: number;
  page_count: number;
  total: number;
  limit: number;
}

export interface MetaPagination {
  pagination: Pagination;
}

type AnyKey = {
  [key: string]: string;
};

export type Meta<T> = { pagination?: T };

export interface DecodedToken {
  _id?: string;
  iat: number;
  exp: number;
}

export interface DataResponseSuccess<T, M> {
  data: T;
  message: string;
  status?: number;
  meta?: M;
}

export interface BaseParams {
  limit?: string;
  page?: string;
  search?: string;
}
