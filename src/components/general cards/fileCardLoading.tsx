"use client";
import {
  Flex,
  Image,
  Skeleton,
  SkeletonText,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CustomText from "../fonts/text";
import { useRouter } from "next/navigation";

//importing logo
const icoFigma = "/logo/taskLogo/figma.svg";

const FileCardLoading = () => {
  const [isLessThan390] = useMediaQuery(`(max-width: 390px)`); //for less than 390 size changes
  return (
    <Flex
      p={isLessThan390 ? "9px" : { base: "12px", md: "16px" }}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      gap={"16px"}
      borderRadius={"8px"}
      bg={"#F6F6F6"}
      width={isLessThan390 ? "142px" : { base: "173px", md: "257px" }}
    >
      <Flex
        borderRadius={"6.4px"}
        bg={"#FFF"}
        width={"32px"}
        height={"32px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Skeleton boxSize={{ base: "20px", md: "20px" }} />
      </Flex>

      <Flex direction={"column"} gap={"4px"}>
        <SkeletonText noOfLines={1} w="120px" />
        <SkeletonText noOfLines={1} w="50px" />
      </Flex>

      <Skeleton h={{ base: "24px", md: "38px" }} w="100%" borderRadius="80px" />
    </Flex>
  );
};

export default FileCardLoading;
