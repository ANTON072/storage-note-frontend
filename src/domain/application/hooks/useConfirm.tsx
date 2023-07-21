import { useRef, useState } from "react";

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Portal,
} from "@chakra-ui/react";

import type { ThemeTypings } from "@chakra-ui/react";

export type DialogValues = {
  title?: string;
  body: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: ThemeTypings["colorSchemes"];
  cancelColor?: ThemeTypings["colorSchemes"];
};

const DEFAULT_DIALOG_VALUES: Partial<DialogValues> = {
  confirmLabel: "はい",
  cancelLabel: "いいえ",
  confirmColor: "blue",
  cancelColor: "gray",
};

export const useConfirm = () => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  const [dialogValues, setDialogValues] = useState<DialogValues>();

  const [resolver, setResolver] = useState<((value?: unknown) => void) | null>(
    null
  );

  const confirm = (values: DialogValues) => {
    setDialogValues({ ...DEFAULT_DIALOG_VALUES, ...values });
    return new Promise((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleClose = () => {
    setResolver(null);
  };

  const handleCancel = () => {
    if (resolver) {
      setResolver(() => () => Promise.reject("cancel"));
    }
    handleClose();
  };

  const handleConfirm = () => {
    if (resolver) {
      resolver(true);
    }
    handleClose();
  };

  const ConfirmDialog = () => {
    return (
      <Portal>
        <AlertDialog
          isOpen={resolver !== null}
          leastDestructiveRef={cancelRef}
          onClose={handleCancel}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              {dialogValues?.title && (
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  {dialogValues.title}
                </AlertDialogHeader>
              )}
              <AlertDialogBody>{dialogValues?.body}</AlertDialogBody>
              <AlertDialogFooter>
                <Button
                  colorScheme={dialogValues?.cancelColor}
                  ref={cancelRef}
                  onClick={handleCancel}
                >
                  {dialogValues?.cancelLabel}
                </Button>
                <Button
                  colorScheme={dialogValues?.confirmColor}
                  onClick={handleConfirm}
                  ml={3}
                >
                  {dialogValues?.confirmLabel}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Portal>
    );
  };

  return { ConfirmDialog, confirm };
};
