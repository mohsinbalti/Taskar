import { Box, Flex, Progress, SkeletonText } from "@chakra-ui/react";
import React from "react";
import CustomText from "../fonts/text";
import { useGetLoggedInUser } from "@/utils/auth.api";
import { useRouter } from "next/navigation";

const Stats = () => {
  const router = useRouter();
  const { data: userStats, isLoading } = useGetLoggedInUser();

  return (
    <Flex
      width={"307px"}
      p={"16px"}
      direction={"column"}
      alignItems={"start"}
      gap={"20px"}
      borderRadius={"16px"}
      bg={"#212121"}
    >
      <CustomText
        text={"My Personal Stats"}
        color={"#FFF"}
        size={"20px"}
        weight={600}
      />

      <Flex direction={"column"} gap={"12px"} width={"100%"}>
        <CustomText
          text={`${
            Number(userStats?.taskCompletionRate || 0)?.toLocaleString(
              undefined,
              {
                maximumFractionDigits: 2,
              }
            ) || 0
          }% Task Completion Rate`}
          color={"#FFF"}
          size={"12px"}
          weight={500}
        />
        <Progress
          value={userStats?.taskCompletionRate ?? 0}
          h={"12px"}
          width={"100%"}
          colorScheme="whiteAlpha"
          bg="#666"
          borderRadius={"8px"}
        />
      </Flex>

      {/* stats row */}
      <Flex gap={"16px"} direction={"column"}>
        {/* row1 */}
        <Flex justifyContent={"space-between"} width={"275px"}>
          <Flex direction={"column"} gap={"2px"} alignItems={"flex-start"}>
            <CustomText
              text={"Active Tasks"}
              color={"#FFF"}
              size={"12px"}
              h={"18px"}
            />
            {isLoading ? (
              <SkeletonText noOfLines={1} w="50px" h="24px" />
            ) : (
              <CustomText
                text={userStats?.activeTask ?? 0}
                color={"#FFF"}
                size={"16px"}
                h={"24px"}
                weight={500}
              />
            )}
          </Flex>
          <Flex direction={"column"} gap={"2px"} alignItems={"flex-end"}>
            <CustomText
              text={"Time Spent"}
              color={"#FFF"}
              size={"12px"}
              h={"18px"}
            />
            {isLoading ? (
              <SkeletonText noOfLines={1} w="50px" h="24px" />
            ) : (
              <CustomText
                text={`${
                  userStats?.timeSpent?.includes("not calculated")
                    ? "0 Days"
                    : userStats?.timeSpent?.includes("1 days")
                    ? "1 Day"
                    : userStats?.timeSpent ?? 0
                }`}
                color={"#FFF"}
                size={"16px"}
                h={"24px"}
                transform={"capitalize"}
                weight={500}
              />
            )}
          </Flex>
        </Flex>
        {/* row 2 */}
        <Flex justifyContent={"space-between"} width={"275px"}>
          <Flex direction={"column"} gap={"2px"} alignItems={"flex-start"}>
            <CustomText
              text={"Earnings"}
              color={"#FFF"}
              size={"12px"}
              h={"18px"}
            />
            {isLoading ? (
              <SkeletonText noOfLines={1} w="50px" h="24px" />
            ) : (
              <CustomText
                text={`$${
                  Number(userStats?.totalEarnings)?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  }) ?? 0
                }`}
                color={"#FFF"}
                size={"16px"}
                h={"24px"}
                weight={500}
              />
            )}
          </Flex>
          <Flex direction={"column"} gap={"2px"} alignItems={"flex-end"}>
            <CustomText
              text={"Avg. Submission Time"}
              color={"#FFF"}
              size={"12px"}
              h={"18px"}
            />
            {isLoading ? (
              <SkeletonText noOfLines={1} w="50px" h="24px" />
            ) : (
              <CustomText
                text={`${
                  userStats?.avgTaskCompletionRate?.includes("NaN")
                    ? "0 Hours"
                    : userStats?.avgTaskCompletionRate ?? "0 Hours"
                }`}
                color={"#FFF"}
                size={"16px"}
                h={"24px"}
                weight={500}
              />
            )}
          </Flex>
        </Flex>
        {/* row 3 */}
        <Flex justifyContent={"space-between"} width={"275px"}>
          <Flex direction={"column"} gap={"2px"} alignItems={"flex-start"}>
            <CustomText
              text={"Submissions"}
              color={"#FFF"}
              size={"12px"}
              h={"18px"}
            />
            {isLoading ? (
              <SkeletonText noOfLines={1} w="50px" h="24px" />
            ) : (
              <CustomText
                text={`${userStats?.totalSubmissions ?? 0} (${
                  userStats?.totalPoints ?? 0
                } pts)`}
                color={"#FFF"}
                size={"16px"}
                h={"24px"}
                weight={500}
              />
            )}
          </Flex>
          <Flex direction={"column"} gap={"2px"} alignItems={"flex-end"}>
            <CustomText
              text={"Tasks Won"}
              color={"#FFF"}
              size={"12px"}
              h={"18px"}
            />
            {isLoading ? (
              <SkeletonText noOfLines={1} w="50px" h="24px" />
            ) : (
              <CustomText
                text={`${
                  Number(userStats?.totalWinnerTasks)?.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 2,
                    }
                  ) ?? 0
                } ( $${
                  Number(
                    Number(userStats?.totalEarnings) -
                      Number(userStats?.referralEarning)
                  )?.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  }) ?? 0
                })`}
                color={"#FFF"}
                size={"16px"}
                h={"24px"}
                weight={500}
              />
            )}
          </Flex>
        </Flex>
      </Flex>

      <Flex
        py={"10px"}
        borderRadius={"80px"}
        bg={"#FFF"}
        width={"full"}
        alignItems={"center"}
        justifyContent={"center"}
        cursor={"pointer"}
        onClick={() => router.push("/dashboard")}
      >
        <CustomText
          text={"View Dashboard"}
          color={"#212121"}
          size={"16px"}
          weight={500}
          h={"25.6px"}
        />
      </Flex>
    </Flex>
  );
};

export default Stats;
