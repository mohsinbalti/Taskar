"use client";
import CustomText from "@/components/fonts/text";
import {
  Box,
  Flex,
  Progress,
  SkeletonText,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";
import Deadline from "./deadline";
import Result from "./result";
import { formatDateYear } from "@/components/date-format/RemainingDays";

const AboutProject = ({ task, before, winnerData, isLoading }: any) => {
  const currentDate = new Date();
  const lastDate = new Date(task?.deadline);

  const [isLessThan365] = useMediaQuery(`(max-width: 365px)`); //for less than 390 size changes
  return (
    <Flex
      maxWidth={"408px"}
      //maxWidth={"360px"}
      width={"100%"}
      direction={"column"}
      gap={"24px"}
    >
      <CustomText
        text={` About this Task`}
        size={{ base: "18px", md: "32px" }}
        h={{ base: "27px", md: "38.4px" }}
        weight={600}
        color={"#212121"}
      />

      {/* row 1 */}
      <Flex
        bg={"#F6F6F6"}
        borderRadius={"12PX"}
        p={"12px"}
        justifyContent={{ base: "center", md: "space-between" }}
        maxWidth={"408px"}
        width={{ base: "100%", md: "100vh" }}
        alignItems={"center"}
        display={{ base: "none", md: "flex" }}
      >
        {/* in case of md */}
        <Flex direction={"column"} gap={"2px"} alignItems={"flex-start"}>
          <CustomText
            text={"Task Reward"}
            color={"#666"}
            size={"14px"}
            h={"21px"}
          />
          {isLoading ? (
            <SkeletonText noOfLines={1} w="120px" mt="20px" h="22px" />
          ) : (
            <CustomText
              text={
                task?.reward
                  ? `$${Number(task?.reward || 0)?.toLocaleString(undefined, {
                      maximumFractionDigits: 4,
                    })}`
                  : "$0"
              }
              color={"#212121"}
              size={"28px"}
              h={"42px"}
              weight={700}
            />
          )}
        </Flex>

        <Flex direction={"column"} gap={"2px"} alignItems={"flex-end"}>
          <CustomText
            text={"Total Submissions"}
            color={"#666"}
            size={"14px"}
            h={"21px"}
          />
          {isLoading ? (
            <SkeletonText noOfLines={1} w="120px" mt="20px" h="22px" />
          ) : (
            <CustomText
              text={task?.submissions ? task?.submissions : "0"}
              color={"#212121"}
              size={"28px"}
              h={"42px"}
              weight={700}
            />
          )}
        </Flex>
      </Flex>
      {/* row 2 and 3 */}
      <Flex
        direction={"column"}
        gap={"16px"}
        px={{ base: "0px", md: "12px" }}
        mt={"-4px"}
        pb={"31px"}
        mb={"8px"}
        borderBottom={"1px solid #ECECEC"}
      >
        {/* row 2  */}
        <Flex
          justifyContent={"space-between"}
          maxWidth={"408px"}
          width={"100%"}
          // width={"100vh"}
          alignItems={"center"}
        >
          <Flex direction={"column"} gap={"6px"} alignItems={"flex-start"}>
            <CustomText
              text={"Task Posted on"}
              color={"#666"}
              size={isLessThan365 ? "12px" : "14px"}
              h={"21px"}
            />
            {isLoading ? (
              <SkeletonText noOfLines={1} w="120px" mt="10px" h="14px" />
            ) : (
              <CustomText
                text={
                  task?.publishedDate
                    ? `${formatDateYear(task?.publishedDate)} `
                    : ""
                }
                color={"#212121"}
                size={isLessThan365 ? "14px" : "16px"}
                h={"24px"}
                weight={600}
              />
            )}
          </Flex>

          <Flex direction={"column"} gap={"6px"} alignItems={"flex-end"}>
            <CustomText
              text={"Submission Before"}
              color={"#666"}
              size={isLessThan365 ? "12px" : "14px"}
              h={"21px"}
            />
            {isLoading ? (
              <SkeletonText noOfLines={1} w="120px" mt="10px" h="14px" />
            ) : (
              <CustomText
                text={
                  task?.deadline ? `${formatDateYear(task?.deadline)} ` : ""
                }
                color={"#212121"}
                size={isLessThan365 ? "14px" : "16px"}
                h={"24px"}
                weight={600}
              />
            )}
          </Flex>
        </Flex>
        {/* row 3  */}
        <Flex
          justifyContent={"space-between"}
          maxWidth={"408px"}
          width={"100%"}
          // width={"100vh"}
          alignItems={"center"}
        >
          <Flex direction={"column"} gap={"6px"} alignItems={"flex-start"}>
            <CustomText
              text={"Participation Fee"}
              color={"#666"}
              size={isLessThan365 ? "12px" : "14px"}
              h={"21px"}
            />
            {isLoading ? (
              <SkeletonText noOfLines={1} w="120px" mt="10px" h="14px" />
            ) : (
              <CustomText
                text={task?.fee ? `$${task?.fee}` : "$4  "}
                color={"#212121"}
                size={isLessThan365 ? "14px" : "16px"}
                h={"24px"}
                weight={600}
              />
            )}
          </Flex>

          <Flex direction={"column"} gap={"6px"} alignItems={"flex-end"}>
            <CustomText
              text={"Total Participants"}
              color={"#666"}
              size={isLessThan365 ? "12px" : "14px"}
              h={"21px"}
            />
            {isLoading ? (
              <SkeletonText noOfLines={1} w="120px" mt="10px" h="14px" />
            ) : (
              <CustomText
                text={
                  task?.participants
                    ? Number(task?.participants || 0) < 5
                      ? "Less Than 5"
                      : task?.participants
                    : "0"
                }
                color={"#212121"}
                size={isLessThan365 ? "14px" : "16px"}
                h={"24px"}
                weight={600}
              />
            )}
          </Flex>
        </Flex>
      </Flex>

      {/* there are 2 type of components for MD  */}
      {/* before and during task it will be showing DEADLING */}
      {/* after task it should be show Result */}
      <Box display={{ base: "none", md: "block" }}>
        {winnerData?.length > 0 && currentDate > lastDate && (
          <>
            <Flex width={"100%"} direction={"column"} gap={"24px"}>
              <CustomText
                text={`Result`}
                size={{ base: "18px", md: "32px" }}
                h={{ base: "27px", md: "38.4px" }}
                weight={600}
                color={"#212121"}
              />

              {task?.participation && <Result winner={task} />}
            </Flex>
          </>
        )}
        {winnerData?.length <= 0 && <Deadline deadline={task?.deadline} />}
      </Box>
      {/* {before && <Deadline deadline={deadline} />} */}
    </Flex>
  );
};

export default AboutProject;
