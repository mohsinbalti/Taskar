import React from "react";
import { Box, Flex, SimpleGrid, SkeletonText, Stack } from "@chakra-ui/react";
import CustomText from "@/components/fonts/text";
import { IconBriefcase, IconClock, IconLanguage } from "@tabler/icons-react";
const Stats = ({ userData, isLoading }: any) => {
  return (
    <SimpleGrid spacing="16px" columns={{ base: 1, md: 2, lg: 3 }}>
      <Flex
        p={{ base: "16px" }}
        borderRadius={"8px"}
        border="1px solid #ECECEC"
        gap="20px"
        align={"center"}
        bg="#fff"
      >
        <IconLanguage size="28px" />
        <Stack gap="8px">
          <CustomText text="Languages" size="20px" weight="500" />
          {isLoading ? (
            <SkeletonText w="120px" noOfLines={1} h="10px" mt="12px" />
          ) : (
            <CustomText
              text={
                userData?.languages?.length === 0
                  ? "English"
                  : userData?.languages?.map((language: any) => language)
              }
              color="#666"
            />
          )}
        </Stack>
      </Flex>
      <Flex
        p={{ base: "16px" }}
        borderRadius={"8px"}
        border="1px solid #ECECEC"
        gap="20px"
        align={"center"}
        bg="#fff"
      >
        <IconClock size="28px" />
        <Stack gap="8px">
          <CustomText
            text="Avg Task Completion Rate"
            size="20px"
            weight="500"
          />
          {isLoading ? (
            <SkeletonText w="120px" noOfLines={1} h="10px" mt="12px" />
          ) : (
            <CustomText
              text={`${
                userData?.avgTaskCompletionRate?.includes("NaN")
                  ? "0 minutes"
                  : userData?.avgTaskCompletionRate
              }`}
              color="#666"
            />
          )}
        </Stack>
      </Flex>
      <Flex
        p={{ base: "16px" }}
        borderRadius={"8px"}
        border="1px solid #ECECEC"
        gap="20px"
        align={"center"}
        bg="#fff"
      >
        <IconBriefcase size="28px" />
        <Stack gap="8px">
          <CustomText text="Total Submissions" size="20px" weight="500" />
          {isLoading ? (
            <SkeletonText w="120px" noOfLines={1} h="10px" mt="12px" />
          ) : (
            <CustomText text={`${userData?.totalSubmissions}+`} color="#666" />
          )}
        </Stack>
      </Flex>
    </SimpleGrid>
  );
};

export default Stats;
