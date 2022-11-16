import type { FC } from 'react';
import { useState } from 'react';
import {
  Switch,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Circle,
  useColorMode,
} from '@chakra-ui/react';
import { useAuth } from 'features/authentication';

const avatars = [
  {
    uid: '1',
    path: 'img/avatar/1.svg#uuid-02b10db9-a8d5-470c-b138-041bd0f3f954',
  },
  {
    uid: '2',
    path: 'img/avatar/2.svg#uuid-d15d2365-7a4f-4fc3-91fa-76b2bfebeb1e',
  },
  {
    uid: '3',
    path: 'img/avatar/3.svg#uuid-d1beb6a2-89e3-46bd-8abf-a3fc7edd436d',
  },
  {
    uid: '4',
    path: 'img/avatar/4.svg#uuid-f8b5317c-881c-4b34-a174-eafb2a792e23',
  },
];

const MyPage: FC = () => {
  const storedAvatarUid = localStorage.getItem(
    import.meta.env.VITE_API_AVATAR_UID
  );
  const initionAvatar = storedAvatarUid ?? avatars[0].uid;

  const [avatarUid, setAvatarUid] = useState(initionAvatar);
  const modalControl = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [auth, dispatch] = useAuth();

  const provideAvatarPath = (uid: string) => {
    const avatar = avatars.find((row) => row.uid === uid);

    return avatar?.path ?? avatars[0].path;
  };

  const hundleAvatarChange = (uid: string) => {
    setAvatarUid(uid);
    localStorage.setItem(import.meta.env.VITE_API_AVATAR_UID, uid);
    modalControl.onClose();
  };

  return (
    <>
      <section className="container h-full border-8 p-3">
        <div className="mb-5 flex items-center">
          <button className="mr-3" onClick={modalControl.onOpen}>
            <Circle bg="tomato" color="white" className="p-3">
              <svg className="h-10 w-10">
                <use xlinkHref={provideAvatarPath(avatarUid)} />
              </svg>
            </Circle>
          </button>
          <h2 className="shrink grow text-xl font-bold">{auth?.username}</h2>
          <Button onClick={() => dispatch({ type: 'SIGNOUT' })}>
            Sign out
          </Button>
        </div>

        <ul>
          <li>
            <dl className="grid grid-cols-6 gap-2">
              <dt className="col-span-2">ダークモード</dt>
              <dd className="col-span-4 flex">
                <span className="en">OFF</span>
                <Switch
                  id="email-alerts"
                  className="mx-3"
                  onChange={toggleColorMode}
                  defaultChecked={colorMode === 'dark'}
                />
                <span className="en">ON</span>
              </dd>
            </dl>
          </li>
        </ul>
      </section>
      <section>
        <Modal
          isOpen={modalControl.isOpen}
          onClose={modalControl.onClose}
          motionPreset="slideInBottom"
          isCentered
        >
          <ModalOverlay
            bg="blackAlpha.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
          />
          <ModalContent>
            <ModalHeader>アイコンを選ぶ</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ul className="mr-2 flex">
                {avatars.map((avatar) => (
                  <li className="col-span-3" key={avatar.uid}>
                    <button
                      className="mr-3"
                      onClick={() => hundleAvatarChange(avatar.uid)}
                    >
                      <svg className="h-10 w-10 text-gray-400">
                        <use xlinkHref={avatar.path} />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </ModalBody>

            <ModalFooter>
              <Button onClick={modalControl.onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </section>
    </>
  );
};

export default MyPage;
