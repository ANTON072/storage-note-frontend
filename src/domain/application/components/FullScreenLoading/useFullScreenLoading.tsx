/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useMemo } from "react";

import {
  Portal,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  CircularProgress,
  Box,
} from "@chakra-ui/react";

export const useFullScreenLoading = () => {
  const [isShowLoading, setLoading] = useState(true);

  const FullScreenLoading = useMemo(() => {
    const Component: React.FC = () => {
      return (
        <Portal>
          <Modal
            isOpen={isShowLoading}
            onClose={() => {
              setLoading(false);
            }}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <CircularProgress isIndeterminate size={`100`} />
            </ModalContent>
          </Modal>
        </Portal>
      );
      // return (
      //   <>
      //     {createPortal(
      //       <div
      //         className="p-modal1"
      //         style={{
      //           transition: "1s",
      //           opacity: isShowLoading ? 1 : 0,
      //           pointerEvents: isShowLoading ? "auto" : "none",
      //           zIndex: 9999,
      //         }}
      //       >
      //         <span className="p-modal1__loading1"></span>
      //         <div className="p-modal1__layer1"></div>
      //       </div>,
      //       document.querySelector("#loading")!
      //     )}
      //   </>
      // );
    };

    return Component;
  }, [isShowLoading]);

  return { isShowLoading, setLoading, FullScreenLoading };
};
