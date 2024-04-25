import { FormLabel, Input, Flex, Box, Text } from "@chakra-ui/react";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React, { useMemo, useState } from "react";
import { useOrderParts } from "../providers/orderPartsProvider";
import { faInfoCircle, faSearch } from "@fortawesome/pro-light-svg-icons";
import { stockService } from "@/services";
import { PartsModel } from "@/models";

export const StockSearch = ({
  showLabel = true,
  handleAddPart,
}: {
  showLabel?: boolean;
  handleAddPart?: (orderPart: PartsModel) => void;
}) => {
  const { stock } = stockService.handleGetStock();

  const [search, setSearch] = useState<string>("");

  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const { handleAddOrderPart } = useOrderParts();

  const filterSearch = useMemo(() => {
    if (!search || search === "") return stock;
    if (stock) {
      return stock.filter((stock) => {
        return (
          stock.name.toLowerCase().includes(search.toLowerCase()) ||
          stock.reference.toLowerCase().includes(search.toLowerCase()) ||
          stock.sellingPrice.toString().includes(search.toLowerCase())
        );
      });
    }
  }, [search, stock]);

  const handleInputChange = (value: string) => {
    setSearch(value);
  };

  return (
    <Box
      onFocusCapture={() => setIsSearchOpen((prev) => (prev = !prev))}
      width={"full"}
      position={"relative"}
    >
      {showLabel && (
        <FormLabel fontWeight={"semibold"} fontSize={"small"}>
          PEÇAS DE STOCK
        </FormLabel>
      )}

      <Input
        value={search}
        position={"relative"}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder="PROCURAR PEÇA DE STOCK"
      />
      {isSearchOpen ? (
        <FontAwesomeIcon
          onClick={() => {
            setIsSearchOpen(false);
            setSearch("");
          }}
          style={{
            cursor: "pointer",
            position: "absolute",
            right: "1rem",
            bottom: "0.725rem",
            zIndex: 100,
          }}
          icon={faXmark}
        />
      ) : (
        <FontAwesomeIcon
          style={{
            position: "absolute",
            right: "1rem",
            bottom: "0.725rem",
            zIndex: 100,
          }}
          icon={faSearch}
        />
      )}

      {search !== undefined && isSearchOpen && (
        <Flex
          direction={"column"}
          position={"absolute"}
          borderRadius={"base"}
          backgroundColor={"gray.50"}
          zIndex={100}
          width={"full"}
          maxHeight={450}
          overflow={"auto"}
          padding={4}
          gap={2}
        >
          <motion.div
            key={search}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.7 } }}
            exit={{ opacity: 0 }}
          >
            <React.Fragment>
              {filterSearch && filterSearch.length > 0 ? (
                <React.Fragment>
                  {filterSearch.map((stock) => {
                    return (
                      <Flex
                        onClick={() => {
                          handleAddPart
                            ? handleAddPart({
                                name: stock.name,
                                reference: stock.reference,
                                price: stock.sellingPrice,
                              })
                            : handleAddOrderPart({
                                name: stock.name,
                                reference: stock.reference,
                                price: stock.sellingPrice,
                              });
                          setIsSearchOpen(false);
                        }}
                        padding={2}
                        key={stock.reference}
                        justify={"space-between"}
                        gap={6}
                        borderRadius={"base"}
                        _hover={{
                          cursor: "pointer",
                          backgroundColor: "gray.200",
                        }}
                      >
                        <Flex width={"full"} gap={4}>
                          <Text fontWeight={"semibold"} fontSize={"small"}>
                            {stock.name}
                          </Text>
                          <Text
                            textColor={"gray.500"}
                            fontWeight={"semibold"}
                            fontSize={"small"}
                          >
                            {stock.reference}
                          </Text>
                        </Flex>
                        <Flex justify={"end"} width={"full"}>
                          <Text
                            textColor={"green.400"}
                            fontWeight={"semibold"}
                            fontSize={"small"}
                          >
                            {stock.sellingPrice + "€"}
                          </Text>
                        </Flex>
                      </Flex>
                    );
                  })}
                </React.Fragment>
              ) : (
                <Flex
                  padding={2}
                  gap={6}
                  borderRadius={"base"}
                  justify={"space-between"}
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "gray.200",
                  }}
                >
                  <Text fontWeight={"semibold"} fontSize={"small"}>
                    NÃO EXISTEM PEÇAS DE STOCK
                  </Text>
                  <FontAwesomeIcon icon={faInfoCircle} />
                </Flex>
              )}
            </React.Fragment>
          </motion.div>
        </Flex>
      )}
    </Box>
  );
};
