import React from "react";
import { Flex, Button, Image } from "@chakra-ui/react";

const OAuthButtons: React.FC = () => {
  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button mb={2} variant="oauth">
        <Image height="30px" src="/images/googlelogo.png" mr={4} />
        Continue with Google
      </Button>
      <Button variant="oauth" mb={2}>
        Smth Else
      </Button>
    </Flex>
  );
};
export default OAuthButtons;
