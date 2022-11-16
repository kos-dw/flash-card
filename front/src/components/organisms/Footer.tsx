import type { FC } from 'react';
import { Icon } from '@chakra-ui/react';
import {
  BsHouseFill,
  BsSearch,
  BsArrowRepeat,
  BsPersonFill,
} from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

type IconType =
  | typeof BsHouseFill
  | typeof BsSearch
  | typeof BsArrowRepeat
  | typeof BsPersonFill;

const buttonSchema: Array<[IconType, string, string]> = [
  [BsHouseFill, '/', 'home'],
  // [BsSearch, '/search', 'search'],
  [BsArrowRepeat, '/update', 'modify'],
  [BsPersonFill, '/mypage', 'mypage'],
];

export const Footer: FC = () => {
  return (
    <footer className="leading-0 fixed bottom-0 left-0 z-10 w-full bg-black text-center text-white">
      <section className="container">
        <ul className="grid h-16 grid-cols-3 place-items-center py-2">
          {buttonSchema.map(([icon, to, label]) => (
            <li key={to}>
              <NavLink
                to={to}
                {...(to === '/' ? { end: true } : null)}
                className="[&.active]:text-sky-500"
              >
                <Icon
                  as={icon}
                  className="
                [a.active_&]:scale-120 scale-100 text-xl duration-300 marker:ease-in-out
                [a.active_&]:duration-300
                [a.active_&]:ease-in-out"
                />
                <p
                  className="
                h-0 opacity-0 duration-300 ease-in-out
                [a.active_&]:h-[1.4em]
                [a.active_&]:opacity-100"
                >
                  {label}
                </p>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </footer>
  );
};
