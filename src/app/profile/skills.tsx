import React from "react";
import { Center, Flex, Image, Stack, Wrap } from "@chakra-ui/react";
import CustomText from "@/components/fonts/text";
import { BlackButton } from "@/components/buttons/button";
const Skills = ({ userData, onOpen }: any) => {
  return (
    <>
      <Stack
        p={{ base: "16px", md: "24px" }}
        borderRadius={"16px"}
        border="1px solid #ECECEC"
        gap="16px"
        bg="#fff"
      >
        <CustomText text="Skills" size="20px" h="120%" weight="600" />
        <Wrap>
          {userData?.skills?.length === 0 ? (
            <Flex
              flexDir="column"
              align="center"
              justify="center"
              my="24px"
              gap="16px"
              w="100%"
            >
              <Image src="/icons/no_skill.svg" alt="task" />
              <Flex flexDir="column" gap="4px" align="center" justify="center">
                <CustomText
                  text="No Skills Available"
                  size={{ base: "16px", md: "20px" }}
                  weight="600"
                />
                <CustomText
                  text="Your skill set is empty update it."
                  size="14px"
                  weight="400"
                  color="#666"
                />
              </Flex>
              <BlackButton
                btnText="Update Skills Set"
                h="48px"
                maxW="296px"
                onClick={onOpen}
              />
            </Flex>
          ) : (
            userData?.skills?.map((item: any, idx: any) => (
              <Center
                key={idx}
                py="4px"
                px="12px"
                bg="#F6F6F6"
                borderRadius={"20px"}
                my="4px"
              >
                <CustomText
                  text={item?.skillName}
                  h="160%"
                  size={{ base: "12px", md: "16px" }}
                />
              </Center>
            ))
          )}
        </Wrap>
      </Stack>
      <Stack
        p={{ base: "16px", md: "24px" }}
        borderRadius={"16px"}
        border="1px solid #ECECEC"
        gap="16px"
        bg="#fff"
      >
        <CustomText text="Interests" size="20px" h="120%" weight="600" />
        <Wrap>
          {userData?.interests?.length === 0 ? (
            <CustomText
              text="No interests added"
              size="16px"
              h="120%"
              weight="400"
            />
          ) : (
            userData?.interests?.map((item: any, idx: any) => (
              <Center
                key={idx}
                py="4px"
                px="12px"
                bg={item?.bgColorCode || "#F6F6F6"}
                borderRadius={"20px"}
                my="4px"
              >
                <CustomText
                  text={item?.categoryName}
                  h="160%"
                  color={item?.textColorCode || "#000"}
                  size={{ base: "12px", md: "16px" }}
                />
              </Center>
            ))
          )}
        </Wrap>
      </Stack>
    </>
  );
};

export default Skills;
