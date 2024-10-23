"use client";

import {
  Box,
  Button,
  CloseButton,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CustomText from "../fonts/text";
import NavProfile from "./navProfile";
import { IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import { SearchBarNav } from "../search/searchNav";
import { useRouter } from "next/navigation";
import { epilogue500 } from "../fonts/fonts";

const MyProfileNavbar = ({ token, user }: any) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* in phone */}
      <Flex
        width={"100%"}
        p={"16px"}
        justifyContent={"space-between"}
        alignItems={"center"}
        display={{ base: "flex", md: "none" }}
        bg={"#FFF"}
        boxShadow={{ base: "0px 0px 12px 0px rgba(0, 0, 0, 0.10)", md: "none" }}
      >
        <Menu isOpen={isOpen} onClose={toggleMenu}>
          <MenuButton
            as={IconButton}
            // aria-label="Options"
            icon={<IconMenu2 />}
            variant="unstyled"
            onClick={toggleMenu}
          />
          <MenuList
            w={{ base: "100vw" }}
            p={"68px 0px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            zIndex="1000"
          >
            <Stack gap={"90px"} align={"center"} w={"100%"}>
              <Box display={"flex"}>
                <Image
                  // boxSize="40px"
                  objectFit="cover"
                  w="179px"
                  h="48px"
                  src={`/logo/EZ Tasker Logo-02.svg`}
                  alt="logo"
                />
              </Box>
              <Stack
                justify={"center"}
                align={"center"}
                gap={"54px"}
                w={"100%"}
              >
                <Link href="/">
                  <CustomText
                    text={"Home"}
                    weight={600}
                    size={"28px"}
                    cursor={"pointer"}
                  />
                </Link>

                <CustomText
                  text={"Explore Task"}
                  weight={500}
                  size={"24px"}
                  secondary
                  cursor={"pointer"}
                />
                {/* <CustomText
                  text={"Tasks"}
                  weight={500}
                  size={"24px"}
                  secondary
                  cursor={"pointer"}
                />
                <CustomText
                  text={"Tasks"}
                  weight={500}
                  size={"24px"}
                  secondary
                  cursor={"pointer"}
                />
                <CustomText
                  text={"Tasks"}
                  weight={500}
                  size={"24px"}
                  secondary
                  cursor={"pointer"}
                /> */}
              </Stack>
              <CloseButton
                size={"lg"}
                bg={"#212121"}
                p={"20px"}
                borderRadius={"50%"}
                color={"#FFF"}
                w={"64px"}
                h={"64px"}
                onClick={toggleMenu}
              />
            </Stack>
          </MenuList>
        </Menu>

        <Flex alignItems={"center"} cursor={"pointer"}>
          <Image
            // boxSize="40px"
            objectFit="cover"
            w="119px"
            h="32px"
            src={`/logo/EZ Tasker Logo-02.svg`}
            alt="logo"
          />
        </Flex>
        <NavProfile />
      </Flex>

      {/* in md screen */}
      <Box
        w="100%"
        borderBottom={"1px solid #ECECEC"}
        py={{ base: "0px", md: "24px" }}
        display={{ base: "none", md: "block" }}
      >
        <Flex
          maxW="1440px"
          width={"100%"}
          px="30px"
          mx="auto"
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={"128px"}
          bg={"#FFF"}
          // mb={"18px"}
          boxShadow={{
            base: "0px 0px 12px 0px rgba(0, 0, 0, 0.10)",
            md: "none",
          }}
        >
          {/* logo and title */}
          <Flex
            gap={"8px"}
            alignItems={"center"}
            cursor={"pointer"}
            onClick={() => router.push("/")}
          >
            <Image
              // boxSize="40px"
              objectFit="cover"
              w="119px"
              h="32px"
              src={`/logo/EZ Tasker Logo-02.svg`}
              alt="logo"
              display={{ base: "none", md: "block" }}
            />

            {/* <CustomText
              text={"TaskerQuests"}
              size={{ base: "18px", md: "20px" }}
              fontStyle={"italic"}
              weight={800}
              color={"#212121"}
              h={"normal"}
              superScript
            /> */}
          </Flex>

          <SearchBarNav />
          {/* tabs */}
          <Flex
            alignItems={"flex-end"}
            gap={"40px"}
            flex={"1 0 0"}
            display={{ base: "none", md: "flex" }}
          >
            <CustomText
              text={"Explore Task"}
              weight={600}
              size={"16px"}
              cursor={"pointer"}
              onClick={() => router.push("/")}
            />
            {/* <CustomText
              text={"Tasks"}
              weight={500}
              size={"16px"}
              secondary
              cursor={"pointer"}
            />
            <CustomText
              text={"Tasks"}
              weight={500}
              size={"16px"}
              secondary
              cursor={"pointer"}
            />
            <CustomText
              text={"Tasks"}
              weight={500}
              size={"16px"}
              secondary
              cursor={"pointer"}
            /> */}
          </Flex>
          {token ? (
            <NavProfile user={user} />
          ) : (
            <Flex align={"center"} gap={{ md: "10px", lg: "15px", xl: "20px" }}>
              <Text
                color={"#212121"}
                fontFamily={"Epilogue"}
                fontWeight={"500"}
                size={{ md: "13px", lg: "16px" }}
                cursor="pointer"
                onClick={() => router.push("/onboard/login")}
              >
                <span className={epilogue500?.className}>Login</span>
              </Text>
              <Button
                variant={"unstyled"}
                display={"flex"}
                px={{ md: " 16px", lg: " 32px" }}
                h="48px"
                justifyContent={"center"}
                alignItems={"center"}
                gap={"10px"}
                borderRadius={"40px"}
                bg={"#212121"}
                color={"#FFF"}
                fontWeight={"500"}
                fontFamily={"Epilogue"}
                size={{ md: "13px", lg: "16px" }}
                onClick={() => router.push("/onboard/signup")}
              >
                <span className={epilogue500?.className}>Sign Up</span>
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>
    </>
  );
};

export default MyProfileNavbar;
