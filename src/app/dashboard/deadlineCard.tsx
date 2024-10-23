import { BlackButton } from "@/components/buttons/button";
import {
  calculateRemainingDays,
  formatDateAgo,
} from "@/components/date-format/RemainingDays";
import CustomText from "@/components/fonts/text";
import { Flex, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
const DeadlineCard = ({ upcomingDeadLine, isLoading }: any) => {
  const router = useRouter();
  return (
    <Stack
      px={{ base: "12px", md: "24px" }}
      py="24px"
      justify={"space-between"}
      h="100%"
      borderRadius={"16px"}
      bg="#fff"
      w={{ base: "100%", md: "352px" }}
      gap="32px"
    >
      <CustomText
        text="Upcoming Deadline"
        color="#141432"
        size={{ base: "16px", md: "20px" }}
        weight="600"
      />
      <Stack gap="16px">
        <Flex justify={"space-between"}>
          <Stack gap="2px">
            <CustomText text="Challenge Name" color="#141433" size="12px" />
            {isLoading ? (
              <SkeletonText noOfLines={1} w="100px" mt="10px" />
            ) : (
              <CustomText
                text={upcomingDeadLine?.[0]?.task?.title}
                color="#141433"
                size="14px"
                weight="500"
              />
            )}
          </Stack>
          <Stack align="end" gap="2px">
            <CustomText text="Category" color="#141433" size="12px" />
            {isLoading ? (
              <SkeletonText noOfLines={1} w="100px" mt="10px" />
            ) : (
              <CustomText
                text={
                  upcomingDeadLine?.[0]?.categories?.[0]?.categoryName || ""
                }
                color="#141433"
                size="14px"
                weight="500"
                align="end"
              />
            )}
          </Stack>
        </Flex>
        <Flex justify={"space-between"}>
          <Stack gap="2px">
            <CustomText text="Started" color="#141433" size="12px" />
            {isLoading ? (
              <SkeletonText noOfLines={1} w="100px" mt="10px" />
            ) : (
              <CustomText
                text={
                  upcomingDeadLine?.[0]?.startedDate
                    ? `${formatDateAgo(upcomingDeadLine?.[0]?.startedDate)} `
                    : " "
                }
                color="#141433"
                size="14px"
                weight="500"
              />
            )}
          </Stack>
          <Stack align="end" gap="2px">
            <CustomText text="Deadline" color="#141433" size="12px" />
            {isLoading ? (
              <SkeletonText noOfLines={1} w="100px" mt="10px" />
            ) : (
              <CustomText
                text={
                  upcomingDeadLine?.[0]?.task?.deadline
                    ? `${calculateRemainingDays(
                        upcomingDeadLine?.[0]?.task?.deadline
                      )} days left`
                    : " "
                }
                color="#141433"
                size="14px"
                weight="500"
              />
            )}
          </Stack>
        </Flex>
      </Stack>
      {isLoading ? (
        <Skeleton h="48px" borderRadius="12px" />
      ) : (
        <BlackButton
          color="#fff"
          btnText="View Task"
          fontSize="16px"
          h="48px"
          onClick={() =>
            router.push(`/task-detail/${upcomingDeadLine?.[0]?.task?.id}`)
          }
        />
      )}
    </Stack>
  );
};
export default DeadlineCard;
