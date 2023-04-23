import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SerchInput";
import RightContent from "./RightContent/RightContent";

const Navbar: React.FC = () => {
  return (
    <Flex bg="white" height="44px" padding={"6px 12px"}>
      <Flex align="center">
        <Image src="/images/logo.svg" height="40px" />
        <Image />
      </Flex>
      <SearchInput />
      <RightContent />
      {/* <Directory />
       */}
    </Flex>
  );
};
export default Navbar;
