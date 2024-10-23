import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import readyBg from "../../../public/icons/startBg.svg";
import Image from "next/image";
import facebookLogo from "../../../public/icons/blueFacebookLogo.svg";
import googleLogo from "../../../public/icons/googleLogo.svg";
import { clashDisplay, clashDisplay400, epilogue400 } from "../fonts/fonts";
import { useEmailLogin } from "@/utils/auth.api";
import { useRouter } from "next/navigation";

const Join = () => {
  const emailLogin = useEmailLogin();
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState("");
  return (
    <Box
      color={"#FFF"}
      display={"flex"}
      flexDirection={{ base: "column", lg: "row" }}
      pl={{ base: "22px", md: "120px" }}
      //   justifyContent={"space-between"}
      gap={{ base: "56px", md: "40px", xl: "190px" }}
      alignItems={"center"}
      pr={{ base: "22px", md: "70px" }}
      pt={{ base: "21px", md: "64px" }}
      pb={{ md: "60px" }}
      maxWidth={"1540px"}
      mx={"auto"}
    >
      <Stack
        align={{ base: "center", md: "flex-start" }}
        gap={{ base: "12px", md: "24px" }}
        maxW={"473px"}
      >
        <Heading
          fontSize={{ base: "24px", md: "50px" }}
          fontWeight={"600"}
          lineHeight={{ base: "normal", md: "60px" }}
          letterSpacing={"1px"}
        >
          <span className={clashDisplay?.className}>Ready to Start?</span>
        </Heading>
        <Text
          fontFamily={"Epilogue"}
          lineHeight={"26px"}
          textAlign={{ base: "center", md: "left" }}
        >
          <span className={epilogue400?.className}>
            Join today & be part of a community that&apos setting the pace in
            the tech world. Where every task is a new opportunity, and your
            potential is just waiting to be unleashed.
          </span>
        </Text>
      </Stack>

      <Box
        display={"flex"}
        flexDirection={{ base: "column", lg: "row" }}
        w={"100%"}
      >
        <Stack
          maxW={{ base: "", lg: "351px" }}
          p={{
            base: "38.49px 23.336px 39.829px 22.039px",
            md: "48.975px 29.314px 50.657px 26.686px",
          }}
          align={"center"}
          justifyContent={"center"}
          gap={"32px"}
          borderRadius={{ base: "19.105px", md: "24px" }}
          border={"1px solid #ECECEC"}
          bg={"#FFF"}
          zIndex={"2"}
          boxShadow={"0px 0px 36.031px 0px rgba(0,0,0,0.05)"}
        >
          <Stack align={"flex-start"} gap={"12px"} w={"100%"}>
            {/* <Button
              variant={"unstyled"}
              display={"flex"}
              p={{
                base: "13.416px 49.012px 12.691px 49.81px",
                md: "16.853px 61.346px 15.943px 62.348px",
              }}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={{ base: "29px", md: "32px" }}
              border={"1px solid #212121"}
              bg={"#FFF"}
              w={"100%"}
            >
              <Center gap={{ base: "9.553px", md: "13.102px" }}>
                <Image src={facebookLogo} alt="facebook logo" />
                <Text
                  color={"#212121"}
                  fontFamily={"Epilogue"}
                  fontSize={{ base: "14px", md: "18px" }}
                  fontWeight={"400"}
                >
                  <span className={epilogue400?.className}>
                    Continue with Facebook
                  </span>
                </Text>
              </Center>
            </Button> */}
            <Button
              w={"100%"}
              variant={"unstyled"}
              display={"flex"}
              h="48px"
              px={{
                base: "48px",
                md: "56px",
              }}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={{ base: "29px", md: "32px" }}
              border={"1px solid #212121"}
              bg={"#FFF"}
            >
              <Center gap={{ base: "9.553px", md: "13.102px" }}>
                <Image src={googleLogo} alt="google logo" />
                <Text
                  color={"#212121"}
                  fontFamily={"Epilogue"}
                  fontSize={{ base: "14px", md: "18px" }}
                  fontWeight={"400"}
                >
                  <span className={epilogue400?.className}>
                    Continue with Google
                  </span>
                </Text>
              </Center>
            </Button>
          </Stack>
          <Flex gap={"18px"} align={"center"} w={"100%"}>
            <Divider />
            <Text
              color={"#666"}
              fontSize={{ base: "15.921px", md: "20px" }}
              fontWeight={"400"}
            >
              OR
            </Text>
            <Divider />
          </Flex>
          <Stack
            justify={"center"}
            align={"flex-start"}
            gap={{ base: "9.55px", md: "12px" }}
            w={"100%"}
          >
            <Text
              color={"#666"}
              fontFamily={"Epilogue"}
              fontSize={{ base: "12px", md: "14px" }}
              lineHeight={{ base: "19px", md: "24px" }}
            >
              <span className={epilogue400?.className}>Email Address</span>
            </Text>
            <Input
              variant={"unstyled"}
              display={"flex"}
              h={{ base: "36px", md: "46px" }}
              p={{
                base: "6.5px   8px 6.5px 10.4px",
                md: "8.189px 8px 8.189px 13.102px",
              }}
              alignItems={"center"}
              gap={"8.189px"}
              borderRadius={"6.551px"}
              border={"1.228px solid #CFCFCF"}
              placeholder="Enter your email address"
              fontSize={"16px"}
              color={"#212121"}
              _placeholder={{ color: "#666" }}
              value={email}
              isRequired
              onChange={(e) => setEmail(e.target.value)}
            />
          </Stack>
          <Button
            disabled={emailLogin?.isPending}
            isLoading={emailLogin?.isPending}
            variant={"unstyled"}
            display={"flex"}
            h="48px"
            p={{ base: "14px 0px 13px 0px", md: "17.614px 0px 16.794px 0px" }}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={{ base: "26px", md: "32.755px" }}
            bg={"#212121"}
            color={"#FFF"}
            fontSize={{ base: "14px", md: "18.015px" }}
            fontWeight={"500"}
            w={"100%"}
            onClick={(e) => {
              e.preventDefault();
              emailLogin
                .mutateAsync({ email })
                .then((res) => {
                  if (res?.status) {
                    toast({
                      title: "Email Sent",
                      description: `OTP code sent to your ${email} `,
                      status: "success",
                      duration: 2000,
                      isClosable: true,
                    });
                    router.push(`/onboard/verification?email=${email}`);
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            }}
          >
            Sign Up
          </Button>
        </Stack>

        <Box
          ml={{ lg: "-240px" }}
          mb={{ lg: "-15px" }}
          alignSelf={"end"}
          opacity={"0.5"}
          mr={{ base: "-22px", lg: "none" }}
          mt={{ base: "-200px", sm: "-260px", lg: "none" }}
        >
          <Image src={readyBg} alt="bg img" />
        </Box>
      </Box>
    </Box>
  );
};

export default Join;
