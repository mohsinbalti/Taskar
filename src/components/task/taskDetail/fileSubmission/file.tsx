import CustomText from "@/components/fonts/text";
import { Box, Divider, Flex, Image } from "@chakra-ui/react";
import React from "react";

//importing icon
const icoDoc = "/logo/taskLogo/doc.svg";
const File = ({ name, size, time }: any) => {
  return (
    <Flex
      p={{ base: "8px", md: "16px" }}
      width={"100%"}
      height={"100%"}
      borderRadius={"12px"}
      border={"1px solid #ECECEC"}
      bg={"#FFF"}
      boxShadow={" 0px 0px 10px 0px rgba(0, 0, 0, 0.03)"}
    >
      <Flex
        p={{ base: "8px", md: "16px" }}
        justifyContent={"space-between"}
        alignItems={"center"}
        borderRadius={"8px"}
        bg={"#F6F6F6"}
        width={"100%"}
      >
        {/* file icon name and size */}
        <Flex alignItems={"center"} gap={"16px"}>
          {/* icon */}
          <Flex
            width={"32px"}
            height={"32px"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={"6.4px"}
            bg={"#FFF"}
          >
            <Image src={icoDoc} alt="File-Logo" sizes="20px" />
          </Flex>
          {/* name and size */}
          <Flex direction={"column"} gap={"11px"}>
            <CustomText
              text={name ? name : "Challenge Submission.zip"}
              color={"#212121"}
              size={{ base: "12px", md: "14px" }}
              weight={600}
              h={"20px"}
            />

            <CustomText
              text={size ? size : "245 KB"}
              color={"#212121"}
              size={"12px"}
              weight={400}
              h={"16px"}
            />
          </Flex>
        </Flex>
        {/* time */}
        <CustomText
          text={time ? time : "2 days ago"}
          color={" #666"}
          size={"12px"}
          weight={400}
          h={"16px"}
        />
      </Flex>
    </Flex>
  );
};

export default File;
