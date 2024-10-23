"use client";

import { Box, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import { IconArrowRight, IconSpeakerphone } from "@tabler/icons-react";
import React, { useState } from "react";
import CustomText from "../fonts/text";
import { clashDisplay, epilogue400 } from "../fonts/fonts";

const CategoryCard = ({
  title,
  count,
  iconLight,
  iconDark,
  isClashDisplay,
  onClick,
}: any) => {
  const [isLessThan390] = useMediaQuery(`(max-width: 529px)`);
  const [hover, setHover] = useState(false);

  return (
    <Flex
      width={{ base: isLessThan390 ? "100%" : "240px", md: "304px" }}
      height={{ base: "158px", md: "100%" }}
      p={{ base: isLessThan390 ? "16px 32px" : "16px", md: "32px" }}
      direction={"column"}
      alignItems={"flex-start"}
      justifyContent={{ base: "space-between" }}
      gap={{ md: "32px" }}
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
      {hover ? (
        <Image
          src={iconDark}
          boxSize={{ base: "40px", md: "48px" }}
          alt="icon"
        />
      ) : (
        <Image
          src={iconLight}
          boxSize={{ base: "40px", md: "48px" }}
          alt="icon"
        />
      )}

      <Flex
        width={"100%"}
        gap={{ base: "8px", md: "12px" }}
        direction={"column"}
      >
        <CustomText
          text={
            isClashDisplay ? (
              <span className={clashDisplay?.className}>{title}</span>
            ) : (
              title
            )
          }
          size={{ base: "18px", md: "20px" }}
          weight={600}
          color={hover ? "#FFF" : "#212121"}
        />

        <Flex
          width={"100%"}
          gap={{ md: "16px " }}
          justifyContent={isLessThan390 ? "space-between" : undefined}
        >
          <CustomText
            text={
              isClashDisplay ? (
                <span
                  className={epilogue400?.className}
                >{`${count} tasks available`}</span>
              ) : (
                `${count} tasks available`
              )
            }
            size={{ base: "12px", md: "16px" }}
            height={{ base: "19px", md: "25.6px" }}
            color={hover ? "#FFF" : "#666"}
          />
          <IconArrowRight size={"24px"} color={hover ? "#FFF" : "#212121"} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CategoryCard;
