import { Avatar, Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { hNeue500, hNeue600 } from "../fonts/fonts";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useGetLoggedInUser } from "@/utils/auth.api";
import { BlackButton } from "../buttons/button";
import { useRouter } from "next/navigation";
import CustomText from "../fonts/text";

function ProfileCompletion() {
  const router = useRouter();

  const { data: user } = useGetLoggedInUser();
  const [isLessThan350] = useMediaQuery("(max-width: 354px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });
  return (
    <Box
      bg="#FFF"
      border="1px solid #ECECEC"
      borderRadius="18px"
      overflow="hidden"
      pos="relative"
      maxW="476px"
      h="476px"
      w="100%"
      p={{ base: "32px 16px", md: "32px" }}
      zIndex="1"
    >
      <Box
        width="799px"
        height="799px"
        bg="#F6F6F6"
        borderBottomRadius="799px"
        pos="absolute"
        top="0"
        left="0"
        mt="-443px"
        ml={{ base: "-250px", sm: "-161px" }}
        zIndex={-1}
      ></Box>
      <Flex zIndex={1000} flexDir="column" gap="27px" align="center">
        <CustomText
          text={"Profile Completion"}
          color={" #212121"}
          size={"32px"}
          weight={700}
          height={"38.4px"}
        />

        {/* <Text
          fontSize="28px"
          fontWeight="600"
          color="#212121"
          textAlign="center"
        >
          <span className={hNeue600.className}>Profile Completion</span>
        </Text> */}
        <Box boxSize="120px" pos="relative" mt="25px">
          <CircularProgressbar
            value={user?.profileCompletionPercentage || 0}
            counterClockwise
            className="progress-circular"
          />
          <Avatar
            src={user?.picture}
            boxSize="90px"
            name={user?.fullname || user?.email}
            pos="absolute"
            top="0"
            mt="28px"
            ml="15px"
          />
        </Box>
        <Text fontSize="18px" fontWeight="500" color="#212121">
          <span className={hNeue500.className}>
            {user?.profileCompletionPercentage || 0}% Completed
          </span>
        </Text>
      </Flex>
      <Flex justify="center" mt={isLessThan350 ? "40px" : "90px"}>
        <BlackButton
          btnText={
            user?.profileCompletionPercentage === 100
              ? "Go to Profile"
              : "Complete Your Profile"
          }
          h="50px"
          w="100%"
          maxW="213px"
          borderRadius="97px"
          fontSize="16px"
          onClick={() => {
            if (user?.profileCompletionPercentage < 100) {
              router.push("/profile?edit=true");
            } else {
              router.push("/profile");
            }
          }}
        />
      </Flex>
    </Box>
  );
}

export default ProfileCompletion;
