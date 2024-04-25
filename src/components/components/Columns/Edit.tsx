import { Flex, Tooltip, Box, Text } from "@chakra-ui/react";
import { faEye, faFilePen, faXmark } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
  handleRedirectPage?: () => void;
  isViewDetails?: boolean;
  handlePreviewDetails?: () => void;
  isRemove?: boolean;
  handleRemove?: () => void;
  isEdit?: boolean;
};

export const Edit = ({
  isEdit = true,
  handleRedirectPage,
  isViewDetails = false,
  handlePreviewDetails,
  isRemove = false,
  handleRemove,
}: Props) => {
  return (
    <Flex
      width={"full"}
      height={"full"}
      align={"center"}
      justify={"center"}
      gap={2}
    >
      {isViewDetails && (
        <Tooltip
          label={
            <Text fontSize={"xs"} fontWeight={"semibold"}>
              PRE-VISUALIZAR FATURA
            </Text>
          }
          placement="auto"
        >
          <Box
            cursor={"pointer"}
            color={"gray.900"}
            _hover={{ color: "cyan.600" }}
            onClick={handlePreviewDetails}
          >
            <FontAwesomeIcon icon={faEye} />
          </Box>
        </Tooltip>
      )}
      {isEdit && (
        <Tooltip
          label={
            <Text fontSize={"xs"} fontWeight={"semibold"}>
              EDITAR
            </Text>
          }
          placement="auto"
        >
          <Box
            cursor={"pointer"}
            color={"gray.900"}
            _hover={{ color: "blue.600" }}
            onClick={handleRedirectPage}
          >
            <FontAwesomeIcon icon={faFilePen} />
          </Box>
        </Tooltip>
      )}
      {isRemove && (
        <Tooltip
          label={
            <Text fontSize={"xs"} fontWeight={"semibold"}>
              REMOVER
            </Text>
          }
          placement="auto"
        >
          <Box
            cursor={"pointer"}
            color={"gray.900"}
            _hover={{ color: "red.600" }}
            onClick={handleRemove}
          >
            <FontAwesomeIcon icon={faXmark} />
          </Box>
        </Tooltip>
      )}
    </Flex>
  );
};
