import type { FC } from 'react';
import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { kyClient } from 'utils';
import type { InferType } from 'yup';
import * as yup from 'yup';
import { useAuth } from '../hooks/useAuth';
import type { Response } from '../types/';

const validationSchema = yup.object({
  Eメール: yup
    .string()
    .email('メールアドレスの形式が正しくありません。')
    .required('必須項目です。'),
  パスフレーズ: yup
    .string()
    .matches(/^[0-9a-zA-Z]+$/, '半角英文字で入力してください。')
    // .matches(/(?=.*[a-z])/, '小文字を含めてください。')
    // .matches(/(?=.*[A-Z])/, '大文字を含めてください。')
    // .matches(/(?=.*[0-9])/, '数字を含めてください。')
    .min(8, '8文字以上入力してください。')
    .max(24, '24文字以下にしてください。')
    .required('必須項目です。'),
});

type FormSchema = InferType<typeof validationSchema>;

export const SignIn: FC = () => {
  const logoSvg = useColorModeValue(
    '/img/logo_base1.svg',
    '/img/logo_white1.svg'
  );
  const [_, dispatch] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(validationSchema),
    defaultValues: {
      Eメール: '',
      パスフレーズ: '',
    },
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const res: Response = await kyClient
      .post('auth/local', {
        json: {
          identifier: data.Eメール,
          password: data.パスフレーズ,
        },
      })
      .json();

    const userInfo = {
      id: res.user.id.toString(),
      username: res.user.username,
      email: res.user.email,
      jwt: res.jwt,
    };

    dispatch({ type: 'SIGNIN', payload: userInfo });
  };

  return (
    <>
      <section className="grid h-screen w-full place-items-center">
        <div className="w-full p-3">
          <div className="container">
            <img src={logoSvg} alt="" className="mb-5" />
            <p className="text-center">サインインしてください。</p>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
              <ul className="mb-5 grid grid-cols-3 gap-4">
                <li className="col-span-3">
                  <FormControl
                    isInvalid={errors.Eメール !== undefined}
                    isRequired
                  >
                    <FormLabel htmlFor="Eメール">Eメール</FormLabel>
                    <Input
                      type="email"
                      placeholder="e.g. john@example.com"
                      {...register('Eメール')}
                    />
                    <FormErrorMessage>
                      {errors.Eメール?.message}
                    </FormErrorMessage>
                  </FormControl>
                </li>
                <li className="col-span-3">
                  <FormControl
                    isInvalid={errors.パスフレーズ !== undefined}
                    isRequired
                  >
                    <FormLabel htmlFor="パスフレーズ">パスフレーズ</FormLabel>
                    <Input
                      type="password"
                      placeholder="Enter passphrase"
                      {...register('パスフレーズ')}
                    />
                    <FormErrorMessage>
                      {errors.パスフレーズ?.message}
                    </FormErrorMessage>
                  </FormControl>
                </li>
              </ul>
              <div className="flex justify-center p-3">
                <Button isLoading={false} colorScheme="green" type="submit">
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};
