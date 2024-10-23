"use client";
import CustomText from "@/components/fonts/text";
import {
  Collapse,
  Flex,
  Image,
  SkeletonText,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";

//importing logo
const icoBullet = "/icons/tickBullet.svg";

const DetailInfo = ({ title, info, isLoading }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLessThan678] = useMediaQuery(`(max-width: 678px)`); //for collapse

  return (
    <Flex
      direction={"column"}
      alignItems={"flex-start"}
      gap={"16px"}
      pt={isLessThan678 ? "24px" : "0px"}
      borderTop={isLessThan678 ? "1px solid #ECECEC" : undefined}
    >
      <Flex
        width={"100%"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <CustomText
          text={title ? title : "Deliverables"}
          color={"#212121"}
          size={{ base: "18px", md: "32px" }}
          weight={600}
          height={{ base: "27px", md: "38.4px" }}
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <Flex gap={"8px"} direction={"column"}>
          {isLoading
            ? new Array(3).fill(1)?.map((_, idx) => (
                <Flex gap={"8px"} key={idx * 400} alignItems={"center"}>
                  <Image
                    key={idx * 5}
                    alt="point"
                    src={icoBullet}
                    boxSize={"20px"}
                  />
                  <SkeletonText
                    noOfLines={1}
                    w={{ base: "150px", md: "320px" }}
                  />
                </Flex>
              ))
            : info?.map((data: any, idx: number) => (
                <Flex gap={"8px"} key={idx * 400} alignItems={"start"}>
                  <Image
                    key={idx * 5}
                    alt="point"
                    src={icoBullet}
                    boxSize={"20px"}
                  />

                  <CustomText
                    key={idx}
                    text={data}
                    color={"#666"}
                    size={{ base: "14px", md: "16px" }}
                    height={{ base: "19px", md: "25.6px" }}
                    weight={400}
                  />
                </Flex>
              ))}
        </Flex>
      </Collapse>
    </Flex>
  );
};

export default DetailInfo;
