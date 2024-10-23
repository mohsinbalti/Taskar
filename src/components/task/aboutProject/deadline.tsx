"use client";

import { calculateTimeLeft } from "@/components/date-format/RemainingDays";
import CustomText from "@/components/fonts/text";
import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";

const Deadline = (deadline: any) => {
  const [deadlineTime, setDeadlineTime] = useState(deadline);

  // Update the deadline time whenever the 'deadline' prop changes
  useEffect(() => {
    setDeadlineTime(deadline?.deadline);
  }, [deadline]);
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      return <span>Deadline reached!</span>;
    } else {
      const units = ["days", "hours", "minutes", "seconds"];
      return (
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex justifyContent={"space-between"} alignItems={"center"} w="100%">
            {[days, hours, minutes, seconds]?.map((value, index) => (
              <React.Fragment key={index}>
                <Flex
                  borderRadius={"6px"}
                  bg={"#FFF"}
                  boxShadow={"0px 2.607px 9.776px 0px rgba(0, 0, 0, 0.15)"}
                  p={"8px 12px"}
                  h={{ base: "60px", md: "78px" }}
                  w={{ base: "60px", md: "78px" }}
                  direction={"column"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  gap={"8px"}
                >
                  <CustomText
                    text={units[index]}
                    color={"#212121"}
                    size={"9.125px"}
                    h={"normal"}
                  />
                  <CustomText
                    text={value?.toString().padStart(2, "0")}
                    color={"#212121"}
                    size={{ base: "32px", md: "44px" }}
                    h={"normal"}
                    weight={700}
                  />
                </Flex>
                {index < 3 && (
                  <CustomText
                    key={index * 5}
                    text={":"}
                    color={"#212121"}
                    size={{ base: "32px", md: "44px" }}
                    h={"normal"}
                    weight={700}
                  />
                )}
              </React.Fragment>
            ))}
          </Flex>
        </Flex>
      );
    }
  };

  return (
    <Flex width={"100%"} direction={"column"} gap={"24px"}>
      <CustomText
        text={`Deadline`}
        size={{ base: "18px", md: "32px" }}
        h={{ base: "27px", md: "38.4px" }}
        weight={600}
        color={"#212121"}
      />
      <Countdown date={deadlineTime} renderer={renderer} />

      {/* <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          {Object.entries(timeLeft).map(([unit, value], index) => (
            <>
              <Flex
                key={index}
                borderRadius={"6px"}
                bg={"#FFF"}
                boxShadow={" 0px 2.607px 9.776px 0px rgba(0, 0, 0, 0.15)"}
                p={isLessThan365 ? "4px 8px" : "8px 12px"}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"8px"}
              >
                <CustomText
                  text={unit}
                  color={"#212121"}
                  size={"9.125px"}
                  h={"normal"}
                />

                <CustomText
                  text={value.toString().padStart(2, "0")}
                  color={"#212121"}
                  size={isLessThan365 ? "40px" : "44px"}
                  h={"normal"}
                  weight={700}
                />
              </Flex>

              {index < Object.keys(timeLeft).length - 1 && (
                <CustomText
                  key={index * 5}
                  text={":"}
                  color={"#212121"}
                  size={isLessThan365 ? "32px" : "44px"}
                  h={"normal"}
                  weight={700}
                />
              )}
            </>
          ))}
        </Flex>
      </Flex> */}
    </Flex>
  );
};

export default Deadline;
