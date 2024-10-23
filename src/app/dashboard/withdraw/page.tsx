"use client";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import { BlackButton } from "@/components/buttons/button";
import CustomText from "@/components/fonts/text";
import { PrimaryInput } from "@/components/input";
import Success from "@/components/task/taskDetail/taskTitleCard/startTask/success";
import {
  useAddAccount,
  useDeleteAccount,
  useGetAccountDetails,
  useGetLoggedInUser,
} from "@/utils/auth.api";
import { useConfirmOtpForWithdraw, useWithdraw } from "@/utils/task.api";
import {
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  PinInput,
  PinInputField,
  SimpleGrid,
  Skeleton,
  Spinner,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { IconBuildingBank, IconPlus, IconTrash } from "@tabler/icons-react";
import moment from "moment";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

const Withdraw = () => {
  const router = useRouter();

  const { data: userData } = useGetLoggedInUser();
  const { data: accountDetails, isLoading: accountLoading } =
    useGetAccountDetails();

  const deleteAccount = useDeleteAccount();
  const addBankAccount = useAddAccount();
  const withdrawMutation = useWithdraw();
  const confirmOtpForWithdrawMutation = useConfirmOtpForWithdraw();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [toggle, setToggle] = useState(false);
  const [pin, setPin] = useState("");
  const [completed, setCompleted] = useState(false);
  const [selectedBank, setSelectedBank] = useState(-1);
  const [timer, setTimer] = useState(-1);
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [isAddBankAccount, setIsAddBankAccount] = useState(false);
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    IBAN: "",
    swiftCode: "",
    fullName: "",
    address: "",
    country: "",
    postalCode: 0,
    city: "",
    state: "",
  });

  // console.log(formData);
  const displayTime = `${minutes?.toString().padStart(2, "0")}:${seconds
    ?.toString()
    .padStart(2, "0")}`;

  const handleToggle = () => {
    setToggle(!toggle);
    onClose();
    setCompleted(false);
  };

  const hasEmptyOrZeroValue = () => {
    for (const value of Object.values(formData)) {
      // Check if value is 0 or empty string
      if (value === 0 || value === "") {
        return true; // Return true if value is 0 or empty string
      }
    }
    return false; // Return false if no value is 0 or empty string
  };

  useEffect(() => {
    let countdown: any;
    if (timer >= 0) {
      // Start countdown only if timer is greater than or equal to 0
      countdown = setInterval(() => {
        if (timer > 0) {
          setTimer((prevTimer) => prevTimer - 1);
        } else {
          clearInterval(countdown);
        }
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [timer]);

  useEffect(() => {
    if (userData) {
      if (!amount) {
        setAmount(userData?.availableBalance);
      }
      setEmail(userData?.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData]);

  return (
    <DashboardLayout>
      <Stack
        width={"100%"}
        pb="32px"
        px={{ base: "16px", md: "32px" }}
        maxW="1440px"
        mx="auto"
        gap="32px"
      >
        <Box display={{ base: "none", md: "block" }}>
          <p style={{ color: "black" }}>
            <span
              style={{ color: "#8f9197", cursor: "pointer" }}
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </span>{" "}
            / <span>Bank Withdrawal</span>
          </p>
        </Box>
        <Stack align={"center"} gap={"32px"}>
          <Box
            p={"24px"}
            borderRadius={"16px"}
            border={"1px solid #ECECEC"}
            bg={"#FFF"}
            w={"100%"}
          >
            <CustomText
              text="Withdraw to Bank"
              color="#212121"
              size="24px"
              weight="600"
              lineHeight="28px"
            />
          </Box>
          {accountLoading ? (
            <Skeleton borderRadius="16px" w="100%" h="90px" opacity="0.2" />
          ) : (
            accountDetails?.map((account: any, idx: number) => (
              <Flex
                bg="#Fff"
                p="24px"
                flexDir="column"
                gap="24px"
                borderRadius="16px"
                w="100%"
                border={`1px solid ${
                  selectedBank === account?.id ? "#6F49FE" : "#ECECEC"
                }`}
                key={idx}
                onClick={() => {
                  setSelectedBank(account?.id);
                }}
                cursor="pointer"
              >
                <Flex
                  align="center"
                  justify="space-between"
                  gap="24px"
                  w="100%"
                >
                  <Flex align="center" gap="8px">
                    <Flex
                      bg="#f6f6f6"
                      height="40px"
                      width="40px"
                      borderRadius="8px"
                      align="center"
                      justify="center"
                    >
                      <IconBuildingBank
                        color={
                          selectedBank === account?.id ? "#6F49FE" : "#212121"
                        }
                      />
                    </Flex>
                    <Flex flexDir="column">
                      <CustomText
                        text={`${
                          account?.bankName || ""
                        } **** **** **** ${account?.accountNumber?.slice(-4)}`}
                        color="#212121"
                        size="16px"
                        weight="600"
                        lineHeight="normal"
                      />
                      <CustomText
                        text={moment(account?.createdAt).format("MMM DD, YYYY")}
                        color="#666666"
                        size="12px"
                        weight="400"
                        lineHeight="normal"
                      />
                    </Flex>
                  </Flex>
                  <Flex
                    bg="#f6f6f6"
                    height="32px"
                    width="32px"
                    borderRadius="8px"
                    align="center"
                    justify="center"
                    cursor="pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (deleteAccount?.isPending) {
                        return;
                      }
                      deleteAccount
                        .mutateAsync(account?.id)
                        .then((result) => {
                          toast({
                            title: "Account Deleted",
                            status: "success",
                            position: "top-right",
                            duration: 3000,
                          });
                        })
                        .catch((err) => {
                          toast({
                            description: err?.message,
                            status: "error",
                            position: "top-right",
                            duration: 3000,
                          });
                        });
                    }}
                  >
                    <IconTrash size="16px" color="#FF0000" />
                  </Flex>
                </Flex>
                <Collapse in={selectedBank === account?.id} animateOpacity>
                  <Stack
                    align={"flex-start"}
                    gap={"6px"}
                    alignSelf={"stretch"}
                    w={"100%"}
                  >
                    <CustomText
                      text="Amount ($)"
                      color="#212121"
                      lineHeight="160%"
                      fontWeight="600"
                    />
                    <Flex align="center" w="100%" gap="16px">
                      <PrimaryInput
                        ph="$240.30"
                        h="52px"
                        type="number"
                        value={amount}
                        onChange={(e: any) => setAmount(e.target.value)}
                      />
                      <BlackButton
                        btnText="Withdraw"
                        maxW="250px"
                        h="52px"
                        onClick={async (e: any) => {
                          e.stopPropagation();
                          if (withdrawMutation?.isPending) {
                            return;
                          }
                          try {
                            if (Number(amount) < 0) {
                              toast({
                                title: "Amount must be greater than 0",
                                status: "error",
                                position: "top-right",
                              });
                              return;
                            }
                            await withdrawMutation.mutateAsync({
                              bankAccountId: account?.id,
                              amount: Number(amount),
                            });
                            onOpen();
                            setTimer(120);
                          } catch (error: any) {
                            toast({
                              title: error?.message,
                              status: "error",
                              position: "top-right",
                            });
                          }
                        }}
                        isLoading={withdrawMutation?.isPending}
                      />
                    </Flex>
                  </Stack>
                </Collapse>
              </Flex>
            ))
          )}
          <Flex
            display={isAddBankAccount ? "none" : "flex"}
            align="center"
            justify="center"
            gap="8px"
            h="60px"
            w="100%"
            bg="white"
            borderRadius="12px"
            border="1px dashed #6F49FE"
            cursor="pointer"
            onClick={() => setIsAddBankAccount(true)}
          >
            <IconPlus size="24px" color="#6F49FE" />
            <CustomText text="Add Bank" color="#6F49FE" />
          </Flex>
        </Stack>

        <Collapse in={isAddBankAccount} animateOpacity>
          <Flex flexDir="column" gap="16px">
            <Stack
              p={"24px"}
              align={"flex-start"}
              gap={"24px"}
              borderRadius={"16px"}
              border={"1px solid #ECECEC"}
              bg={"#FFF"}
              w={"100%"}
            >
              <CustomText
                text="Account Details"
                color="#282828"
                size="20px"
                weight="500"
                lineHeight="normal"
              />
              <Divider />
              <Center
                flexDir={"column"}
                gap={"16px"}
                w={"100%"}
                alignSelf={"stretch"}
              >
                <Stack
                  align={"flex-start"}
                  gap={"6px"}
                  alignSelf={"stretch"}
                  w={"100%"}
                >
                  <CustomText
                    text="Bank Name"
                    color="#212121"
                    lineHeight="160%"
                    fontWeight="600"
                  />
                  <PrimaryInput
                    ph="European Bank"
                    h="52px"
                    value={formData?.bankName}
                    onChange={(e: any) =>
                      setFormData({ ...formData, bankName: e.target.value })
                    }
                  />
                </Stack>
                <Stack
                  align={"flex-start"}
                  gap={"6px"}
                  alignSelf={"stretch"}
                  w={"100%"}
                >
                  <CustomText
                    text="Account Number"
                    color="#212121"
                    lineHeight="160%"
                    fontWeight="600"
                  />
                  <PrimaryInput
                    ph="xxxxx xxxxx xxxxx xxxx"
                    h="52px"
                    value={formData?.accountNumber}
                    onChange={(e: any) =>
                      setFormData({
                        ...formData,
                        accountNumber: e.target.value,
                      })
                    }
                  />
                </Stack>
                <Stack
                  align={"flex-start"}
                  gap={"6px"}
                  alignSelf={"stretch"}
                  w={"100%"}
                >
                  <CustomText
                    text="IBAN"
                    color="#212121"
                    lineHeight="160%"
                    fontWeight="600"
                  />
                  <PrimaryInput
                    ph="xxxx xx xx xxx"
                    h="52px"
                    value={formData?.IBAN}
                    onChange={(e: any) =>
                      setFormData({ ...formData, IBAN: e.target.value })
                    }
                  />
                </Stack>
                <Stack
                  align={"flex-start"}
                  gap={"6px"}
                  alignSelf={"stretch"}
                  w={"100%"}
                >
                  <CustomText
                    text="SWIFT Code"
                    color="#212121"
                    lineHeight="160%"
                    fontWeight="600"
                  />
                  <PrimaryInput
                    ph="xxxx xx xx xxx"
                    h="52px"
                    value={formData?.swiftCode}
                    onChange={(e: any) =>
                      setFormData({ ...formData, swiftCode: e.target.value })
                    }
                  />
                </Stack>
              </Center>
            </Stack>
            <Stack align={"center"} gap={"32px"}>
              <Stack
                p={"24px"}
                align={"flex-start"}
                gap={"24px"}
                borderRadius={"16px"}
                border={"1px solid #ECECEC"}
                bg={"#FFF"}
                w={"100%"}
              >
                <CustomText
                  text="Beneficiary Details"
                  color="#282828"
                  size="20px"
                  weight="500"
                  lineHeight="normal"
                />
                <Divider />
                <Center
                  flexDir={"column"}
                  gap={"16px"}
                  w={"100%"}
                  alignSelf={"stretch"}
                >
                  <Stack
                    align={"flex-start"}
                    gap={"6px"}
                    alignSelf={"stretch"}
                    w={"100%"}
                  >
                    <CustomText
                      text="Full Name"
                      color="#212121"
                      lineHeight="160%"
                      fontWeight="600"
                    />
                    <PrimaryInput
                      ph="Full Name"
                      h="52px"
                      value={formData?.fullName}
                      onChange={(e: any) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                    />
                  </Stack>
                  <Stack
                    align={"flex-start"}
                    gap={"6px"}
                    alignSelf={"stretch"}
                    w={"100%"}
                  >
                    <CustomText
                      text="Address"
                      color="#212121"
                      lineHeight="160%"
                      fontWeight="600"
                    />
                    <PrimaryInput
                      ph="South West Eve,7th Street"
                      h="52px"
                      value={formData?.address}
                      onChange={(e: any) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </Stack>
                  <Flex
                    justify={"center"}
                    align={"center"}
                    gap={"32px"}
                    w={"100%"}
                  >
                    <Stack
                      align={"flex-start"}
                      gap={"6px"}
                      alignSelf={"stretch"}
                      w={"100%"}
                    >
                      <CustomText
                        text="Country"
                        color="#212121"
                        lineHeight="160%"
                        fontWeight="600"
                      />
                      <PrimaryInput
                        ph="England"
                        h="52px"
                        value={formData?.country}
                        onChange={(e: any) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                      />
                    </Stack>
                    <Stack
                      align={"flex-start"}
                      gap={"6px"}
                      alignSelf={"stretch"}
                      w={"100%"}
                    >
                      <CustomText
                        text="Postal Code"
                        color="#212121"
                        lineHeight="160%"
                        fontWeight="600"
                      />
                      <PrimaryInput
                        ph="0000"
                        h="52px"
                        type="number"
                        value={formData?.postalCode}
                        onChange={(e: any) =>
                          setFormData({
                            ...formData,
                            postalCode: e.target.value,
                          })
                        }
                      />
                    </Stack>
                  </Flex>
                  <Flex
                    justify={"center"}
                    align={"center"}
                    gap={"32px"}
                    w={"100%"}
                  >
                    <Stack
                      align={"flex-start"}
                      gap={"6px"}
                      alignSelf={"stretch"}
                      w={"100%"}
                    >
                      <CustomText
                        text="City"
                        color="#212121"
                        lineHeight="160%"
                        fontWeight="600"
                      />
                      <PrimaryInput
                        ph="Bedworth"
                        h="52px"
                        value={formData?.city}
                        onChange={(e: any) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </Stack>
                    <Stack
                      align={"flex-start"}
                      gap={"6px"}
                      alignSelf={"stretch"}
                      w={"100%"}
                    >
                      <CustomText
                        text="State"
                        color="#212121"
                        lineHeight="160%"
                        fontWeight="600"
                      />
                      <PrimaryInput
                        ph="Birmingham"
                        h="52px"
                        value={formData?.state}
                        onChange={(e: any) =>
                          setFormData({ ...formData, state: e.target.value })
                        }
                      />
                    </Stack>
                  </Flex>
                </Center>
              </Stack>
            </Stack>
            <Flex w={"100%"} align={"center"} gap={"12px"}>
              <Button
                variant={"unstyled"}
                display={"flex"}
                h={"48px"}
                px={"28px"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"10px"}
                flex={"1 0 0"}
                borderRadius={"78px"}
                bg={"#F6F6F6"}
                color={"#212121"}
                fontWeight={"500"}
                onClick={() => setIsAddBankAccount(false)}
              >
                Cancel
              </Button>

              <Button
                variant={"unstyled"}
                display={"flex"}
                h={"48px"}
                px={"28px"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"10px"}
                flex={"1 0 0"}
                borderRadius={"78px"}
                bg={"#212121"}
                color={"#FFF"}
                fontWeight={"500"}
                disabled={addBankAccount?.isPending}
                onClick={async () => {
                  if (addBankAccount?.isPending) {
                    return;
                  }
                  if (hasEmptyOrZeroValue()) {
                    toast({
                      title: "All fields must be filled",
                      status: "error",
                      position: "top-right",
                    });
                    return;
                  }
                  await addBankAccount
                    .mutateAsync(formData)
                    .then((result) => {
                      toast({
                        title: "Account Added",
                        status: "success",
                        position: "top-right",
                        duration: 3000,
                      });
                      setFormData({
                        bankName: "",
                        accountNumber: "",
                        IBAN: "",
                        swiftCode: "",
                        fullName: "",
                        address: "",
                        country: "",
                        postalCode: 0,
                        city: "",
                        state: "",
                      });
                      setIsAddBankAccount(false);
                    })
                    .catch((err) => {
                      toast({
                        description: err?.message,
                        status: "error",
                        position: "top-right",
                        duration: 3000,
                      });
                    });
                }}
              >
                {addBankAccount?.isPending ? <Spinner /> : "Save"}
              </Button>
            </Flex>
          </Flex>
        </Collapse>
      </Stack>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent
          minW={{ base: "100%", sm: "400px", md: "588px" }}
          maxW={{ base: "100%", sm: "400px", md: "588px" }}
        >
          {!completed && (
            <>
              <ModalHeader>Email Verification</ModalHeader>
              <ModalCloseButton onClick={() => onClose()} />
              <ModalBody
                p="24px"
                display={"flex"}
                flexDir={"column"}
                gap="32px"
              >
                <Box maxW={{ md: "540px" }}>
                  <CustomText
                    mt="8px"
                    align="center"
                    color="#666666"
                    h="20px"
                    text={`We just sent a 6 digits verification code to ${email}. Verify by entering the code here.`}
                  />
                  <form>
                    <Flex mb="20px" mt="20px" gap="12px" h="80px">
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
                            fontWeight={500}
                            className={jakarta?.className}
                            _placeholder={{ color: "#CFCFCF" }}
                          />
                        ))}
                      </PinInput>
                    </Flex>
                    <Center mb="20px">
                      <CustomText text={displayTime} weight={500} />
                    </Center>
                  </form>
                  {/* {displayTime === "00:00" && ( */}
                  <Center gap="4px" mt="40px">
                    <CustomText
                      text="Didn’t get a code?"
                      size="14px"
                      color="#666666"
                    />
                    {/* {emailLogin?.isPending ? ( */}
                    {/* <Spinner size="sm" color="#212121" /> */}
                    {/* ) : ( */}
                    <CustomText
                      text="Click to resend."
                      weight={600}
                      size="14px"
                      borderBottom="1px solid #212121"
                      h="12px"
                      cursor="pointer"
                      //   onClick={() => {
                      //     emailLogin
                      //       ?.mutateAsync({ email })
                      //       .then((res) => {
                      //         if (res.status) {
                      //           setTimer(60);
                      //           toast({
                      //             title: "Email Sent",
                      //             description: `OTP code sent to your ${email}`,
                      //             status: "success",
                      //             duration: 2000,
                      //             isClosable: true,
                      //           });
                      //         }
                      //       })
                      //       .catch((err) => {
                      //         toast({
                      //           title: "Error",
                      //           description: err?.message || "Invalid Email",
                      //           status: "error",
                      //           duration: 2000,
                      //           isClosable: true,
                      //         });
                      //       });
                      //   }}
                    />
                    {/* )} */}
                  </Center>
                  {/* )} */}
                </Box>
              </ModalBody>
              <ModalFooter>
                <SimpleGrid spacing="12px" w="100%" columns={{ md: 2 }}>
                  <Box w="100%">
                    <BlackButton
                      h="48px"
                      btnText="Cancel"
                      fontSize="18px"
                      onClick={onClose}
                      bg="#F6F6F6"
                      color="#212121"
                    />
                  </Box>
                  <Box w="100%">
                    <BlackButton
                      //   disabled={editProfileMutation?.isPending}
                      h="48px"
                      btnText={
                        confirmOtpForWithdrawMutation?.isPending ? (
                          <Spinner />
                        ) : (
                          "Complete Withdrawal"
                        )
                      }
                      fontSize="18px"
                      isLoading={confirmOtpForWithdrawMutation?.isPending}
                      onClick={async () => {
                        try {
                          const confirmData = {
                            bankAccountId: selectedBank,
                            amount: Number(amount),
                            otp: pin,
                          };
                          console.log(confirmData);
                          await confirmOtpForWithdrawMutation.mutateAsync(
                            confirmData
                          );
                          setCompleted(true);
                        } catch (error: any) {
                          toast({
                            title: error?.message,
                            status: "error",
                            position: "top-right",
                          });
                        }
                      }}
                    />
                  </Box>
                </SimpleGrid>
              </ModalFooter>
            </>
          )}
          {completed && (
            <Success
              toggle={handleToggle}
              title={"Withdraw Success"}
              details={
                "Your amount has been withdrawal successfully to your bank account"
              }
              btnText={"Take me to dashboard"}
              link={"/dashboard"}
            />
          )}
        </ModalContent>
      </Modal>
    </DashboardLayout>
  );
};

export default Withdraw;
