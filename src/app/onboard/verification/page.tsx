"use client";
import React, { Suspense, useEffect, useState } from "react";
import { BlackButton } from "@/components/buttons/button";
import CustomText from "@/components/fonts/text";
import {
  Box,
  Center,
  Flex,
  Image,
  PinInput,
  PinInputField,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Plus_Jakarta_Sans } from "next/font/google";
import AuthLayout from "@/app/layouts/AuthLayout";
import { useRouter } from "next/navigation";
import { useEmailLogin, useVerifyEmail } from "@/utils/auth.api";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

const Verification = () => {
  const verifyEmail = useVerifyEmail();
  const emailLogin = useEmailLogin();
  const router = useRouter();
  const toast = useToast();
  const [pin, setPin] = useState("");
  const [timer, setTimer] = useState(120);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const displayTime = `${minutes?.toString().padStart(2, "0")}:${seconds
    ?.toString()
    .padStart(2, "0")}`;

  useEffect(() => {
    const countdown = setInterval(() => {
      if (timer > 0) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(countdown);
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [timer]);

  const email = (() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      return searchParams.get("email");
    }
  })();

  useEffect(() => {
    const waitForEmail = setInterval(() => {
      if (!email) {
        router.push("/onboard/signup");
      }
    }, 2000);
    return () => clearInterval(waitForEmail);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  return (
    <AuthLayout>
      <Flex minH="100vh" align="stretch">
        <Box
          className={"login-signup-page"}
          p={{ base: "32px", md: "32px", lg: "64px" }}
          flexGrow={1}
          bgImage="/images/signup-bg-left.png"
          bgPosition="bottom"
          bgSize="contain"
          bgRepeat="no-repeat"
        >
          <Flex gap="8px" alignItems="center" cursor="pointer">
            <Image
              w="179px"
              h="48px"
              objectFit="cover"
              src={`/logo/EZ Tasker Logo-02.svg`}
              alt="logo"
            />
          </Flex>
          <Box maxW={{ md: "500px" }}>
            <CustomText
              text="Verify Your Email"
              size={{ base: "26px", md: "44px" }}
              weight={700}
              color="#212121"
              h="normal"
              align="center"
              mt={{ base: "48px", md: "50px" }}
            />
            <CustomText
              mt="8px"
              color="#666666"
              h="20px"
              align="center"
              text={`We just sent a 6 digits verification code to ${email}. Verify by entering the code here.`}
            />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (pin?.length < 6) {
                  toast({
                    title: "Error",
                    description: "Please enter 6 digit code!",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                  });
                } else {
                  verifyEmail
                    .mutateAsync({ email: email, otp: pin })
                    .then((res) => {
                      console.log("res----res", res.status);
                      if (res?.status) {
                        toast({
                          title: "Email Verified",
                          description:
                            "You have successfully verified your email",
                          status: "success",
                          duration: 2000,
                          isClosable: true,
                        });
                        // router.push("/dashboard");
                      }
                    })
                    .catch((err) => {
                      toast({
                        title: "Error",
                        description: err?.message || "Invalid code",
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                      });
                    });
                }
              }}
            >
              <Flex mb="40px" mt="40px" gap="12px" h="80px">
                <PinInput
                  size="80px"
                  focusBorderColor="#212121"
                  placeholder="0"
                  onChange={(e) => {
                    setPin(e);
                  }}
                >
                  {[...Array(6)].map((_, index) => (
                    <PinInputField
                      key={index}
                      borderRadius="8px"
                      fontSize="48px"
                      color="#212121"
                      border={
                        pin?.length === 6
                          ? "2px solid #212121"
                          : "1px solid #CFCFCF"
                      }
                      fontWeight={500}
                      className={jakarta?.className}
                      _placeholder={{ color: "#CFCFCF" }}
                    />
                  ))}
                </PinInput>
              </Flex>
              <Center mb="40px">
                <CustomText text={displayTime} weight={500} />
              </Center>
              <BlackButton
                bg="#6F49FE"
                btnText="Verify Email"
                disabled={pin?.length < 6 || verifyEmail?.isPending}
                isLoading={verifyEmail?.isPending}
              />
            </form>
            {displayTime === "00:00" && (
              <Center gap="4px" mt="40px">
                <CustomText
                  text="Didn’t get a code?"
                  size="14px"
                  color="#666666"
                />
                {emailLogin?.isPending ? (
                  <Spinner size="sm" color="#212121" />
                ) : (
                  <CustomText
                    text="Click to resend."
                    weight={600}
                    size="14px"
                    borderBottom="1px solid #212121"
                    h="12px"
                    cursor="pointer"
                    onClick={() => {
                      emailLogin
                        ?.mutateAsync({ email })
                        .then((res) => {
                          if (res.status) {
                            setTimer(120);
                            toast({
                              title: "Email Sent",
                              description: `OTP code sent to your ${email}`,
                              status: "success",
                              duration: 2000,
                              isClosable: true,
                            });
                          }
                        })
                        .catch((err) => {
                          toast({
                            title: "Error",
                            description: err?.message || "Invalid Email",
                            status: "error",
                            duration: 2000,
                            isClosable: true,
                          });
                        });
                    }}
                  />
                )}
              </Center>
            )}
          </Box>
        </Box>
        <Center
          bgImage="/images/email-otp-bg-right.svg"
          w="45%"
          bgSize="cover"
          bgPosition="bottom right"
          display={{ base: "none", md: "flex" }}
        >
          <Stack w="431px" px={{ md: "24px", lg: "0" }}>
            <CustomText
              text="“Creativity is intelligence having fun”"
              color="#ffff"
              weight="700"
              size={{ md: "48px", xl: "64px" }}
              h="96px"
            />
            <CustomText text="- Albert Einstein" weight="700" color="#ffff" />
          </Stack>
        </Center>
      </Flex>
    </AuthLayout>
  );
};

export default Verification;
