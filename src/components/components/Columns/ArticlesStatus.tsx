import React from "react";
import { Flex, Tag } from "@chakra-ui/react";

type Props = {
  status: boolean;
};

export const ArticleStatus = ({ status }: Props) => {
  const getBackgroundColor = () => {
    if (status) return "green.100";
    return "blue.100";
  };

  const getTextColor = () => {
    if (status) return "green.800";
    return "blue.800";
  };

  const getTextTranslated = () => {
    if (status) return "REMOVIDA";
    return "NA ENCOMENDA";
  };

  return (
    <Flex justify={"center"} align={"center"} textAlign={"center"}>
      <Tag
        backgroundColor={getBackgroundColor()}
        fontSize={"2xs"}
        fontWeight={"bold"}
        color={getTextColor()}
        borderRadius={"full"}
      >
        {getTextTranslated()}
      </Tag>
    </Flex>
  );
};
