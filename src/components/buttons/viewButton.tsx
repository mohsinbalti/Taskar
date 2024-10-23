import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import CustomText from "../fonts/text";

const ViewButton = () => {
  return (
    <Flex
      p={"12px 80px"}
      borderRadius={"80px"}
      border={"1px solid #212121"}
      width={"223px"}
      height={"50px"}
      alignSelf={"center"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <CustomText
        text={"View All"}
        color={" #212121"}
        weight={500}
        height={"25.6px"}
      />
    </Flex>
  );
};

export default ViewButton;
