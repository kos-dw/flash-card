import type { FC, PropsWithChildren } from 'react';
import { useAuth } from 'features/authentication';
import { createClient, Provider } from 'urql';

export const GraphqlProvider: FC<PropsWithChildren> = ({ children }) => {
  const [auth] = useAuth();

  const client = createClient({
    url: import.meta.env.VITE_GRAPHQL_ANDPOINT,
    suspense: true,
    fetchOptions: {
      headers: { authorization: auth != null ? `Bearer ${auth.jwt}` : '' },
    },
  });

  return <Provider value={client}>{children}</Provider>;
};
