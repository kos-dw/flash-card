import type { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Circle,
} from '@chakra-ui/react';
import { BsPlusLg } from 'react-icons/bs';

interface Props {
  CreatingForm: FC<{ onClose: () => void }>;
}

export const CardCreatingBox: FC<Props> = ({ CreatingForm }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button className="fixed bottom-20 right-5" onClick={onOpen}>
        <Circle size="60px" bg="tomato" color="white">
          <BsPlusLg className="text-2xl" />
        </Circle>
      </button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />

        <ModalContent>
          <ModalHeader>カードを新規作成します。</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreatingForm {...{ onClose }} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
