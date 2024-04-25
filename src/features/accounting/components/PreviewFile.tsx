import Modal from "@/components/components/Modal/Modal";
import { ModalHeader, ModalBody, Flex } from "@chakra-ui/react";
import React from "react";
import { Text } from "@chakra-ui/react";
import Image from "next/image";

type Props = {
  fileUrl: string;
  isOpen: boolean;
  onClose: () => void;
  heading?: string;
  type?: string;
};

export const PreviewFile = ({
  type,
  fileUrl,
  isOpen,
  onClose,
  heading = "PRE-VISUALIZAÇÃO DA FATURA",
}: Props) => {
  return (
    <Modal size={"full"} isOpen={isOpen} onClose={onClose}>
      <ModalHeader>
        <Text fontSize={"lg"} textColor={"gray.600"} fontWeight={"semibold"}>
          {heading}
        </Text>
      </ModalHeader>
      <ModalBody position={"relative"} overflow={"visible"}>
        <Flex width="full" height="full" justifyContent={"center"}>
          {type && type === "application/pdf" ? (
            <embed
              src={fileUrl}
              type="application/pdf"
              style={{ height: "85vh", width: "100%" }}
            />
          ) : (
            <Image
              src={fileUrl}
              style={{
                padding: "1rem",
                width: "auto",
                height: "auto",
              }}
              width={1200}
              height={1200}
              alt={fileUrl}
            />
          )}
        </Flex>
      </ModalBody>
    </Modal>
  );
};
