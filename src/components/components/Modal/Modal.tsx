import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ThemingProps,
} from "@chakra-ui/react";
import React from "react";
import { ReactNode } from "react";

type Props = {
  Header?: ReactNode;
  Body?: ReactNode;
  Footer?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
} & ThemingProps<"Modal">;

const Modal = ({
  Header,
  Body,
  Footer,
  isOpen,
  onClose,
  children,
  ...props
}: Props) => {
  return (
    <ChakraModal {...props} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        {children ? (
          <React.Fragment>{children}</React.Fragment>
        ) : (
          <React.Fragment>
            <ModalHeader>{Header}</ModalHeader>
            <ModalBody>{Body}</ModalBody>
            {Footer && <ModalFooter marginTop={2}>{Footer}</ModalFooter>}
          </React.Fragment>
        )}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
