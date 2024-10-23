import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import CustomText from "../fonts/text";

const CustomOption = ({ text, isHovered }: any) => {
  return (
    <Flex align="center">
      <Flex
        borderRadius="4px"
        bg={"#F6F6F6"}
        mr={2}
        width="24px"
        height="24px"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box width="12px" height={"12px"} bg={isHovered ? "#212121" : "#FFF"} />
      </Flex>
      <span>{text}</span>
    </Flex>
  );
};

export default CustomOption;
