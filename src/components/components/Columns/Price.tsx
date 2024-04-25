import React from "react";
import { Flex, Tag } from "@chakra-ui/react";
import { faCircleEuro } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  price: string;
};

export const Price = ({ price }: Props) => {
  return (
    <Flex justify={"center"} align={"center"} textAlign={"center"}>
      <Tag
        justifyItems={"center"}
        fontSize={"small"}
        fontWeight={"semibold"}
        borderRadius={"full"}
        backgroundColor={"transparent"}
        width={"full"}
        textAlign={"center"}
      >
        <Flex width={"full"} justify={"center"} align={"center"}>
          {price}
          <FontAwesomeIcon
            size="lg"
            style={{
              color: "#68D391",
              cursor: "pointer",
              marginLeft: "0.275rem",
            }}
            icon={faCircleEuro}
          />
        </Flex>
      </Tag>
    </Flex>
  );
};
