"use client";

import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
import profilePic1 from "../../../public/icons/profilePic1.svg";
import invertedCommas from "../../../public/icons/invertedCommas.svg";
import previousBtn from "../../../public/icons/previousBtn.svg";
import nextBtn from "../../../public/icons/nextBtn.svg";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import {
  clashDisplay,
  clashDisplay700,
  epilogue,
  epilogue400,
} from "../fonts/fonts";

const Insights = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const cards = [
    {
      no: "01",
      para: "An exceptional platform for those who are ambitious in polishing their skillsets and aiming to reach greater heights.",
      name: "Edric Jaye",
      designation: "Product Designer",
      icon: profilePic1,
    },
    {
      no: "02",
      para: "An exceptional platform for those who are ambitious in polishing their skillsets and aiming to reach greater heights.",
      name: "Henry Palton",
      designation: "Software Engineer",
      icon: profilePic1,
    },
    {
      no: "01",
      para: "An exceptional platform for those who are ambitious in polishing their skillsets and aiming to reach greater heights.",
      name: "Pat Walter",
      designation: "AI Expert",
      icon: profilePic1,
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length
    );
  };

  return (
    <Stack
      my={"80px"}
      px={{ base: "16px", md: "64px" }}
      mx={"auto"}
      align={"center"}
      gap={"44px"}
      maxWidth={"1540px"}
    >
      <Stack align={"center"} gap={{ base: "54px", md: "80px" }}>
        <Heading
          color={"#212121"}
          textAlign={"center"}
          fontFamily={"Clash Display Variable"}
          fontSize={{ base: "24px", md: "50px" }}
          fontWeight={{ base: "600", md: "700" }}
          lineHeight={{ base: "normal", md: "60px" }}
          maxW={{ base: "298px", md: "420px" }}
        >
          <span className={clashDisplay700?.className}>
            Insights from Our Community
          </span>
        </Heading>
        <Flex
          align="flex-start"
          gap="20px"
          // mr="84px"
          // mt="72px"
          flexDirection={isMobile ? "column" : "row"}
          w={"100%"}
        >
          {isMobile ? (
            <>
              <InsightCard {...cards[currentIndex]} />
              <Flex
                justify="center"
                align={"center"}
                w="100%"
                mt="4"
                gap={"8px"}
              >
                <IconButton
                  icon={<IconArrowLeft />}
                  aria-label="Previous"
                  bg={"#F6F6F6"}
                  color={"#212121"}
                  borderRadius={"50%"}
                  onClick={handlePrev}
                  isDisabled={currentIndex === 0}
                />
                <IconButton
                  icon={<IconArrowRight />}
                  bg={"#212121"}
                  borderRadius={"50%"}
                  color={"#FFF"}
                  aria-label="Next"
                  onClick={handleNext}
                  isDisabled={currentIndex === cards.length - 1}
                />
              </Flex>
            </>
          ) : (
            cards.map((card, index) => <InsightCard key={index} {...card} />)
          )}
        </Flex>
        {/* <Flex gap={"16px"}>
          <InsightCard
            img={profilePic1}
            para="An exceptional platform for those who are ambitious in polishing their skillsets and aiming to reach greater heights."
            name="Edric Jaye"
            designation="Product Designer"
          />
          <InsightCard
            img={profilePic1}
            para="An exceptional platform for those who are ambitious in polishing their skillsets and aiming to reach greater heights."
            name="Henry Palton"
            designation="Software Engineer"
          />
          <InsightCard
            img={profilePic1}
            para="An exceptional platform for those who are ambitious in polishing their skillsets and aiming to reach greater heights."
            name="Pat Walter"
            designation="AI Expert"
          />
        </Flex> */}
      </Stack>
      {/* <Flex gap={"16px"} align={"flex-start"}>
          <Image src={previousBtn} alt="previous" />
          <Image src={nextBtn} alt="next" />
        </Flex> */}
    </Stack>
  );
};

export default Insights;

const InsightCard = ({ icon, para, name, designation }: any) => {
  return (
    <Box>
      <Box mb={"-40px"} display={"flex"} justifyContent={"end"} mx={"32px"}>
        <Image src={icon} alt="profile pic" />
      </Box>
      <Stack
        borderRadius={"16px"}
        bg={"#F6F7FA"}
        align={"flex-start"}
        gap={"42px"}
        p={"32px"}
      >
        <Image src={invertedCommas} alt="inverted commas" />
        <Stack align={"flex-start"} gap={"16px"}>
          <Text
            color={"#212121"}
            fontFamily={"Epilogue"}
            fontSize={"16px"}
            fontWeight={"300"}
            lineHeight={"160%"}
          >
            <span className={epilogue?.className}>{para}</span>
          </Text>
          <Stack align={"flex-start"} gap={"8px"}>
            <Text
              color={"#212121"}
              fontFamily={"Clash Display Variable"}
              fontSize={"20px"}
              fontWeight={"600"}
              lineHeight={"normal"}
            >
              <span className={clashDisplay?.className}>{name}</span>
            </Text>
            <Text
              color={"#666"}
              fontFamily={"Epilogue"}
              fontSize={"14px"}
              fontWeight={"400"}
              lineHeight={"normal"}
            >
              <span className={epilogue400?.className}> {designation}</span>
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
