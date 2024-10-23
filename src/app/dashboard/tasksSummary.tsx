import React from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";
import CustomText from "@/components/fonts/text";
import { MultiColorProgressBar } from "@/components/progressBar";
const TasksSummary = ({ userData }: any) => {
  // console.log("🚀 ~ TasksSummary ~ userData:", userData)
  const segments: any =
    userData && userData.tasksSummaryName
      ? userData?.tasksSummaryName?.map((task: any) => ({
          name: task?.categoryName,
          value: userData?.tasksSummery?.[task?.categoryName],
          color: task?.textColorCode,
        }))
      : [];

  // const segmentWidth = 100 / userData.interests.length;
  return (
    <Stack
      p={{ base: "16px", md: "24px" }}
      borderRadius={"16px"}
      border="1px solid #ECECEC"
      gap="24px"
      flexGrow={1}
      bg="#fff"
    >
      <CustomText text="Tasks Summary" size="20px" weight="600" h="120%" />
      <Flex gap="4px" align={"baseline"} wrap={{ base: "wrap" }}>
        <CustomText
          text={userData?.totalSubmissions || 0}
          size={{ base: "38px", md: "72px" }}
          weight="600"
          h="100%"
        />
        <CustomText
          text="Total Tasks Completed"
          color="#666"
          size={{ base: "16px", md: "20px" }}
          h={{ base: "100%", md: "32px" }}
        />
      </Flex>
      <MultiColorProgressBar segments={segments} userData={userData} />
    </Stack>
  );
};

export default TasksSummary;
