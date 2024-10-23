"use client";
import { Box, Flex, Stack } from "@chakra-ui/react";
import React from "react";
import TasksSummary from "./tasksSummary";
import DeadlineCard from "./deadlineCard";
import Stats from "./stats";
import ActiveTasks from "./activeTasks";
import DashboardLayout from "../layouts/DashboardLayout";
import { useGetLoggedInUser } from "@/utils/auth.api";
import { useGetUpcomingDeadlines } from "@/utils/task.api";

const Dashboard = () => {
  const { data: userData, isLoading: userLoading } = useGetLoggedInUser();
  const { data: upcomingDeadLine, isLoading: deadlineLoading } =
    useGetUpcomingDeadlines();
  return (
    <DashboardLayout>
      <Stack
        width={"100%"}
        pb="32px"
        px={{ base: "16px", md: "32px" }}
        maxW="1440px"
        mx="auto"
        gap="24px"
      >
        <Flex
          gap={"24px"}
          align={"stretch"}
          direction={{ base: "column", md: "row" }}
        >
          <TasksSummary userData={userData} isLoading={userLoading} />
          {upcomingDeadLine?.length > 0 && (
            <Box>
              <DeadlineCard
                upcomingDeadLine={upcomingDeadLine}
                isLoading={deadlineLoading}
              />
            </Box>
          )}
        </Flex>
        <Stats userData={userData} isLoading={userLoading} />
        <ActiveTasks />
      </Stack>
    </DashboardLayout>
  );
};

export default Dashboard;
