import { auth, firestore } from "@/firebase/clientApp";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Text,
  Input,
  Stack,
  Checkbox,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { error, log } from "console";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { relative } from "path";
import React, { ChangeEvent, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

type CreateCommunityModalProps = {
  open: boolean;
  handelClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handelClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState<string>("");
  const [chartsRemaining, setChartsRemaining] = useState<number>(21);
  const [charactersError, setCharactersError] = useState<boolean>(false);
  const [communityType, setCommunityType] = useState<string>("public");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handelCrateCommunity = async () => {
    //Validate the community
    if (error) setError("");
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(communityName) || communityName.length < 3) {
      setError(
        "Community names must be between 3-21 charecters, and onlyy containe letters number or underscores "
      );
      return;
    }
    setLoading(true);

    try {
      //Create community document in firestore
      //Check that name is not taken
      //If valid name create community
      const communityDocRef = doc(firestore, "communitys", communityName);
      const communityDoc = await getDoc(communityDocRef);
      //Check if community exists
      if (communityDoc.exists()) {
        throw new Error(`Sorry ${communityName} is alerady taken.Try another.`);
      }

      //Create community
      await setDoc(communityDocRef, {
        creatorId: user?.uid,
        createdAt: serverTimestamp(),
        numberOfMembers: 1,
        privacyType: communityType,
      });
    } catch (error: any) {
      console.log("handelCreateCommunityError", error);
      setError(error.message);
    }

    setLoading(false);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //recalculate how many charts left
    setCharactersError(false);
    if (event.target.value.length > 21) {
      setCharactersError(true);
      return;
    }
    setCommunityName(event.target.value);
    setChartsRemaining(21 - event.target.value.length);
    console.log(chartsRemaining);
  };
  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };
  return (
    <>
      <Modal isOpen={open} onClose={handelClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display="flex"
            flexDirection="column"
            fontSize={15}
            padding={3}
          >
            Create a community
          </ModalHeader>
          <Box pl={3} pr={3}>
            <ModalCloseButton />
            <ModalBody display="felx" flexDirection="column" padding="10px 0px">
              <Text fontWeight={600} fontSize={15}>
                Name
              </Text>
              <Text fontSize={11} color="gray.500">
                Community names including capitalization cannot be changed
              </Text>
              <Text
                position="relative"
                top="28px"
                left="10px"
                width="20px"
                color={"gray.400"}
              >
                c/
              </Text>
              <Input
                position="relative"
                value={communityName}
                size="sm"
                pl="22px"
                onChange={handleChange}
              />
              {charactersError ? (
                <Text fontSize={9} color="red">
                  Too much Characters
                </Text>
              ) : null}
              <Text
                fontSize={9}
                color={chartsRemaining === 0 ? "red" : "gray.500"}
              >
                {chartsRemaining} Characters remaining
              </Text>
              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
              <Box mt={4} mb={4}>
                <Text fontWeight={600} fontSize={15}>
                  Community Type
                </Text>
                {/* checkbox */}
                <Stack spacing={2}>
                  <Checkbox
                    onChange={onCommunityTypeChange}
                    name="public"
                    isChecked={communityType === "public" ? true : false}
                  >
                    <Flex align="center">
                      <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Public
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view post,comment to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    onChange={onCommunityTypeChange}
                    name="restricted"
                    isChecked={communityType === "restricted" ? true : false}
                  >
                    <Flex align="center">
                      <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Restricted
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Anyone can view this community,but only approved users
                        can post to this community
                      </Text>
                    </Flex>
                  </Checkbox>
                  <Checkbox
                    onChange={onCommunityTypeChange}
                    name="private"
                    isChecked={communityType === "private" ? true : false}
                  >
                    <Flex align="center">
                      <Icon as={HiLockClosed} color="gray.500" mr={2} />
                      <Text fontSize="10pt" mr={1}>
                        Private
                      </Text>
                      <Text fontSize="8pt" color="gray.500" pt={1}>
                        Only approved users can view and submit thsi community
                      </Text>
                    </Flex>
                  </Checkbox>
                </Stack>
              </Box>
            </ModalBody>
          </Box>

          <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
            <Button
              variant="outline"
              height="30px"
              colorScheme="blue"
              mr={3}
              onClick={handelClose}
            >
              Close
            </Button>
            <Button
              height="30px"
              onClick={handelCrateCommunity}
              isLoading={loading}
            >
              Create Community
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCommunityModal;
