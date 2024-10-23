"use client";
import { Box, Stack, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Header from "./header";
import AboutMe from "./aboutMe";
import Stats from "./stats";
import TasksSummary from "./tasksSummary";
import TasksWon from "./tasksWon";
import Participations from "./participations";
import Skills from "./skills";
import { useGetLoggedInUser } from "@/utils/auth.api";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardLayout from "../layouts/DashboardLayout";

const Profile = () => {
  const { data: userData, isLoading } = useGetLoggedInUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("edit");

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  useEffect(() => {
    console.log("queryParam", queryParam);
    if (queryParam === "true") {
      onEditOpen();
    } else {
      onEditClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParam]);

  return (
    <DashboardLayout>
      <Stack
        pb="32px"
        px={{ base: "16px", md: "30px" }}
        maxW="1440px"
        mx="auto"
        gap="24px"
      >
        <Header userData={userData} isLoading={isLoading} />
        <AboutMe
          userData={userData}
          isLoading={isLoading}
          isOpen={isEditOpen}
          onOpen={onEditOpen}
          onClose={() => {
            if (queryParam === "true") {
              router.push("/profile");
            }
            onEditClose();
          }}
        />
        <Stats userData={userData} isLoading={isLoading} />
        <TasksSummary userData={userData} />
        <TasksWon />
        <Participations />
        <Skills userData={userData} onOpen={onEditOpen} isLoading={isLoading} />
      </Stack>
    </DashboardLayout>
  );
};

export default Profile;
