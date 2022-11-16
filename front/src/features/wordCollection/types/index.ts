// ベースタイプ
export interface WCResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}

interface DataSchema<T> {
  id: number;
  attributes: T;
}

// カテゴリ
interface CategoryAttributes {
  name: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}
export type Category = DataSchema<CategoryAttributes>;

// 単語帳
interface WordColectionAttributes {
  title: string;
  japanese: string;
  category: WCResponse<Category>;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
}
export type WordColection = DataSchema<WordColectionAttributes>;

// 出力タイプ
export interface WordSchema {
  uid: string;
  英文: string;
  意味: string;
  カテゴリ: string;
}
export interface CategorySchema {
  uid: string;
  カテゴリ: string;
}

// 型ガード
export const isWordSchema = (arg: unknown): arg is WordColection => {
  const w = arg as WordColection;

  return (
    typeof w?.id === 'number' &&
    typeof w?.attributes.title === 'string' &&
    typeof w?.attributes.japanese === 'string' &&
    typeof w?.attributes.createdAt === 'string' &&
    typeof w?.attributes.publishedAt === 'string' &&
    typeof w?.attributes.updatedAt === 'string' &&
    typeof w?.attributes.category.data.id === 'number' &&
    typeof w?.attributes.category.data.attributes.name === 'string'
  );
};
export const isWordList = (arg: unknown[]): arg is WordColection[] =>
  arg.some((arg) => isWordSchema(arg));

export const isCategory = (arg: unknown): arg is Category => {
  const C = arg as Category;

  return (
    typeof C?.id === 'number' &&
    typeof C?.attributes.name === 'string' &&
    typeof C?.attributes.createdAt === 'string' &&
    typeof C?.attributes.publishedAt === 'string' &&
    typeof C?.attributes.updatedAt === 'string'
  );
};
export const isCategories = (arg: unknown[]): arg is Category[] =>
  arg.some((arg) => isCategory(arg));

// 戻り値パターン
type ReturnTypeWithSetIsLoading<T> = [
  T,
  {
    isLoading: boolean;
    error: unknown | undefined;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }
];

type ReturnType<T> = [T, { isLoading: boolean; error: unknown | undefined }];
export type UseCardFindAll = ReturnTypeWithSetIsLoading<
  WordSchema[] | undefined
>;

export type UseCategoryFindAll = ReturnType<CategorySchema[] | undefined>;
export type UseCardCreate = ReturnType<
  (T: Omit<WordSchema, 'uid'>, U: () => void, V: () => void) => void
>;
export type UseCardUpdate = ReturnType<
  (T: WordSchema, U: () => void, V: () => void) => void
>;
export type UseCardErase = ReturnType<
  (T: string, U: () => void, V: () => void) => void
>;

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
