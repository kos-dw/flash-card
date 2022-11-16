import type { FC } from 'react';
import IndexRoutes from 'routes';
import Providers from 'Providers';

const App: FC = () => {
  return (
    <Providers>
      <IndexRoutes />
    </Providers>
  );
};

export default App;
