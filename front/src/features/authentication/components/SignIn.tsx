import type { FC } from 'react';
import { useState } from 'react';
import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSignInMutation } from 'features/graphql';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import type { InferType } from 'yup';
import * as yup from 'yup';
import { useAuth } from '../hooks/useAuth';

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

type UserData = {
  user: {
    id: string;
    username: string;
    email: string;
  };
  jwt: string;
};

const isUser = (arg: unknown): arg is UserData => {
  const uk = arg as UserData;

  return (
    uk?.user != null &&
    typeof uk?.user?.id === 'string' &&
    typeof uk?.user?.username === 'string' &&
    typeof uk?.user?.email === 'string' &&
    typeof uk?.jwt === 'string'
  );
};

export const SignIn: FC = () => {
  const [_auth, dispatch] = useAuth();
  const [_resultSignIn, signIn] = useSignInMutation();
  const [isInvalid, setIsInvalid] = useState(false);

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

  const logoSvg = useColorModeValue(
    '/img/logo_base1.svg',
    '/img/logo_white1.svg'
  );

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    const result = await signIn({
      identifier: data.Eメール,
      password: data.パスフレーズ,
    });

    const userData = result.data?.login as unknown;


    if (isUser(userData)) {
      const userInfo = {
        id: userData.user.id,
        username: userData.user.username,
        email: userData.user.email,
        jwt: userData.jwt,
      };

      dispatch({ type: 'SIGNIN', payload: userInfo });
      setIsInvalid(false);
    } else {
      setIsInvalid(true);
      if (result.error != null) {
        throw Error(result.error.message);
      } else {
        throw Error('API type error');
      }
    }
  };

  return (
    <>
      <section className="grid h-screen w-full place-items-center">
        <div className="w-full p-3">
          <div className="container">
            <img src={logoSvg} alt="" className="mb-5" />
            {!isInvalid ? (
              <p className="text-center">サインインしてください。</p>
            ) : (
              <p className="text-center text-amber-700">
                Eメール、パスフレーズ、またはその両方が違います。
              </p>
            )}

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
