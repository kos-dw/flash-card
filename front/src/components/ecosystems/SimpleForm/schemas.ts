import * as yup from 'yup';
import type { InferType } from 'yup';

const creatingFormSchema = yup.object({
  英文: yup
    .string()
    .required('必須項目です。')
    .matches(/[x01-x7E]/, { message: '半角英文字で入力してください。' }),
  意味: yup.string().required('必須項目です。'),
  カテゴリ: yup.string().required('必須項目です。'),
});

const updatingFormSchema = yup.object({
  uid: yup.string().required('必須項目です。'),
  英文: yup
    .string()
    .required('必須項目です。')
    .matches(/[x01-x7E]/, { message: '半角英文字で入力してください。' }),
  意味: yup.string().required('必須項目です。'),
  カテゴリ: yup.string().required('必須項目です。'),
});

type CreatingFormSchema = InferType<typeof creatingFormSchema>;
type UpdatingFormSchema = InferType<typeof updatingFormSchema>;

export { creatingFormSchema, updatingFormSchema };
export type { CreatingFormSchema, UpdatingFormSchema };
