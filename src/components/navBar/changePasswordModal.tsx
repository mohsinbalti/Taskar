import {
  Box,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CustomText from "../fonts/text";
import { IconEye, IconEyeOff, IconX } from "@tabler/icons-react";
import { useChangePassword } from "@/utils/auth.api";
import { BlackButton } from "../buttons/button";

function ChangePasswordModal({ isOpen, onOpen, onClose }: any) {
  const changePassword = useChangePassword();

  const toast = useToast();

  const [payload, setPayload] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
    isOldPasswordVisible: false,
    isPasswordVisible: false,
    isConfirmPasswordVisible: false,
  });

  const handleChangePassword = () => {
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
    changePassword
      .mutateAsync({
        oldPassword: payload.oldPassword,
        password: payload.password,
        confirmPassword: payload.confirmPassword,
      })
      .then((result) => {
        toast({
          title: "Password Updated Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
        setPayload({
          oldPassword: "",
          password: "",
          confirmPassword: "",
          isOldPasswordVisible: false,
          isPasswordVisible: false,
          isConfirmPasswordVisible: false,
        });
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
    <Modal isOpen={isOpen} onClose={() => {}} isCentered>
      <ModalOverlay />
      <ModalContent maxW="500px" mx="16px">
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            handleChangePassword();
          }}
        >
          <ModalBody flexDir="column" gap="24px" p="24px" display="flex">
            <Flex flexDir="column" gap="8px">
              <Flex align="center" justify="space-between">
                <CustomText text="Change Password" size="20px" weight="600" />
                <IconX
                  size="24px"
                  cursor="pointer"
                  onClick={() => {
                    onClose();
                  }}
                />
              </Flex>
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
                  Current Password{" "}
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
                    type={payload?.isOldPasswordVisible ? "text" : "password"}
                    boxShadow="none"
                    value={payload.oldPassword}
                    isRequired
                    onChange={(e) =>
                      setPayload({ ...payload, oldPassword: e.target.value })
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
                        isOldPasswordVisible: !payload.isOldPasswordVisible,
                      })
                    }
                  >
                    {payload.isOldPasswordVisible ? (
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
                    pe="50px"
                    width="100%"
                    borderRadius="5px"
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
                    pe="50px"
                    borderRadius="5px"
                    border="1.5px solid #CFCFCF"
                    background="#FFFFFF"
                    focusBorderColor="#d9d9d9"
                    _hover={{ borderColor: "#d9d9d9" }}
                    type={
                      payload?.isConfirmPasswordVisible ? "text" : "password"
                    }
                    boxShadow="none"
                    value={payload.confirmPassword}
                    isRequired
                    onChange={(e: any) =>
                      setPayload({
                        ...payload,
                        confirmPassword: e.target.value,
                      })
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
              btnText="Change Password"
              color="#fff"
              type="submit"
              isLoading={changePassword.isPending}
            />
          </ModalBody>
        </form>
      </ModalContent>
    </Modal>
  );
}

export default ChangePasswordModal;
