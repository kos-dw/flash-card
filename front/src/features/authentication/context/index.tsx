import { createContext, useReducer } from 'react';
import type { FC, PropsWithChildren, Dispatch } from 'react';
import { kyClient, isKyError } from 'utils';
import type { User, ResponseWithToken } from '../types';

type AuthState = User | null;
interface AuthAction {
  type: 'SIGNIN' | 'SIGNOUT';
  payload?: User;
}

type AuthContextSchema = [AuthState, Dispatch<AuthAction>];
export type ReturnTypeUseAuth = AuthContextSchema;

const initialContext: AuthContextSchema = [null, () => undefined];

const reducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SIGNIN': {
      const userInfo = action.payload != null ? action.payload : null;

      if (userInfo != null) {
        const flashCardToken = userInfo.jwt;
        localStorage.setItem(import.meta.env.VITE_API_TOKEN, flashCardToken);
      }

      return userInfo;
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

export const AuthContext = createContext<AuthContextSchema>(initialContext);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auth, dispatch] = useReducer(reducer, null);

  const setUserIdentifier = async (token: string) => {
    try {
      const res = await kyClient.get(`users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: ResponseWithToken = await res.json();
      const userIdentifier = {
        id: data.id.toString(),
        username: data.username,
        email: data.email,
        jwt: token,
      };

      dispatch({ type: 'SIGNIN', payload: userIdentifier });
    } catch (e) {
      if (isKyError(e)) {
        console.error('An error occurred:', e.response.statusText);
      }
    }
  };

  const token = localStorage.getItem(import.meta.env.VITE_API_TOKEN);

  if (token != null && auth == null) void setUserIdentifier(token);

  return (
    <AuthContext.Provider value={[auth, dispatch]}>
      {children}
    </AuthContext.Provider>
  );
};
