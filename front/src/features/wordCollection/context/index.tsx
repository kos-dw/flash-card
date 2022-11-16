import { createContext, useReducer } from 'react';
import type { FC, PropsWithChildren, Dispatch } from 'react';

interface WCCAction {
  type: 'CONNECT' | 'DISCONNECT';
}

type WCCContextSchema = [boolean, Dispatch<WCCAction>];
export type ReturnTypeUseConnecting = WCCContextSchema;

const initialContext: WCCContextSchema = [false, () => undefined];

const reducer = (state: boolean, action: WCCAction): boolean => {
  switch (action.type) {
    case 'CONNECT': {
      return true;
    }
    case 'DISCONNECT': {
      return false;
    }
    default: {
      throw new Error();
    }
  }
};

export const WCCContext = createContext<WCCContextSchema>(initialContext);

export const WCCProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isConnecting, dispatch] = useReducer(reducer, false);

  return (
    <WCCContext.Provider value={[isConnecting, dispatch]}>
      {children}
    </WCCContext.Provider>
  );
};
