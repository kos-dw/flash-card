// ベースタイプ
export type WCResponse<T> = {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
};

type DataSchema<T> = {
  id: string;
  attributes: T;
};

// カテゴリ
type CategoryAttributes = {
  name: string;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
};
export type Category = DataSchema<CategoryAttributes>;

// 単語帳
type WordCollectionAttributes = {
  title: string;
  japanese: string;
  category: WCResponse<Category>;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
};
export type WordCollection = DataSchema<WordCollectionAttributes>;
