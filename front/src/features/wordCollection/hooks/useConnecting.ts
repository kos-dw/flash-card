import { useContext } from 'react';
import { WCCContext } from '../context';
import type { ReturnTypeUseConnecting } from '../context';

export const useConnecting = (): ReturnTypeUseConnecting =>
  useContext(WCCContext);
