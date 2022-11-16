import { useContext } from 'react';
import { AuthContext } from '../context';
import type { ReturnTypeUseAuth } from '../context';

export const useAuth = (): ReturnTypeUseAuth => useContext(AuthContext);
