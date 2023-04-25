import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import SearchInput from "./SerchInput";
import RightContent from "./RightContent/RightContent";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/clientApp";

const Navbar: React.FC = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Flex bg="white" height="44px" padding={"6px 12px"}>
      <Flex align="center">
        <Image src="/images/logo.svg" height="40px" />
        <Image />
      </Flex>
      <SearchInput />
      <RightContent user={user} />
      {/* <Directory />
       */}
    </Flex>
  );
};
export default Navbar;
