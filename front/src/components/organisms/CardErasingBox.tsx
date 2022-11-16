import type { FC } from 'react';
import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  useToast,
} from '@chakra-ui/react';
import type { WordSchema, OnDelete } from 'features/wordCollection';
import { useConnecting } from 'features/wordCollection';
import { BsXLg } from 'react-icons/bs';

interface Props {
  card: WordSchema;
  onDelete: OnDelete;
  helper: { isLoading: boolean; error: unknown };
}

export const CardErasingBox: FC<Props> = ({ card, onDelete, helper }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const toast = useToast();
  const [_, dispatch] = useConnecting();

  const onSubmit = (uid: string) => {
    const beforeRequest = () => {
      dispatch({ type: 'CONNECT' });
    };
    const afterResponse = () => {
      onClose();
      toast({
        title: 'A card has been Deleted.',
        position: 'top',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      dispatch({ type: 'DISCONNECT' });
    };
    onDelete(uid, beforeRequest, afterResponse);
  };

  return (
    <>
      <Button
        colorScheme="red"
        onClick={onOpen}
        className="!h-auto !rounded-none"
      >
        <BsXLg className="mx-auto" />
      </Button>
      <AlertDialog
        motionPreset="slideInBottom"
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              カードを削除します。
            </AlertDialogHeader>

            <AlertDialogBody>
              <div className="mb-2">
                <hr />
                <p className="py-3 text-xl font-bold">{card.英文}</p>
                <hr />
              </div>
              <p>本当に削除してもいいですか?</p>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                isDisabled={helper.isLoading}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                isLoading={helper.isLoading}
                onClick={() => onSubmit(card.uid)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
