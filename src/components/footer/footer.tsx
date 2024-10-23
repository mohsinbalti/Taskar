"use client";

import { Box, Flex, Image } from "@chakra-ui/react";
import React from "react";
import CustomText from "../fonts/text";
import FooterContent from "./footerContent";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandX,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const socialIcons = [
  <>
    <a
      href="https://www.facebook.com/eztaskerofficial?mibextid=LQQJ4d"
      target="_blank"
    >
      <IconBrandFacebook key={1} size={"20px"} color="#FFF" />
    </a>
    <a
      href="https://www.instagram.com/eztasker?igsh=amtlZTJ6OHliN2pv"
      target="_blank"
    >
      <IconBrandInstagram key={2} size={"20px"} color="#FFF" />
    </a>
    <a
      href="https://www.linkedin.com/company/eztaskerplatform/"
      target="_blank"
    >
      <IconBrandLinkedin key={3} size={"20px"} color="#FFF" />
    </a>
    <a href="https://x.com/myeztasker" target="_blank">
      <IconBrandX key={4} size={"20px"} color="#FFF" />
    </a>
  </>,
];

const Footer = () => {
  const pathName = usePathname();
  if (!pathName?.includes("/onboard"))
    return (
      <Box bg={"#212121"} height={"100%"}>
        <Flex
          bg={"#212121"}
          width={"100%"}
          maxWidth={"1440px"}
          height={"100%"}
          mx={"auto"}
          p={{ base: "16px 5px", md: "40px 30px" }}
          // mt={"37px"}
          direction={"column"}
        >
          {/* row having all content in MD while in base social icons are also in it */}
          <Flex
            width={"100%"}
            justifyContent={{ base: "center", md: "space-between" }}
            direction={{ base: "column", md: "row" }}
            gap={{ base: "20px" }}
          >
            {/* flex having logo and title and social icons in case of mobile view */}
            <Flex
              width={{ base: "100%", md: "306px" }}
              direction={"column"}
              alignItems={"start"}
              gap={"12px"}
              p={{ base: "0px 16px", md: "0px 0px" }}
            >
              <Flex gap={{ base: "8px", md: "10.4px" }} alignItems={"center"}>
                <Image
                  boxSize="120px"
                  src={`/logo/mainLogoWhite.svg`}
                  alt="logo"
                />
              </Flex>
              <CustomText
                text={
                  " Great platform for the young talent that is passionate about their work"
                }
                size={"16px"}
                color={"#FFF"}
                weight={400}
              />

              <Flex
                gap={"10px"}
                alignItems={"center"}
                display={{ base: "flex", md: "none" }}
              >
                {socialIcons.map((icon: any) => icon)}
              </Flex>
            </Flex>

            {/* flex having categories */}
            <Flex
              p={{ base: "32px 16px" }}
              mt={{ base: "32px" }}
              borderTop={{ base: " 2px solid #CFCFCF", md: "none" }}
            >
              <FooterContent />
            </Flex>
          </Flex>

          {/* row having social icons in MD and only reserved line in base */}
          <Flex
            width={"100%"}
            pt={{ base: "32px", md: "40px" }}
            mt={{ base: "32px", md: "64px" }}
            borderTop={"2px solid #CFCFCF"}
            justifyContent={{ base: "center", md: "space-between" }}
          >
            <CustomText
              //fontStyle={"italic"}
              weight={700}
              h={"25.6px"}
              text={"2024 @ EzTasker. All rights reserved."}
              color={"#CFCFCF"}
            />

            <Flex
              gap={"10px"}
              display={{ base: "none", md: "flex" }}
              cursor={"pointer"}
            >
              {socialIcons.map((icon: any) => icon)}
            </Flex>
          </Flex>
        </Flex>
      </Box>
    );
};

export default Footer;
