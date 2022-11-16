import type { FC, MouseEventHandler, RefObject } from 'react';
import { useRef, createRef, useState, useEffect } from 'react';
import { Badge } from '@chakra-ui/react';
import { CardCreater, CardUpdater, CardEraser } from 'components/ecosystems';
import { useCardFindAll, useCategoryFindAll } from 'features/wordCollection';

const Update: FC = () => {
  const [cards] = useCardFindAll();
  const [categories] = useCategoryFindAll();
  const [isProcessing, setIsProcessing] = useState(false);
  const refs = useRef<Array<RefObject<HTMLButtonElement>>>([]);

  if (cards != null)
    refs.current = cards.map(() => createRef<HTMLButtonElement>());

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    refs.current.forEach((el) => {
      if (el.current === event.currentTarget) {
        el.current.classList.toggle('active');
      } else {
        el.current?.classList.remove('active');
      }
    });
  };

  useEffect(() => {
    if (!isProcessing) {
      refs.current.forEach((el) => {
        el.current?.classList.remove('active');
      });
    }
  }, [isProcessing]);

  return cards != null && categories != null ? (
    <>
      <section className="container my-3">
        <ul>
          {cards.map((card, index) => (
            <li className="relative mb-1 overflow-hidden" key={card.uid}>
              <div className="flex items-center border-b">
                <dl className="flex-auto">
                  <dt className="en truncate text-xl">{card.英文}</dt>
                  <dd>{card.意味}</dd>
                </dl>
                <Badge className="shrink-0 grow-0" colorScheme="green">
                  {categories.find((c) => c.uid === card.カテゴリ)?.カテゴリ}
                </Badge>
              </div>
              <div className="absolute top-0 left-0 flex h-full w-full">
                <button
                  id={`index-${index}`}
                  ref={refs.current[index]}
                  onClick={handleOnClick}
                  className="w-full flex-none"
                />
                <div className="flex h-full flex-none transition-transform [button.active+&]:-translate-x-full">
                  <CardUpdater {...{ card, setIsProcessing }} />
                  <CardEraser {...{ card }} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <CardCreater />
    </>
  ) : null;
};

export default Update;
