import type { FC, PropsWithChildren } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from 'features/authentication';
import { GraphqlProvider } from 'features/graphql';
import { WCCProvider } from 'features/wordCollection/';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <AuthProvider>
      <WCCProvider>
        <HelmetProvider>
          <BrowserRouter>
            <GraphqlProvider>
              <ChakraProvider>{children}</ChakraProvider>
            </GraphqlProvider>
          </BrowserRouter>
        </HelmetProvider>
      </WCCProvider>
    </AuthProvider>
  );
};

export default Providers;
