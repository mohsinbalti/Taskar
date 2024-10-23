import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { clashDisplay600, hNeue500, hNeue400 } from "../fonts/fonts";
import CustomText from "../fonts/text";
import ProfileCompletion from "./profileCompletion";
import Referral from "./referral";
import HowItWorks from "./howItWorks";
import FollowUs from "./followUs";

function ComingSoon() {
  return (
    <Box width={"100%"} border={"1px solid red"}>
      <Flex
        bg="#fff"
        borderRadius="16px"
        p={{ base: "24px 24px", md: "80px 42px" }}
        flexDir="column"
        alignItems="center"
        gap={{ base: "16px", md: "32px" }}
        backgroundImage="url(/images/coming-soon-bg.svg)"
      >
        <Button
          maxW={{ base: "182px", md: "309px" }}
          w="100%"
          p={{ base: "7px 31px", md: "12px 54px" }}
          bg="#BBFC4A"
          color="#212121"
          borderRadius="999px"
          _hover={{
            bg: "#BBFC4A",
          }}
          // fontSize="20px"
          size={{ base: "11px", md: "20px" }}
          fontWeight="700"
          textTransform="uppercase"
          letterSpacing={{ base: "1.7px", md: "5.2px" }}
          lineHeight="normal"
          cursor={"default"}
        >
          <span className={hNeue500.className}>Coming Soon</span>
        </Button>
        <CustomText
          text="Welcome to eZTasker"
          color="#6F49FE"
          family={clashDisplay600.className}
          size={{ base: "26px", sm: "25px", md: "48px" }}
          weight="500"
          align="center"
          maxWidth="100%"
          lineHeight="41px"
        />
        <Text
          fontSize={{ base: "14px", md: "16px" }}
          color="#666"
          fontWeight="400"
          lineHeight={"20px"}
          width={{ base: "auto" }}
          textAlign="center"
        >
          We’re thrilled to have you here! Our platform is launching soon, and
          we can’t wait for you to experience all the amazing features we have
          in store.{" "}
          <span
            style={{
              color: "#212121",
            }}
          >
            While we finalize the last details, here are a few steps you can
            take to get ready.
          </span>
        </Text>
      </Flex>
      <Flex gap="26px" mt="24px" wrap="wrap" justify="center">
        <ProfileCompletion />
        <Referral />
        <HowItWorks />
        <FollowUs />
      </Flex>
    </Box>
  );
}

export default ComingSoon;
