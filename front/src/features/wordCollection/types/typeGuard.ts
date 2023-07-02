// import type {
//   CardFindAllQuery,
//   WordCollectionEntity,
// } from 'domains/graphqlCodeGenerator/graphql';
import type { WordCollection, Category } from './response';

// 型ガード
export const isWordSchema = (arg: unknown): arg is WordCollection => {
  const uk = arg as WordCollection;

  return (
    (typeof uk?.id === 'number' || typeof uk?.id === 'string') &&
    typeof uk?.attributes.title === 'string' &&
    typeof uk?.attributes.japanese === 'string' &&
    typeof uk?.attributes.createdAt === 'string' &&
    typeof uk?.attributes.publishedAt === 'string' &&
    typeof uk?.attributes.updatedAt === 'string' &&
    typeof uk?.attributes.category.data.id === 'number' &&
    typeof uk?.attributes.category.data.attributes.name === 'string'
  );
};
export const isWordList = (arg: unknown[]): arg is WordCollection[] =>
  arg.some((arg) => isWordSchema(arg));

export const isCategory = (arg: unknown): arg is Category => {
  const uk = arg as Category;

  return (
    typeof uk?.id === 'number' &&
    typeof uk?.attributes.name === 'string' &&
    typeof uk?.attributes.createdAt === 'string' &&
    typeof uk?.attributes.publishedAt === 'string' &&
    typeof uk?.attributes.updatedAt === 'string'
  );
};
export const isCategories = (arg: unknown[]): arg is Category[] =>
  arg.some((arg) => isCategory(arg));

// GraphQLの型ガード
export const isWordSchemaWithGql = (arg: unknown): arg is WordCollection => {
  const uk = arg as WordCollection;
  const result =
    uk.id != null &&
    uk.attributes.category.data.id != null &&
    uk.attributes?.category?.data?.attributes?.name != null &&
    typeof uk.id === 'string' &&
    typeof uk.attributes.title === 'string' &&
    typeof uk.attributes.japanese === 'string' &&
    typeof uk.attributes.category.data.id === 'string' &&
    typeof uk.attributes.category.data.attributes?.name === 'string';

  return result;
};
export const isWordListWithGql = (arg: unknown): arg is WordCollection[] => {
  const uk = arg as WordCollection[];

  return uk.some((arg) => isWordSchemaWithGql(arg));
};

export const isCategoryGql = (arg: unknown): arg is Category => {
  const uk = arg as Category;
  const result =
    uk.id != null &&
    uk.attributes != null &&
    typeof uk.id === 'string' &&
    typeof uk.attributes.name === 'string';

  return result;
};

export const isCategoriesGql = (arg: unknown): arg is Category[] => {
  const uk = arg as Category[];

  return uk.some((arg) => isCategoryGql(arg));
};
