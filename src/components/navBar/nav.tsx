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
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CustomText from "../fonts/text";
import NavProfile from "./navProfile";
import { IconMenu2, IconPassword } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { epilogue500 } from "../fonts/fonts";
import DashboardSVG from "@/svgs/dashboard";
import BillingSVG from "@/svgs/billing";
import TaskSVG from "@/svgs/task";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ChangePasswordModal from "./changePasswordModal";

const NavBar = ({ token, user, isLoading }: any) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileView] = useMediaQuery("(max-width: 878px)");

  const {
    isOpen: isChangePasswordOpen,
    onOpen: onPasswordChangeOpen,
    onClose: onPasswordChangeClose,
  } = useDisclosure();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* in phone */}
      <Flex
        position="fixed"
        zIndex="1000"
        top="0"
        width={"100%"}
        // height={"100vh"}

        p={"10px 16px"}
        justifyContent={"space-between"}
        alignItems={"center"}
        display={isMobileView ? "flex" : "none"}
        bg={"#FFF"}
        boxShadow={{ base: "0px 0px 12px 0px rgba(0, 0, 0, 0.10)", md: "none" }}
      >
        <Menu isOpen={isOpen} onClose={toggleMenu}>
          <MenuButton
            as={IconButton}
            // aria-label="Options"
            icon={isOpen ? <CloseButton /> : <IconMenu2 />}
            variant="unstyled"
            onClick={toggleMenu}
          />

          <MenuList
            w={{ base: "100vw" }}
            p={"0px 0px 10rem 0px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Stack
              justifyContent={"space-between"}
              height={"90vh"}
              align={"center"}
              w={"100%"}
            >
              <Stack
                justify={"left"}
                align={"left"}
                // gap={"54px"}
                p={"24px 32px 24px 32px"}
                w={"100%"}
              >
                <Link
                  href="/"
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  <Flex
                    alignItems={"center"}
                    cursor={"pointer"}
                    gap={"15px"}
                    p={"16px 0px 16px 0px"}
                    borderBottom={"1px solid #ECECEC"}
                  >
                    <Image
                      // objectFit="cover"
                      w="24px"
                      h="24px"
                      src={`/icons/findTaskIcon.svg`}
                      alt="findTaskIcon"
                    />
                    <CustomText
                      text={"Find Task"}
                      weight={400}
                      size={"20px"}
                      cursor={"pointer"}
                      color={pathname === "/" ? "#6F49FE" : "#212121"}
                    />
                  </Flex>
                </Link>
                <Link
                  href="/transaction-history"
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  <Flex
                    alignItems={"center"}
                    cursor={"pointer"}
                    gap={"15px"}
                    p={"16px 0px 16px 0px"}
                    borderBottom={"1px solid #ECECEC"}
                  >
                    <Image
                      // objectFit="cover"
                      w="24px"
                      h="24px"
                      src={`/icons/billing&Earning.svg`}
                      alt="billing"
                    />
                    <CustomText
                      text={"Billing & Earnings"}
                      weight={400}
                      size={"20px"}
                      cursor={"pointer"}
                      color={
                        pathname === "/transaction-history"
                          ? "#6F49FE"
                          : "#212121"
                      }
                    />
                  </Flex>
                </Link>
                <Link
                  href="/dashboard"
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  <Flex
                    alignItems={"center"}
                    cursor={"pointer"}
                    gap={"15px"}
                    p={"16px 0px 16px 0px"}
                    borderBottom={"1px solid #ECECEC"}
                  >
                    <Image
                      // objectFit="cover"
                      w="24px"
                      h="24px"
                      src={`/icons/dashboardIcon.svg`}
                      alt="dashboardIcon"
                    />
                    <CustomText
                      text={"My Dashboard"}
                      weight={400}
                      size={"20px"}
                      cursor={"pointer"}
                      color={pathname === "/dashboard" ? "#6F49FE" : "#212121"}
                    />
                  </Flex>
                </Link>
                {/* <Link
                  href="/profile"
                  onClick={() => {
                    toggleMenu();
                  }}
                >
                  <Flex
                    alignItems={"center"}
                    cursor={"pointer"}
                    gap={"15px"}
                    p={"16px 0px 16px 0px"}
                  >
                    <Image
                      // objectFit="cover"
                      w="24px"
                      h="24px"
                      src={`/icons/profileIcon.svg`}
                      alt="findTaskIcon"
                    />
                    <CustomText
                      text={"Profile"}
                      weight={400}
                      size={"20px"}
                      cursor={"pointer"}
                      color={pathname === "/profile" ? "#6F49FE" : "#212121"}
                    />
                  </Flex>
                </Link> */}
                <Flex
                  alignItems={"center"}
                  cursor={"pointer"}
                  gap={"15px"}
                  p={"16px 0px 16px 0px"}
                  onClick={() => {
                    onPasswordChangeOpen();
                    toggleMenu();
                  }}
                >
                  <Image
                    // objectFit="cover"
                    w="24px"
                    h="24px"
                    src={`/icons/lock.svg`}
                    alt="findTaskIcon"
                  />{" "}
                  <CustomText
                    text={"Change Password"}
                    weight={400}
                    size={"20px"}
                    cursor={"pointer"}
                  />
                </Flex>
              </Stack>
              <Stack
                justify={"center"}
                align={"left"}
                p={"0px 32px 24px 32px"}
                w={"100%"}
              >
                <Flex
                  alignItems={"center"}
                  cursor={"pointer"}
                  gap={"15px"}
                  // mt={"3.7rem"}
                  onClick={() => {
                    localStorage?.removeItem("token");
                    queryClient.invalidateQueries();
                  }}
                >
                  <Image src="/icons/logout-ico.svg" alt="profile" />
                  <Text color="#212121" fontSize="20px" fontWeight="400">
                    Logout
                  </Text>
                </Flex>
              </Stack>
            </Stack>
          </MenuList>
        </Menu>

        <Flex alignItems={"center"} cursor={"pointer"} gap="6px">
          <Image
            objectFit="cover"
            w="119px"
            h="32px"
            src={`/logo/EZ Tasker Logo-02.svg`}
            alt="logo"
            onClick={() => router.push("/")}
          />
          <Flex
            align="center"
            justify="center"
            bg="#6F49FE"
            borderRadius="19px"
            w="35px"
            h="14px"
          >
            <CustomText
              text={"BETA"}
              size="10px"
              cursor={"pointer"}
              color={"#fff"}
            />
          </Flex>
        </Flex>
        {token ? (
          <NavProfile user={user} isLoading={isLoading} />
        ) : (
          <Text
            color={"#212121"}
            fontFamily={"Epilogue"}
            fontWeight={"500"}
            onClick={() => {
              router.push("/onboard/login");
            }}
          >
            <span className={epilogue500?.className}>Login</span>
          </Text>
        )}
      </Flex>

      {/* in md screen */}
      <Box
        w="100%"
        // pos="fixed"
        zIndex="1000"
        className="navebar"
        top="0"
        bg={"#fff"}
        display={isMobileView ? "none" : "block"}
      >
        <Flex
          maxW="1440px"
          width={"100%"}
          px={{ md: "4px", lg: "10px", xl: "30px" }}
          mx="auto"
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={{ md: "10px", lg: "25px", xl: "64px" }}
          // mb={"18px"}
          boxShadow={{
            base: "0px 0px 12px 0px rgba(0, 0, 0, 0.10)",
            md: "none",
          }}
        >
          {/* logo and title */}
          <Flex gap="6px" alignItems={"center"} cursor={"pointer"}>
            <Image
              // boxSize="40px"
              objectFit="cover"
              w="119px"
              h="32px"
              src={`/logo/EZ Tasker Logo-02.svg`}
              alt="logo"
              display={{ base: "none", md: "block" }}
              onClick={() => router.push("/")}
            />
            <Flex
              align="center"
              justify="center"
              bg="#6F49FE"
              borderRadius="19px"
              w="35px"
              h="14px"
            >
              <CustomText
                text={"BETA"}
                size="10px"
                cursor={"pointer"}
                color={"#fff"}
              />
            </Flex>
          </Flex>

          {/* tabs */}
          <Flex
            alignItems={"center"}
            gap="8px"
            display={{ base: "none", md: "flex" }}
          >
            <Link href="/">
              <Flex
                px="8px"
                align="center"
                gap="6px"
                h="64px"
                borderBottom={
                  pathname === "/"
                    ? "2px solid #6F49FE"
                    : "2px solid transparent"
                }
              >
                <TaskSVG fill={pathname === "/" ? "#6F49FE" : "#CFCFCF"} />
                <CustomText
                  text={"Find Tasks"}
                  weight={400}
                  size="14px"
                  letterSpacing="0.4px"
                  cursor={"pointer"}
                  color={"#181818"}
                />
              </Flex>
            </Link>
            <Box width="1px" height="20px" bg="#ECECEC" />
            <Link href="/transaction-history">
              <Flex
                px="8px"
                align="center"
                gap="6px"
                h="64px"
                borderBottom={
                  pathname === "/transaction-history"
                    ? "2px solid #6F49FE"
                    : "2px solid transparent"
                }
              >
                <BillingSVG
                  fill={
                    pathname === "/transaction-history" ? "#6F49FE" : "#CFCFCF"
                  }
                />
                <CustomText
                  text={"Billing & Earnings"}
                  weight={400}
                  size="14px"
                  letterSpacing="0.4px"
                  cursor={"pointer"}
                  color={"#181818"}
                />
              </Flex>
            </Link>
            <Box width="1px" height="20px" bg="#ECECEC" />
            <Link href="/dashboard">
              <Flex
                px="8px"
                align="center"
                gap="6px"
                h="64px"
                borderBottom={
                  pathname === "/dashboard"
                    ? "2px solid #6F49FE"
                    : "2px solid transparent"
                }
              >
                <DashboardSVG
                  fill={pathname === "/dashboard" ? "#6F49FE" : "#CFCFCF"}
                />
                <CustomText
                  text={"My Dashboard"}
                  weight={400}
                  size="14px"
                  letterSpacing="0.4px"
                  cursor={"pointer"}
                  color={"#181818"}
                />
              </Flex>
            </Link>
          </Flex>
          {token ? (
            <NavProfile user={user} isLoading={isLoading} />
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
                h="48px"
                px={{ md: "16px", lg: "32px" }}
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

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={onPasswordChangeClose}
        onOpen={onPasswordChangeOpen}
      />
    </>
  );
};

export default NavBar;
