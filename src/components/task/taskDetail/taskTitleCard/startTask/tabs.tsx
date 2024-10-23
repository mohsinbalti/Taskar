import CustomText from "@/components/fonts/text";
import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";

const Tabs = ({ text, isSelected, right, next }: any) => {
  //importing tabsicon
  const selected = "/icons/tabSelected.svg";
  const unSelected = "/icons/tab.svg";
  const checked = "/icons/tabChecked.svg";

  return (
    <Flex
      width={"200px"}
      direction={"column"}
      gap={"12px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Flex
        width={"108px"}
        alignItems={"center"}
        alignSelf={right ? "start" : "end"}
      >
        {!right ? (
          <>
            <Image
              alt="tab"
              src={next ? checked : isSelected ? selected : unSelected}
              sizes="16px"
            />
            <Box
              width="100%"
              border={"1px solid "}
              borderColor={next ? "#212121" : "#CFCFCF"}
            ></Box>
          </>
        ) : (
          <>
            <Box
              width="100%"
              border="1px solid "
              borderColor={next ? "#212121" : "#CFCFCF"}
            ></Box>
            <Image
              alt="tab"
              src={isSelected ? selected : unSelected}
              sizes="16px"
            />
          </>
        )}
      </Flex>
      <CustomText text={text} color={"#212121"} size={"14px"} h={"16px"} />
    </Flex>
  );
};

export default Tabs;
