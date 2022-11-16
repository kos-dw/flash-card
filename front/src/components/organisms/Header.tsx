import type { FC } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
export const Header: FC = () => {
  const modeIcon = useColorModeValue('🌞', '🌛');

  return (
    <header className="sticky top-0 z-10  bg-stone-100 py-2">
      <section className="container flex items-center justify-between">
        <div className="w-60">
          <Link to="/">
            <img src="/img/logo_base1.svg" alt="" />
          </Link>
        </div>
        <div className="w-auto text-2xl">{modeIcon}</div>
      </section>
    </header>
  );
};
