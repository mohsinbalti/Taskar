"use client";
import { Flex, Skeleton, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import CustomText from "../fonts/text";
import { useRouter } from "next/navigation";

const Tags = ({ title, tags, isColored, isLoading }: any) => {
  const router = useRouter();
  const [isLessThan390] = useMediaQuery(`(max-width: 390px)`); //for less than 390 size changes

  //colors for text and background random
  const colors = ["#26A4FF", "#56CDAD", "#FF7B42", "#4640DE", "#E69C0B"];
  const categories = ["Flutter Development", "Designing"];
  const data = tags ? tags : categories;
  return (
    <Flex direction={"column"} gap={{ base: "16px", md: "24px" }}>
      <CustomText
        text={title ? title : `Required Skills`}
        size={{ base: "18px", md: "16px" }}
        h={{ base: "21.6px", md: "19.2px" }}
        weight={600}
        color={"#212121"}
      />
      <Flex
        alignItems={"flex-start"}
        alignContent={"flex-start"}
        gap={"12px 14px"}
        flexWrap={"wrap"}
        width={isLessThan390 ? "290px" : { base: "358px", md: "100%" }}
        maxWidth={"384px"}
      >
        {isLoading
          ? new Array(3)
              ?.fill(1)
              ?.map((_, idx) => (
                <Skeleton h="20px" borderRadius="20px" w="120px" key={idx} />
              ))
          : data?.map((tag: any, index: number) => (
              <Flex
                p={{ base: "4px 12px", md: "4px 12px" }}
                justifyContent={"center"}
                alignItems={"center"}
                bg={isColored ? `${colors[index]}1A` : "#F6F6F6"}
                borderRadius={"20px"}
                key={index}
                cursor={"pointer"}
                onClick={
                  isColored
                    ? () => router.push(`/?category=${tag}`)
                    : () => console.log("sd")
                }
              >
                <CustomText
                  text={tag}
                  size={{ base: "12px", md: "14px" }}
                  h={{ base: "19.2px", md: "22.4px" }}
                  weight={500}
                  color={isColored ? colors[index] : "#212121"}
                />
              </Flex>
            ))}
      </Flex>
    </Flex>
  );
};

export default Tags;
