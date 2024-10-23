"use client";
import { BlackButton } from "@/components/buttons/button";
import CustomText from "@/components/fonts/text";
import { useResetPassword } from "@/utils/auth.api";
import { Box, Divider, Flex, Input, Text, useToast } from "@chakra-ui/react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";

const UpdatePassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authToken = searchParams.get("token");

  const resetPassword = useResetPassword();

  const toast = useToast();

  const [payload, setPayload] = useState({
    password: "",
    confirmPassword: "",
    isPasswordVisible: false,
    isConfirmPasswordVisible: false,
  });

  const handleResetPassword = () => {
    if (payload.password !== payload.confirmPassword) {
      toast({
        title: "Password Mismatch",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const passwordValidation =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordValidation.test(payload.password)) {
      toast({
        description:
          "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    resetPassword
      .mutateAsync({
        token: authToken,
        password: payload.password,
      })
      .then((result) => {
        toast({
          title: "Password Updated Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        router.push("/onboard/login");
      })
      .catch((err) => {
        toast({
          description: err.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        handleResetPassword();
      }}
    >
      <Flex
        minH="100vh"
        align="center"
        justify="center"
        bg="rgba(33, 33, 33, 0.20)"
        border="1px solid #ECECEC"
      >
        <Flex
          flexDir="column"
          gap="24px"
          p="24px"
          borderRadius="12px"
          bg="#fff"
          maxW="644px"
          w="100%"
        >
          <Flex flexDir="column" gap="8px">
            <CustomText text="Set New Password" size="20px" weight="600" />
            <CustomText
              text="Please set your new password"
              size="16px"
              weight="400"
              color="#666"
            />
          </Flex>
          <Divider bg="#ECECEC" />
          <Flex flexDir="column" gap="12px">
            <Flex flexDir="column" gap="6px">
              <Text
                fontSize="14px"
                fontWeight="400"
                textAlign="left"
                color="#666666"
              >
                Set New Password{" "}
              </Text>
              <Box pos="relative">
                <Input
                  placeholder="*********"
                  _placeholder={{
                    color: "#C0C0C0",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                  h="45px"
                  width="100%"
                  borderRadius="5px"
                  pe="50px"
                  border="1.5px solid #CFCFCF"
                  background="#FFFFFF"
                  focusBorderColor="#d9d9d9"
                  _hover={{ borderColor: "#d9d9d9" }}
                  type={payload?.isPasswordVisible ? "text" : "password"}
                  boxShadow="none"
                  value={payload.password}
                  isRequired
                  onChange={(e) =>
                    setPayload({ ...payload, password: e.target.value })
                  }
                />
                <Box
                  pos="absolute"
                  top="0"
                  right="0"
                  mr="10px"
                  mt="15px"
                  zIndex="10"
                  onClick={() =>
                    setPayload({
                      ...payload,
                      isPasswordVisible: !payload.isPasswordVisible,
                    })
                  }
                >
                  {payload.isPasswordVisible ? (
                    <IconEye color="#666" size="16px" cursor="pointer" />
                  ) : (
                    <IconEyeOff color="#666" size="16px" cursor="pointer" />
                  )}
                </Box>
              </Box>
            </Flex>
            <Flex flexDir="column" gap="6px">
              <Text
                fontSize="14px"
                fontWeight="400"
                textAlign="left"
                color="#666666"
              >
                Confirm Password{" "}
              </Text>
              <Box pos="relative">
                <Input
                  placeholder="*********"
                  _placeholder={{
                    color: "#C0C0C0",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                  h="45px"
                  width="100%"
                  borderRadius="5px"
                  pe="50px"
                  border="1.5px solid #CFCFCF"
                  background="#FFFFFF"
                  focusBorderColor="#d9d9d9"
                  _hover={{ borderColor: "#d9d9d9" }}
                  type={payload?.isConfirmPasswordVisible ? "text" : "password"}
                  boxShadow="none"
                  value={payload.confirmPassword}
                  isRequired
                  onChange={(e) =>
                    setPayload({ ...payload, confirmPassword: e.target.value })
                  }
                />
                <Box
                  pos="absolute"
                  top="0"
                  right="0"
                  mr="10px"
                  mt="15px"
                  zIndex="10"
                  onClick={() =>
                    setPayload({
                      ...payload,
                      isConfirmPasswordVisible:
                        !payload.isConfirmPasswordVisible,
                    })
                  }
                >
                  {payload.isConfirmPasswordVisible ? (
                    <IconEye color="#666" size="16px" cursor="pointer" />
                  ) : (
                    <IconEyeOff color="#666" size="16px" cursor="pointer" />
                  )}
                </Box>
              </Box>
            </Flex>
          </Flex>
          <BlackButton
            btnText="Set Password"
            color="#fff"
            type="submit"
            isLoading={resetPassword.isPending}
          />
        </Flex>
      </Flex>
    </form>
  );
};

export default UpdatePassword;
