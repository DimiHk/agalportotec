import { useState, useEffect } from "react";
import { Box, Input, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faSearch,
  faTimesCircle,
} from "@fortawesome/pro-light-svg-icons";

type Props = {
  placeholder: string;
  options: any[];
  filterProperty: string;
  onSelect: (selectedValue: any) => void;
  children?: React.ReactNode;
  defaultValue?: string;
  onChange?: (value: string) => void;
  showNotFound?: boolean;
};

export const Search = ({
  placeholder,
  options,
  filterProperty,
  onSelect,
  children,
  defaultValue,
  onChange,
  showNotFound = true,
}: Props) => {
  const [search, setSearch] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    const handleDocumentClick = () => {
      setIsSearchOpen(false);
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    // Update filteredOptions when options prop changes
    setFilteredOptions(options);
  }, [options]);

  const handleInputChange = (value: string) => {
    setSearch(value);
    const filtered = options.filter((option: any) =>
      option[filterProperty].toLowerCase().includes(value.toLowerCase())
    );

    if (value === "") {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(filtered);
    }
    onChange && onChange(value);
  };

  const handleSearchToggle = () => {
    /* setSearch(""); */
    setIsSearchOpen((prevState) => !prevState);
    setFilteredOptions(options);
  };

  const handleOptionClick = (selectedValue: any) => {
    handleSearchToggle();
    setSearch(selectedValue[filterProperty]);
    onSelect(selectedValue);
  };

  return (
    <Box position="relative">
      <Input
        value={defaultValue ? defaultValue : search}
        position="relative"
        onClick={(e) => {
          e.stopPropagation();
          setIsSearchOpen(true);
        }}
        autoComplete="off"
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
      />

      <FontAwesomeIcon
        style={{
          position: "absolute",
          right: "1rem",
          bottom: "0.725rem",
          zIndex: 100,
          cursor: "pointer",
        }}
        icon={isSearchOpen ? faTimesCircle : faSearch}
        onClick={handleSearchToggle}
      />

      {search !== undefined && isSearchOpen && (
        <Flex
          direction="column"
          position="absolute"
          borderRadius="base"
          backgroundColor="gray.50"
          zIndex={100}
          width="full"
          maxHeight={450}
          overflow="auto"
          padding={4}
          gap={2}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            {children}
            {filteredOptions && filteredOptions.length > 0 ? (
              filteredOptions.map((option: any, index: number) => (
                <Flex
                  onClick={() => handleOptionClick(option)}
                  padding={2}
                  key={index}
                  justify="space-between"
                  gap={6}
                  borderRadius="base"
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "gray.200",
                  }}
                >
                  <Flex width="full" gap={4}>
                    <Text fontWeight="semibold" fontSize="small">
                      {option[filterProperty]}
                    </Text>
                  </Flex>
                </Flex>
              ))
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
                  NÃO EXISTEM RESULTADOS!
                </Text>
                <FontAwesomeIcon icon={faInfoCircle} />
              </Flex>
            )}
          </motion.div>
        </Flex>
      )}
    </Box>
  );
};
