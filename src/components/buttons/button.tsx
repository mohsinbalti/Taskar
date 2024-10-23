import React from "react";
import { Button } from "@chakra-ui/react";
import CustomText from "../fonts/text";

export const TransparentButton = ({
  icon,
  btnText,
  h,
  fontSize,
  fontWeight,
  w,
  mtText,
  onClick,
  isDisabled,
  isLoading,
}: any) => {
  return (
    <Button
      bg={"transparent"}
      _hover={{}}
      _active={{}}
      gap={{ base: "8px", md: "16px" }}
      h={h || "48px"}
      border="1px solid #212121"
      borderRadius={"40px"}
      alignItems={"center"}
      w={w}
      onClick={onClick}
      isDisabled={isDisabled}
      isLoading={isLoading}
    >
      {icon}
      <CustomText
        text={btnText}
        size={fontSize || { base: "14px", md: "18px" }}
        weight={fontWeight || "600"}
        mt={mtText || "5px"}
      />
    </Button>
  );
};

export const InterestButton = ({ icon, btnText, bg, onClick, color }: any) => {
  return (
    <Button
      bg={bg || "transparent"}
      _hover={{ border: "1px solid #212121" }}
      _active={{}}
      gap={{ base: "6px", md: "10px" }}
      h={{ base: "38px", md: "48px" }}
      border={"1px solid #ECECEC"}
      borderRadius={"10px"}
      alignItems={"center"}
      px={{ base: "4px", md: "12px" }}
      onClick={onClick}
    >
      {icon}
      <CustomText
        text={btnText}
        size={{ base: "12px", md: "17px" }}
        weight={"500"}
        mt="0px"
        color={color || "#212121"}
      />
    </Button>
  );
};

export const BlackButton = ({
  icon,
  btnText,
  disabled,
  isLoading,
  bg,
  h,
  w,
  maxW,
  minW,
  color,
  fontSize,
  borderRadius,
  onClick,
  flexDirection,
  weight,
  gap,
}: any) => {
  return (
    <Button
      bg={bg || "black"}
      _hover={{}}
      _active={{}}
      gap={gap || "16px"}
      fontSize={fontSize}
      fontWeight={weight}
      h={h || "48px"}
      borderRadius={borderRadius}
      alignItems={"center"}
      w={w || "100%"}
      maxW={maxW || "100%"}
      minW={minW || "auto"}
      isDisabled={disabled}
      _disabled={{ opacity: 1, cursor: "not-allowed", bg: "#CFCFCF" }}
      onClick={onClick}
      flexDirection={flexDirection}
      isLoading={isLoading}
      type="submit"
      p="0"
    >
      {icon}
      <CustomText
        text={btnText}
        size={fontSize || "18px"}
        weight={"500"}
        color={color || "white"}
        mb="0"
        pb="0"
      />
    </Button>
  );
};
