"use client";
import { background, Box, Flex, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import CustomOption from "./customOption";
import CustomText from "../fonts/text";
import { IconChevronDown } from "@tabler/icons-react";

interface Option {
  value: string;
  label: string;
}

const DropDown = ({
  height,
  options,
  placeholder,
  category,
  setCategory,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  console.log(selectedOption);

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    setCategory(option.value);
  };

  const handleClearCategory = () => {
    setSelectedOption(null);
    setIsOpen(false);
    setCategory(""); // Clear the selected category
  };

  return (
    <Box position="relative" display="inline-block">
      <Flex
        onClick={handleToggleDropdown}
        padding={{ base: "10px 12px", md: "8px 24px" }}
        border={isOpen ? "1px solid #212121" : "1px solid #ECECEC"}
        borderRadius="16px"
        cursor="pointer"
        bg={"#FFF"}
        height={{ base: "48px", md: "60px" }}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"8px"}
        wrap={"nowrap"}
      >
        <CustomText
          color={"#212121"}
          size={"14px"}
          weight={500}
          h={"19px"}
          whiteSpace="nowrap"
          text={
            category
              ? category
              : selectedOption
              ? selectedOption.label
              : placeholder
              ? placeholder
              : "Category"
          }
        />
        <IconChevronDown size={"24px"} />
      </Flex>
      {isOpen && (
        <Box
          position="absolute"
          top="calc(100% + 4px)"
          right={0}
          width="auto"
          minWidth="100%"
          // width="100%"
          border="1px solid #F6F6F6"
          borderRadius="8px"
          marginTop="4px"
          backgroundColor="#fff"
          zIndex={9999}
          p={"8px"}
          boxShadow={"0px 0px 10px 0px rgba(0, 0, 0, 0.03)"}
        >
          <Box
            onClick={handleClearCategory}
            padding="8px 16px"
            cursor="pointer"
            width="100%"
            whiteSpace="nowrap"
            overflow="hidden"
            bg={category === "" ? "#F6F6F6" : undefined}
          >
            <CustomOption text="All" />
          </Box>
          {options?.map((option: Option, index: number) => (
            <Box
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              key={index}
              onClick={() => handleOptionClick(option)}
              padding="8px 16px"
              cursor="pointer"
              width="100%"
              whiteSpace="nowrap"
              overflow="hidden"
              //textOverflow="ellipsis"
              bg={hoveredIndex === index ? "#F6F6F6" : undefined}
            >
              <CustomOption
                text={option.label}
                isHovered={hoveredIndex === index}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default DropDown;
