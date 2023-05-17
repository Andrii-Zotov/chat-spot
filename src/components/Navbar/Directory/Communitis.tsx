import CreateCommunityModal from "@/components/Modal/CreateCommunitiModal/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { GrAdd } from "react-icons/gr";

type CommunitisProps = {};

const Communitis: React.FC<CommunitisProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {" "}
      <CreateCommunityModal
        open={open}
        handelClose={() => setOpen(false)}
      />{" "}
      <MenuItem
        width="100%"
        fontSize="10pt"
        _hover={{ bg: "gray.100" }}
        onClick={() => {
          setOpen(true);
        }}
      >
        <Flex align="center">
          <Icon as={GrAdd} fontSize={20} mr={2} />
          Create Community
        </Flex>
      </MenuItem>
    </>
  );
};
export default Communitis;
