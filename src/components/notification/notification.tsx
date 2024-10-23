import {
  border,
  Box,
  Flex,
  Image,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import React from "react";
import CustomText from "../fonts/text";
import moment from "moment";
import { calculateRemainingDays } from "../date-format/RemainingDays";

// figma import
const icoFigma = "/logo/taskLogo/figma-light.svg";

const Notification = ({ borderTop, data, isLoading }: any) => {
  return (
    <Flex
      // marginTop={borderTop ? "8px" : "0px"}
      p={borderTop ? "16px" : "8px"}
      alignItems={"flex-start"}
      gap={"9px"}
      width={"100%"}
      borderTop={borderTop ? "1px solid #ECECEC" : "0px solid "}
    >
      {/* logo */}
      {isLoading ? (
        <Skeleton height="32px" width="32px" borderRadius="6px" />
      ) : (
        <Image
          src={data?.task?.icon || "https://via.placeholder.com/150"}
          boxSize={"32px"}
          alt="icon"
        />
      )}

      {/* details */}
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"start"}
        gap={"12px"}
      >
        {/* title and time */}
        <Flex
          justifyContent={"space-between"}
          width={"218px"}
          // alignItems={"center"}
          flexDir="column"
          gap="4px"
        >
          {isLoading ? (
            <>
              <SkeletonText noOfLines={2} w="120px" />
            </>
          ) : (
            <>
              <CustomText
                text={data?.task?.title || " "}
                color={"#212121"}
                size={"12px"}
                weight={600}
                h={"20px"}
              />

              <CustomText
                text={moment(data?.startedDate)?.fromNow() || "N/A"}
                color={"#666"}
                size={"10.24px"}
                weight={500}
                h={"normal"}
                align={"left"}
              />
            </>
          )}
        </Flex>
        {/* desc */}
        <Flex width={"218px"}>
          {isLoading ? (
            <SkeletonText noOfLines={5} w="100%" />
          ) : (
            <CustomText
              text={
                data?.task?.description?.length > 150
                  ? data?.task?.description?.slice(0, 150) + "..."
                  : data?.task?.description
              }
              color={"#282828"}
              size={"12px"}
              h={"16px"}
            />
          )}
        </Flex>

        {/* time left */}
        <Flex
          alignItems={"center"}
          justifyContent={"center"}
          width={"93px"}
          height={"26px"}
          p={"7px"}
          borderRadius={"22px"}
          bg={"#F6F6F6"}
        >
          {isLoading ? (
            <SkeletonText noOfLines={1} w="80px" h="10px" />
          ) : (
            <CustomText
              text={`${calculateRemainingDays(data?.task?.deadline)} days left`}
              color={"#212121"}
              size={"12px"}
              h={"normal"}
              weight={600}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Notification;
