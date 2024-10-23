"use client";
import AuthLayout from "@/app/layouts/AuthLayout";
import { BlackButton, InterestButton } from "@/components/buttons/button";
import CustomText from "@/components/fonts/text";
import { useEditProfile, useGetAllInterests } from "@/utils/auth.api";
import {
  Card,
  CardBody,
  Center,
  Flex,
  Image,
  SkeletonText,
  Spinner,
  Wrap,
  useToast,
} from "@chakra-ui/react";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Interests = () => {
  const toast = useToast();
  const router = useRouter();
  const { data: interests, isLoading, isError } = useGetAllInterests();
  const editProfileMutation = useEditProfile();

  const [selectedInterests, setSelectedInterests] = useState<any>([]);
  console.log("🚀 ~ Interests ~ selectedInterests:", selectedInterests);

  const handleInterestClick = (interest: any) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item: any) => item !== interest)
      );
    } else if (selectedInterests.length < 4) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  return (
    <AuthLayout>
      <Center
        bg="linear-gradient(162deg, #212121 4.83%, #000 103.44%)"
        minH={"100vh"}
        px="16px"
        py="40px"
        pos="relative"
      >
        <Image
          src="/images/ez-for-interest.svg"
          pos="absolute"
          bottom="0"
          right="0"
          alt="interest"
        />
        <Card
          py="32px"
          px={{ base: "16px", md: "32px", xl: "90px" }}
          bg="white"
          borderRadius={"24px"}
        >
          <CardBody p="0px" maxW="604px" mx="auto">
            <Center gap={{ base: "0px", md: "8px" }} cursor={"pointer"}>
              <Image
                w="179px"
                h="48px"
                objectFit="cover"
                src={`/logo/EZ Tasker Logo-02.svg`}
                alt="logo"
              />
            </Center>
            <CustomText
              text="Great job so far! Now, let us know what interests you."
              size={{ md: "32px" }}
              mt={{ base: "30px", md: "60px" }}
              h="40px"
              weight="500"
              align="center"
            />
            <Wrap my="64px" gap="12px" className="interest-page-buttons">
              {isLoading
                ? new Array(8).fill(1)?.map((_, idx) => (
                    <Flex
                      align="center"
                      border="1px solid #212121"
                      borderRadius="10px"
                      h="48px"
                      key={idx}
                      w={`${120 + idx * 5}px`}
                      px="5px"
                      justify="center"
                      flexDir="column"
                    >
                      <SkeletonText noOfLines={1} w="100%" h="10px" />
                    </Flex>
                  ))
                : interests?.map((item: any, idx: number) => (
                    <InterestButton
                      key={idx}
                      icon={
                        selectedInterests.includes(item.id) ? (
                          <IconCheck
                            size="16px"
                            stroke={2}
                            color={item?.textColorCode}
                            // color={item.bgColorCode}
                          />
                        ) : (
                          <IconPlus
                            size="16px"
                            stroke={2}
                            color={
                              selectedInterests.includes(item.id)
                                ? item?.textColorCode
                                : "#212121"
                            }
                          />
                        )
                      }
                      btnText={item.categoryName}
                      onClick={() => handleInterestClick(item.id)}
                      selected={selectedInterests.includes(item.id)}
                      bg={
                        selectedInterests.includes(item.id)
                          ? item?.bgColorCode
                          : ""
                      }
                      color={
                        selectedInterests.includes(item.id)
                          ? item?.textColorCode
                          : ""
                      }
                      // color={item.bgColorCode}
                    />
                  ))}
            </Wrap>
            <BlackButton
              bg="#6F49FE"
              isLoading={editProfileMutation?.isPending}
              btnText={
                editProfileMutation?.isPending ? <Spinner /> : "Let's dive in"
              }
              disabled={
                selectedInterests.length > 4 || selectedInterests.length < 1
              }
              onClick={async () => {
                const formData: any = {
                  interests: selectedInterests,
                };
                await editProfileMutation
                  .mutateAsync(formData)
                  .then((result) => {
                    toast({
                      title: "Interests Added",
                      status: "success",
                      position: "top-right",
                      duration: 3000,
                    });
                    router.push("/");
                  })
                  .catch((err) => {
                    toast({
                      title: err?.message,
                      status: "error",
                      position: "top-right",
                    });
                  });
              }}
            />
            <CustomText
              text="Max 4 Options"
              color="#666666"
              mt="60px"
              align="center"
            />
          </CardBody>
        </Card>
      </Center>
    </AuthLayout>
  );
};

export default Interests;
