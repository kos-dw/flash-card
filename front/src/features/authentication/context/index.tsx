import { createContext, useReducer } from 'react';
import type { FC, PropsWithChildren, Dispatch } from 'react';
import { useUserDataQuery } from 'features/graphql';
import type { User } from '../types';

// type declaration from here
type AuthState = User | null;
type AuthAction = {
  type: 'SIGNIN' | 'SIGNOUT';
  payload?: User;
};
type UserData = {
  id: string;
  username: string;
  email: string;
};
type AuthContextSchema = [AuthState, Dispatch<AuthAction>];
export type ReturnTypeUseAuth = AuthContextSchema;
// So far

// function for type guard
const isUser = (arg: unknown): arg is UserData => {
  const uk = arg as UserData;

  const result =
    typeof uk?.id === 'string' &&
    typeof uk?.username === 'string' &&
    typeof uk?.email === 'string';

  // console.log(result, uk);

  return result;
};

export const AuthContext = createContext<AuthContextSchema>([
  null,
  () => undefined,
]);

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGNIN': {
      const userInfo = action.payload;

      if (userInfo != null) {
        localStorage.setItem(import.meta.env.VITE_API_TOKEN, userInfo.jwt);

        return userInfo;
      }

      return null;
    }
    case 'SIGNOUT': {
      localStorage.removeItem(import.meta.env.VITE_API_TOKEN);

      return null;
    }
    default: {
      throw new Error();
    }
  }
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auth, dispatch] = useReducer(reducer, null);
  const [result] = useUserDataQuery();
  const { data } = result;

  const userData = data?.me as unknown;
  const token = localStorage.getItem(import.meta.env.VITE_API_TOKEN);


  const setUserIdentifier = (token: string, data: unknown) => {
    if (isUser(data)) {
      const user = {
        id: data.id,
        username: data.username,
        email: data.email,
        jwt: token,
      };

      dispatch({ type: 'SIGNIN', payload: user });
    }
  };

  if (token != null && auth == null) setUserIdentifier(token, userData);

  return (
    <AuthContext.Provider value={[auth, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
