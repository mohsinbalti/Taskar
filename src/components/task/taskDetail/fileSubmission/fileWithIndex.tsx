import CustomText from "@/components/fonts/text";
import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import File from "./file";

const FileWithIndex = ({ name, size, time, index }: any) => {
  return (
    <Flex
      gap={{ base: "14px", md: "40px" }}
      width={"100%"}
      maxHeight={"113px"}
      height={"100%"}
    >
      {/* side numbering 1,2 etc */}
      <Flex
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"100%"}
      >
        <Box
          borderLeft="3px dashed"
          borderLeftColor="#ECECEC"
          height={"40px"}
        />
        <Flex
          borderRadius={{ base: "28px", md: "32px" }}
          border={"3px solid #212121"}
          width={{ base: "28px", md: "32px" }}
          height={{ base: "28px", md: "32px" }}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CustomText
            text={index ? parseInt(index) : "1"}
            color={"#212121"}
            size={"16px"}
            weight={600}
            align="center"
          />
        </Flex>
        <Box
          borderLeft="3px dashed"
          borderLeftColor="#ECECEC"
          height={"40px"}
        />
      </Flex>
      {/* file desing */}

      <Box mb={"8px"} width={"100%"}>
        <File key={index} name={name} size={size} time={time} />
      </Box>
    </Flex>
  );
};

export default FileWithIndex;
