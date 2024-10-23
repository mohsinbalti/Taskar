import CustomText from "@/components/fonts/text";
import { Box, Flex, Image, Input, useMediaQuery } from "@chakra-ui/react";
import { IconX } from "@tabler/icons-react";
import React from "react";
import Tabs from "./tabs";
//importing tabsicon
const selected = "/icons/tabSelected.svg";
const figmaBlack = "/logo/taskLogo/figma-black.svg";
const Payment = ({ toggle, next }: any) => {
  return (
    <Flex
      p={{ base: "32px 16px", md: "32px" }}
      direction={"column"}
      gap={"24px"}
      bg={"#FFF"}
      border={"1px solid  #ECECEC"}
      borderRadius={"16px"}
      maxWidth={"644px"}
      width={"100%"}
      position={"relative"}
    >
      {/* close icon */}
      <Box
        position={"absolute"}
        boxSize={"24px"}
        top={{ base: "12px", md: "24px" }}
        right={{ base: "12px", md: "24px" }}
        cursor={"pointer"}
        onClick={toggle}
      >
        <IconX size={"24px"} color="#212121" />
      </Box>

      {/* row 1 tabs  */}
      <Flex
        justifyContent={"center"}
        alignItems={"center"}
        height={"46px"}
        width={"100%"}
        display={{ base: "none", md: "flex" }}
      >
        <Tabs text={"Card Details"} isSelected />
        <Tabs text={"Transaction Details"} right />
      </Flex>

      {/* row 2 */}
      <Flex
        direction={"column"}
        alignItems={"start"}
        gap={"12px"}
        pb={"24px"}
        borderBottom={"1px solid #ECECEC"}
      >
        <CustomText
          text={"Enter Payment Details"}
          color={"#212121"}
          size={{ base: "18px", md: "24px" }}
          h={{ base: "21.6px", md: "28.8px" }}
          weight={600}
        />

        <CustomText
          text={"Enter your card payment details to proceed transaction."}
          color={"#666666"}
          size={{ base: "14px", md: "16px" }}
          h={{ base: "22.4px", md: "25.6px" }}
        />
      </Flex>

      {/* row 3 */}
      <Flex
        borderRadius={"12px"}
        bg={"#F6F6F6"}
        width={"100%"}
        p={"12px"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Flex gap={"12px"}>
          <Image
            src={figmaBlack}
            alt="logo"
            width={{ base: "40px", md: "50px" }}
            height={{ base: "40px", md: "50px" }}
          />

          <Flex
            direction={"column"}
            gap={"12px"}
            alignItems={"flex-start"}
            maxWidth={{ base: "190px", md: "275px" }}
          >
            <CustomText
              text={"Web Dashboard Designing"}
              size={{ base: "14px", md: "20px" }}
              weight={600}
              color={" #212121"}
              h={"normal"}
            />

            <CustomText
              text={" "}
              size={{ base: "12px", md: "12px" }}
              weight={400}
              color={"#666"}
              h={"19px"}
              wrap={"nowrap"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              noOfLines={1}
            />
          </Flex>
        </Flex>

        <CustomText
          text={"$4 "}
          size={{ base: "14px", md: "16px" }}
          weight={600}
          color={" #212121"}
          h={"19.2px"}
        />
      </Flex>

      {/* row 4 inputs for data */}
      <Flex
        direction={"column"}
        alignItems={"flex-start"}
        gap={"16px"}
        width={"100%"}
      >
        <Input
          placeholder="Card Number"
          textColor={"#212121"}
          fontSize={"16px"}
          fontWeight={"400"}
          _placeholder={{
            color: "#212121",
            fontsize: { base: "14", md: "16px" },
          }}
        />
        <Flex width={"100%"} gap={"16px"}>
          <Input
            // type="date"
            placeholder="Expiry Date"
            textColor={"#212121"}
            fontSize={"16px"}
            fontWeight={"400"}
            _placeholder={{
              color: "#212121",
              fontsize: { base: "14", md: "16px" },
            }}
          />
          <Input
            placeholder="CVV"
            textColor={"#212121"}
            fontSize={"16px"}
            fontWeight={"400"}
            _placeholder={{
              color: "#212121",
              fontsize: { base: "14", md: "16px" },
            }}
          />
        </Flex>
      </Flex>

      {/* row 5 term and condtion */}

      {/* row 6 Buttons */}
      <Flex gap={"12px"} width={"100%"}>
        <Flex
          p={{ base: "8px 40px", md: "14px 56px" }}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"30px"}
          border={"1px solid #212121"}
          width={"100%"}
          cursor={"pointer"}
          onClick={toggle}
        >
          <CustomText
            text={"Cancel"}
            size={{ base: "16px", md: "18px" }}
            weight={600}
            color={" #212121"}
            h={"28.8px"}
          />
        </Flex>

        <Flex
          p={{ base: "8px 40px", md: "14px 56px" }}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"30px"}
          bg={" #212121"}
          width={"100%"}
          cursor={"pointer"}
          onClick={next}
        >
          <CustomText
            text={"Next"}
            size={{ base: "16px", md: "18px" }}
            weight={600}
            color={" #FFFFFF"}
            h={"28.8px"}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Payment;
