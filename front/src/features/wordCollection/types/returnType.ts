import type { WordSchema, CategorySchema } from './output';

// 戻り値パターン
// type ReturnTypeWithSetIsLoading<T> = [
//   T,
//   {
//     isLoading: boolean;
//     error: unknown | undefined;
//     setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   }
// ];

type ReturnType<T> = [T, { isLoading: boolean; error: unknown | undefined }];

export type UseCardFindAll = ReturnType<WordSchema[] | undefined>;

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
