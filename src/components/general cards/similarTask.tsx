"use client";

import { Box, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { IconArrowRight } from "@tabler/icons-react";
import React, { useState } from "react";
import CustomText from "../fonts/text";

const SimilarTask = ({ title, desc, icon, onClick }: any) => {
  const [isLessThan390] = useMediaQuery(`(max-width: 390px)`);
  const [hover, setHover] = useState(false);

  return (
    <Flex
      width={{ base: isLessThan390 ? "100%" : "173px", md: "276px" }}
      p={{ base: isLessThan390 ? "16px 32px" : "16px", md: "24px" }}
      maxHeight={{ base: "198px", md: "239px" }}
      direction={"column"}
      alignItems={"flex-start"}
      gap={{ base: "20px", md: "32px" }}
      borderRadius={"16px"}
      border={"1px solid"}
      bg="#fff"
      borderColor={hover ? "#212121" : "#ECECEC"}
      _hover={{ bg: hover ? "#212121" : "#FFF" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      cursor={"pointer"}
      onClick={onClick}
    >
      <Image src={icon} boxSize={{ base: "40px", md: "48px" }} alt="icon" />

      <Flex gap={"8px"} direction={"column"} width={"100%"}>
        <CustomText
          text={title ? title : "Banner Template Design"}
          size={{ base: "18px", md: "20px" }}
          weight={600}
          color={hover ? "#FFF" : "#212121"}
          overflow={"hidden"}
          h={{ base: "21px", md: "20px" }}
          wrap={"nowrap"}
          whiteSpace={"nowrap"}
          textOverflow={"ellipsis"}
        />

        <CustomText
          text={desc ? desc : " "}
          size={{ base: "12px", md: "12px" }}
          weight={400}
          color={hover ? "#FFF" : "#666"}
          h={"19px"}
          wrap={"nowrap"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          noOfLines={2}
        />
      </Flex>

      <Flex gap={{ md: "12px " }}>
        <CustomText
          text={`View Task`}
          size={{ base: "12px", md: "16px" }}
          h={{ base: "19px", md: "25.6px" }}
          weight={600}
          color={hover ? "#FFF" : "#212121"}
        />
        <IconArrowRight size={"24px"} color={hover ? "#FFF" : "#212121"} />
      </Flex>
    </Flex>
  );
};

export default SimilarTask;
