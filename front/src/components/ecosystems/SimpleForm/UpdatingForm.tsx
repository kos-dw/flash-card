import type { FC } from 'react';
import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  Select,
  Button,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useCategoryFindAll,
  useCardUpdate,
  useConnecting,
} from 'features/wordCollection';
import type { WordSchema } from 'features/wordCollection';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { BsXLg, BsArrowClockwise } from 'react-icons/bs';
import { updatingFormSchema } from './schemas';
import type { UpdatingFormSchema } from './schemas';

interface Props {
  onClose: () => void;
  card: WordSchema;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}
export type TypeOfUpdatingForm = Props;

export const UpdatingForm: FC<Props> = ({ onClose, card, setIsProcessing }) => {
  const [categories, categoriesHelper] = useCategoryFindAll();
  const [onPut, helper] = useCardUpdate();
  const toast = useToast();
  const [_, dispatch] = useConnecting();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdatingFormSchema>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    shouldUnregister: false,
    resolver: yupResolver(updatingFormSchema),
    defaultValues: {
      uid: card.uid,
      英文: card.英文,
      意味: card.意味,
      カテゴリ: card.カテゴリ,
    },
  });

  const onSubmit: SubmitHandler<UpdatingFormSchema> = (data) => {
    const beforeRequest = () => {
      setIsProcessing(true);
      dispatch({ type: 'CONNECT' });
    };
    const afterResponse = () => {
      setIsProcessing(false);
      onClose();
      toast({
        title: 'A card has been Modified.',
        position: 'top',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      dispatch({ type: 'DISCONNECT' });
    };

    onPut(data, beforeRequest, afterResponse);
  };

  return !categoriesHelper.isLoading && categories != null ? (
    <form id="card-create" noValidate onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('uid')} />
      <ul className="mb-5 grid grid-cols-3 gap-4">
        <li className="col-span-3">
          <FormControl isInvalid={errors.英文 !== undefined} isRequired>
            <FormLabel htmlFor="英文">英単語</FormLabel>
            <Input placeholder="e.g. Hello world" {...register('英文')} />
            <FormErrorMessage>{errors.英文?.message}</FormErrorMessage>
          </FormControl>
        </li>
        <li className="col-span-3">
          <FormControl isInvalid={errors.意味 !== undefined} isRequired>
            <FormLabel htmlFor="意味">単語の意味</FormLabel>
            <Input placeholder="e.g. こんにちは、世界" {...register('意味')} />
            <FormErrorMessage>{errors.意味?.message}</FormErrorMessage>
          </FormControl>
        </li>
        <li className="col-span-3">
          <FormControl isInvalid={errors.カテゴリ !== undefined} isRequired>
            <FormLabel htmlFor="カテゴリ">単語のカテゴリ</FormLabel>
            <Select
              placeholder="Not currently selected."
              {...register('カテゴリ')}
            >
              {categories.map((category) => (
                <option value={category.uid} key={category.uid}>
                  {category.カテゴリ}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{errors.カテゴリ?.message}</FormErrorMessage>
          </FormControl>
        </li>
      </ul>

      <div className="flex pb-3">
        <Button
          isDisabled={helper.isLoading}
          mr={3}
          className="!mr-auto"
          onClick={() => reset()}
        >
          リセット
        </Button>

        <Button
          isLoading={helper.isLoading}
          colorScheme="blue"
          type="submit"
          mr={3}
          leftIcon={<BsArrowClockwise />}
        >
          更新
        </Button>
        <Button
          isDisabled={helper.isLoading}
          leftIcon={<BsXLg />}
          onClick={onClose}
        >
          閉じる
        </Button>
      </div>
    </form>
  ) : null;
};
