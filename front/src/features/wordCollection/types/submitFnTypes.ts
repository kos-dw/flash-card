import type { WordSchema } from './output';

// apiアクション
export type onPost = (
  formdata: Omit<WordSchema, 'uid'>,
  beforeRequest: () => void,
  afterResponse: () => void
) => void;

export type OnPut = (
  formdata: WordSchema,
  beforeRequest: () => void,
  afterResponse: () => void
) => void;

export type OnDelete = (
  uid: string,
  beforeRequest: () => void,
  afterResponse: () => void
) => void;
