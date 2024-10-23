"use client";

import { Flex, Skeleton, SkeletonText, useMediaQuery } from "@chakra-ui/react";
import React from "react";

const CategoryCardLoading = () => {
  const [isLessThan390] = useMediaQuery(`(max-width: 529px)`);

  return (
    <Flex
      width={{ base: isLessThan390 ? "100%" : "240px", md: "304px" }}
      height={{ base: "158px", md: "206px" }}
      p={{ base: isLessThan390 ? "16px 32px" : "16px", md: "32px" }}
      display="flex"
      flexDirection={"column"}
      alignItems={"flex-start"}
      justifyContent={{ base: "space-between" }}
      gap={{ md: "32px" }}
      borderRadius={"16px"}
      bg="#fff"
    >
      <Skeleton boxSize={{ base: "40px", md: "48px" }} borderRadius="8px" />

      <Flex
        width={"100%"}
        gap={{ base: "8px", md: "12px" }}
        direction={"column"}
      >
        <SkeletonText noOfLines={1} w="140px" h="12px" />

        <SkeletonText noOfLines={1} w="80px" h="6px" />
      </Flex>
    </Flex>
  );
};

export default CategoryCardLoading;
