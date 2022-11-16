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
  useCardCreate,
  useConnecting,
} from 'features/wordCollection';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { BsPlusLg, BsXLg } from 'react-icons/bs';
import { creatingFormSchema } from './schemas';
import type { CreatingFormSchema } from './schemas';

interface Props {
  onClose: () => void;
}

export const CreatingForm: FC<Props> = ({ onClose }) => {
  const [categories, { isLoading }] = useCategoryFindAll();
  const [onPost, helper] = useCardCreate();
  const toast = useToast();
  const [_, dispatch] = useConnecting();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatingFormSchema>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(creatingFormSchema),
    defaultValues: {
      英文: '',
      意味: '',
      カテゴリ: '',
    },
  });

  const onSubmit: SubmitHandler<CreatingFormSchema> = (data) => {
    const beforeRequest = () => {
      dispatch({ type: 'CONNECT' });
    };
    const afterResponse = () => {
      dispatch({ type: 'DISCONNECT' });
      onClose();
      reset();
      toast({
        title: 'A card has been added.',
        position: 'top',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    };

    onPost(data, beforeRequest, afterResponse);
  };

  return !isLoading && categories != null ? (
    <form id="card-create" noValidate onSubmit={handleSubmit(onSubmit)}>
      <ul className="mb-5 grid grid-cols-3 gap-4">
        <li className="col-span-3">
          <FormControl isInvalid={errors.英文 !== undefined}>
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
          colorScheme="green"
          type="submit"
          mr={3}
          leftIcon={<BsPlusLg />}
        >
          追加
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
