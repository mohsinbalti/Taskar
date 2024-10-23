"use client";
import { Flex, Skeleton, SkeletonText, useMediaQuery } from "@chakra-ui/react";
import React from "react";

const TaskCardLoading = () => {
  const [isLessThan380] = useMediaQuery(`(max-width: 380px)`); //for project type text size

  return (
    <Flex
      maxWidth={"981px"}
      width={"100%"}
      p={{ base: "16px", md: "24px 24px 24px 24px" }}
      direction={"column"}
      alignItems={"flex-start"}
      gap={"16px"}
      borderRadius={"12px"}
      border={"1px solid #ECECEC "}
      background={"#FFF"}
      boxShadow={"0px 0px 10px 0px rgba(0, 0, 0, 0.03)"}
      cursor={"pointer"}
    >
      {/* logo and task title, type and description */}
      <Flex
        alignItems={"flex-start"}
        gap={{ base: "8px", md: "16px" }}
        width={"100%"}
      >
        <Skeleton
          height={{ base: "40px", md: "62px" }}
          width={{ base: "40px", md: "72px" }}
          borderRadius="8px"
        />

        <Flex direction={"column"} gap={"12px"} width={"100%"}>
          {/* project Type, Title and rewards */}
          <Flex justifyContent={"space-between"}>
            {/* TYPE and Title*/}
            <Flex direction={"column"} alignItems={"flex-start"} gap={"8px"}>
              <Flex>
                {new Array(2)?.fill(1)?.map((_, idx) => (
                  <Skeleton
                    p="6px 10px"
                    display={{
                      base: "none",
                      md: "block",
                    }}
                    borderRadius="80px"
                    me="3px"
                    key={idx}
                  >
                    <SkeletonText noOfLines={1} w="50px" h="12px" />
                  </Skeleton>
                ))}
              </Flex>

              <SkeletonText
                noOfLines={{ base: 2, md: 1 }}
                w={{ base: "100%", md: "300px" }}
              />

              {/* title and reward in base screen */}
              <Flex
                gap={isLessThan380 ? "5px" : "8px"}
                wrap="wrap"
                display={{ base: "flex", md: "none" }}
              >
                {new Array(2)?.fill(1)?.map((_, idx) => (
                  <Skeleton p="4px 12px" borderRadius="80px" me="3px" key={idx}>
                    <SkeletonText
                      noOfLines={1}
                      w="50px"
                      h={{ base: "6px", md: "12px" }}
                    />
                  </Skeleton>
                ))}
                <Skeleton p="4px 12px">
                  <SkeletonText
                    noOfLines={1}
                    w="50px"
                    h={{ base: "6px", md: "12px" }}
                  />
                  <SkeletonText
                    noOfLines={1}
                    w="70px"
                    h={{ base: "6px", md: "12px" }}
                  />
                </Skeleton>
              </Flex>
            </Flex>
            {/* reward  in md screen*/}
            <Skeleton
              display={{ base: "none", md: "block" }}
              p="12px"
              borderRadius="6px"
              border="0.3px solid #E69C0B"
              maxH={"68px"}
            >
              <SkeletonText noOfLines={1} w="50px" h="12px" />
              <SkeletonText noOfLines={1} w="70px" h="12px" />
            </Skeleton>
          </Flex>

          {/* desc */}
          <SkeletonText
            noOfLines={4}
            w="100%"
            ml={{ base: "-41px", md: "0px" }}
          />

          {/* trying to achieve bottom Info  for  MD & Base*/}

          <Flex
            mt={"4px"}
            p={"0px 12px 0px 0px"}
            justifyContent={{ base: "flex-start", md: "space-between" }}
            gap={{ base: "12px 45px", md: "0px" }}
            alignItems={"center"}
            wrap={"wrap"}
            ml={{ base: "-41px", md: "0px" }}
            display={{ base: "none", md: "flex" }}
          >
            {new Array(5).fill(1)?.map((_, idx) => (
              <div key={idx}>
                <SkeletonText noOfLines={1} w="50px" h="12px" />
                <SkeletonText noOfLines={1} w="80px" h="12px" />
              </div>
            ))}
          </Flex>
          {/* For small screen */}
          <Flex
            gap="12px"
            wrap="wrap"
            display={{
              base: "flex",
              md: "none",
            }}
            ml={{ base: "-41px", md: "0px" }}
          >
            {new Array(5).fill(1)?.map((_, idx) => (
              <div key={idx}>
                <SkeletonText noOfLines={1} w="50px" h="12px" />
                <SkeletonText noOfLines={1} w="80px" h="12px" />
              </div>
            ))}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TaskCardLoading;
