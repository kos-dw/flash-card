import type { FC } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  // useToast,
} from '@chakra-ui/react';
import type { WordSchema } from 'features/wordCollection';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import type { TypeOfUpdatingForm } from 'components/ecosystems/SimpleForm';

interface Props {
  card: WordSchema;
  UpdatingForm: FC<TypeOfUpdatingForm>;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardUpdatingBox: FC<Props> = ({
  card,
  UpdatingForm,
  setIsProcessing,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        colorScheme="blue"
        onClick={onOpen}
        className="!h-auto !rounded-none"
      >
        <BsArrowCounterclockwise className="mx-auto text-xl" />
      </Button>
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
          <ModalHeader>カードの情報を編集します</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {card != null ? (
              <UpdatingForm {...{ onClose, card, setIsProcessing }} />
            ) : null}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
