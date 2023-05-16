import React from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { User } from "firebase/auth";

type SerchInputProps = {
  user?: User | null;
};

const SerchInput: React.FC<SerchInputProps> = ({ user }) => {
  return (
    <Flex flexGrow={1} mr={2} maxWidth={user ? "auto" : "600px"} align="center">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.400" mb={1} />}
        />
        <Input
          type="tel"
          placeholder="Search..."
          fontSize="10pt"
          _placeholder={{ color: "grey.500" }}
          _hover={{
            bg: "white",
            border: "1px solid ",
            borderColor: "blue.500",
          }}
          _focus={{
            outline: "none",
            border: "1px solid",
            borderColor: "blue.500",
          }}
          height="34px"
          bg="gray.50"
        />
      </InputGroup>
    </Flex>
  );
};
export default SerchInput;
