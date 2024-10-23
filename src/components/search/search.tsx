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

import abc from "../../../public/icons/search.svg";
export const SearchBar = ({
  size,
  weight,
  color,
  searchInput,
  setSearchInput,
  placeholder,
  borderColor,
  placeholderColor,
}: any) => {
  const inputRef = useRef(null);
  const [, setInputActive] = useState(false);
  useOutsideClick({
    ref: inputRef,
    handler: () => {
      setInputActive(false);
      // setIsSearchOpen(false);
    },
  });

  return (
    <>
      <InputGroup
        onClick={() => setInputActive(true)}
        ref={inputRef}
        bg="#fff"
        borderRadius="16px"
      >
        <InputLeftElement
          h={{ base: "48px", md: "60px" }}
          pl={["", "", "14px", "16px"]}
        >
          <Image src={`/icons/search.svg`} alt="search-icon" w={"16px"} />
        </InputLeftElement>

        <Input
          //  width={{ base: "180px", md: "882px" }}
          variant={"unstyled"}
          pl={["", "", "35px", "48px"]}
          border={`1px solid #ECECEC`}
          borderColor={borderColor}
          _active={{ border: "1px solid #212121" }}
          _focus={{ border: "1px solid #212121" }}
          h={{ base: "48px", md: "60px" }}
          borderRadius={"16px"}
          fontSize={size ? size : { base: "14px", md: "16px" }}
          fontWeight={weight ? weight : "500"}
          lineHeight={"20px"}
          placeholder={placeholder ? placeholder : "Search Task"}
          color={"#212121"}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          _placeholder={{
            color: placeholderColor ? placeholderColor : "#b0b0b0",
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
