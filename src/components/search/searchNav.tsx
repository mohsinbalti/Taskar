"use client";
import {
  Box,
  Divider,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  useOutsideClick,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
//   import search from "../assets/icons/Navbar/search.svg";

export const SearchBarNav = ({
  size,
  weight,
  searchInput,
  placeholder,
  placeholderColor,
}: any) => {
  const inputRef = useRef(null);
  const [, setInputActive] = useState(false);
  useOutsideClick({
    ref: inputRef,
    handler: () => {
      setInputActive(false);
    },
  });

  return (
    <>
      <InputGroup
        onClick={() => setInputActive(true)}
        ref={inputRef}
        bg={"#FFF"}
        maxWidth={"314px"}
        maxHeight={"48px"}
      >
        <InputLeftElement
          h={{ base: "48px", md: "48px" }}
          pl={["", "", "14px", "16px"]}
        >
          <Image src={`/icons/search.svg`} alt="search-icon" sizes="20px" />
        </InputLeftElement>

        <Input
          borderRadius={"0px"}
          variant={"unstyled"}
          pl={["", "", "35px", "48px"]}
          borderBottom={`1px solid #ECECEC`}
          _active={{ borderBottom: "1px solid #212121" }}
          _focus={{ borderBottom: "1px solid #212121" }}
          h={{ base: "48px", md: "48px" }}
          fontSize={size ? size : { base: "14px", md: "16px" }}
          fontWeight={weight ? weight : "400"}
          lineHeight={"20px"}
          placeholder={placeholder ? placeholder : "Search..."}
          color={"#212121"}
          value={searchInput}
          _placeholder={{
            color: placeholderColor ? placeholderColor : "#212121",
          }}
        />
      </InputGroup>
    </>
  );
};

export const SearchBarIcon = ({ size, weight, color, w, onClick }: any) => {
  return (
    <>
      <Box
        display={{ base: "block", md: "none" }}
        w={w ? w : ""}
        onClick={onClick}
      >
        <Image src={"/icons/search.svg"} alt="search-icon" />
      </Box>
    </>
  );
};
