"use client";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconChevronCompactRight,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import JSIcon from "../../../public/icons/JS.svg";
import AIIcon from "../../../public/icons/AI.svg";
import DesigningIcon from "../../../public/icons/designIcon.svg";
import AppIcon from "../../../public/icons/appIcon.svg";
import ARIcon from "../../../public/icons/ARIcon.svg";
import VRIcon from "../../../public/icons/VRIcon.svg";
import MLIcon from "../../../public/icons/ML.svg";
import potentialIcon from "../../../public/icons/potentialIcon.svg";
import experienceIcon from "../../../public/icons/experienceIcon.svg";
import builPortfolioIcon from "../../../public/icons/buildPortfolioIcon.svg";
import platformIcon from "../../../public/icons/platformStarIcon.svg";
import joinIcon from "../../../public/icons/join.svg";
import pickIcon from "../../../public/icons/pick.svg";
import EarnIcon from "../../../public/icons/earn.svg";
import React, { useState } from "react";
import previousBtn from "../../../public/icons/previousBtn.svg";
import nextBtn from "../../../public/icons/nextBtn.svg";
import {
  clashDisplay,
  clashDisplay500,
  clashDisplay600,
  epilogue,
  epilogue400,
  epilogue500,
} from "../fonts/fonts";
import { useRouter } from "next/navigation";

const SourceOfTrust = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const cards = [
    {
      no: "01",
      title: "Join the Community",
      para: "Sign up and become part of a vibrant community of tech enthusiasts and experts.",
      icon: "./icons/join.svg",
    },
    {
      no: "02",
      title: "Pick Your Task",
      para: `Browse through a wide range of tasks across various technologies. Choose what excites you for just  $2.`,
      icon: "./icons/pick.svg",
    },
    {
      no: "03",
      title: "Earn as You Learn",
      para: "Complete tasks, impress with your skills, and earn a 30% reward from the task's pool fee.",
      icon: "./icons/earn.svg",
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
    <Box
      p={{ base: "16px", md: "58px 0px 58px 64px" }}
      borderRadius={"0px 0px 40px 40px"}
      maxWidth={"1540px"}
      mx={"auto"}
    >
      <Center w={"100%"} flexDirection={"column"}>
        <Stack
          align={"center"}
          gap={"28px"}
          maxW={{ base: "298px", md: "536px" }}
          mb="20px"
        >
          <Text
            color={"#212121"}
            fontSize={{ base: "12px", md: "14px" }}
            fontWeight={"500"}
            lineHeight={"20px"}
            letterSpacing={"-0.4px"}
            fontFamily={"Epilogue"}
          >
            <span className={epilogue500?.className}>Platform Breakdown</span>
          </Text>
          <Heading
            textAlign={"center"}
            color={"#212121"}
            fontSize={{ base: "24px", md: "50px" }}
            fontWeight={{ base: "600", md: "700" }}
            lineHeight={{ base: "normal", md: "60px" }}
            letterSpacing={"-0.9px"}
            fontFamily={"Clash Display Variable"}
          >
            <span className={clashDisplay?.className}>
              Your Source of Truth for EZ Tasker
            </span>
          </Heading>
        </Stack>
        <Text
          color={"#666666"}
          fontSize={{ base: "14px", md: "18px" }}
          lineHeight={{ base: "19px", md: "30px" }}
          letterSpacing={"-0.4px"}
          textAlign={"center"}
        >
          <span className={epilogue?.className}>
            One platform to perform every task,
            <br /> and generate countless revenue.
          </span>
        </Text>
        <Button
          variant={"unstyled"}
          display={"flex"}
          alignItems={"center"}
          fontSize={{ base: "14px", md: "18px" }}
          color={"#56CDAD"}
          onClick={() => router.push("/")}
          h="48px"
        >
          <span className={epilogue400?.className}>Get Started</span>
          <IconChevronRight width={"16px"} />
        </Button>
        {/* <Flex
          justify={"space-between"}
          align={"center"}
          w={"80%"}
          display={{ base: "none", lg: "flex" }}
        >
          <StackCard icon={JSIcon} text="Web Development" />
          <StackCard icon={AIIcon} text="Artificial Intelligence" />
        </Flex> */}
        <Image
          src="/icons/sourceOfTruth.svg"
          alt="sourceoftruth"
          mt="-120px"
          draggable={false}
          display={{ base: "none", lg: "block" }}
        />
        {/* <Center mt={"-20px"} display={{ base: "none", lg: "flex" }}>
          <StackCard icon={DesigningIcon} text="Designing" />
        </Center>
        <Flex
          justify={"space-between"}
          align={"center"}
          w={"50%"}
          mt={"-20px"}
          display={{ base: "none", lg: "flex" }}
        >
          <StackCard icon={AppIcon} text="App Development" />
          <StackCard icon={ARIcon} text="AR Tasks" />
        </Flex>
        <Flex
          justify={"space-between"}
          align={"center"}
          w={"100%"}
          mt={"10px"}
          display={{ base: "none", lg: "flex" }}
        >
          <StackCard icon={VRIcon} text="Virtual Assistance" />
          <StackCard icon={MLIcon} text="Machine Learning" />
        </Flex>
        <Stack
          align={"center"}
          gap={"6px"}
          display={{ base: "none", lg: "flex" }}
          mt={{ lg: "40px" }}
        >
          <Heading
            textAlign={"center"}
            color={"#212121"}
            fontSize={"14px"}
            fontWeight={"500"}
            lineHeight={"20px"}
            fontFamily={"Epilogue"}
          >
            <span className={epilogue500?.className}>
              Performing Tasks Leads to
            </span>
          </Heading>
          <Text
            color={"#666666"}
            fontSize={"14px"}
            lineHeight={"18px"}
            textAlign={"center"}
            fontFamily={"Epilogue"}
          >
            <span className={epilogue400?.className}>
              Single source of excellency every tech <br /> enthusiast looking
              for
            </span>
          </Text>
        </Stack>
        <Flex
          justify={"space-between"}
          align={"center"}
          w={"64%"}
          mt={"64px"}
          display={{ base: "none", lg: "flex" }}
        >
          <StackCard
            icon={potentialIcon}
            text="Earning Potential"
            noWhiteBg={true}
          />
          <StackCard
            icon={experienceIcon}
            text="Gain Experience"
            noWhiteBg={true}
          />
          <StackCard
            icon={builPortfolioIcon}
            text="Building Portfolio"
            noWhiteBg={true}
          />
          <StackCard
            icon={platformIcon}
            text="Become a Platform Star"
            noWhiteBg={true}
          />
        </Flex> */}
      </Center>
      <Flex
        align="flex-start"
        gap="20px"
        // mr="84px"
        mt="72px"
        flexDirection={isMobile ? "column" : "row"}
        w={{ base: "100%", md: "93%", lg: "95%" }}
        // border={"1px solid red"}
      >
        {isMobile ? (
          <>
            <RoadMapCard {...cards[currentIndex]} />
            <Flex justify="center" align={"center"} w="100%" mt="4" gap={"8px"}>
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
          cards.map((card, index) => <RoadMapCard key={index} {...card} />)
        )}
      </Flex>
    </Box>
  );
};

export default SourceOfTrust;

const StackCard = ({ icon, text, noWhiteBg }: any) => {
  return (
    <Stack align={"center"} gap={"10px"} w={"100%"}>
      <Image src={icon} alt="JS" />
      <Text
        display={"flex"}
        p={"6px 12px"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"10px"}
        borderRadius={noWhiteBg ? "0px" : "8px"}
        bg={noWhiteBg ? "" : "#FFF"}
        backdropFilter={"blur(1px)"}
      >
        <span className={epilogue400?.className}>{text}</span>
      </Text>
    </Stack>
  );
};

const RoadMapCard = ({ no, title, para, icon }: any) => {
  return (
    <Stack
      w={"100%"}
      h="388px"
      p={"34px 24px"}
      justify={"center"}
      align={"flex-start"}
      gap={"44px"}
      flex={"1 0 0"}
      borderRadius={"16px"}
      border={"1px solid #ECECEC"}
      bg={"#FFF"}
    >
      <Text
        color={"#212121"}
        fontFamily={"Clash Display Variable"}
        fontSize={"24px"}
        fontWeight={"500"}
        letterSpacing={"2.4px"}
      >
        <span className={clashDisplay500?.className}>{no}</span>
      </Text>
      <Stack align={"flex-start"} gap={"32px"}>
        <Heading
          color={"#212121"}
          fontFamily={"Clash Display Variable"}
          fontSize={"32px"}
          fontWeight={"600"}
          letterSpacing={"0.32px"}
          maxW={"200px"}
        >
          <span className={clashDisplay600?.className}>{title}</span>
        </Heading>
        <Text
          color={"#212121"}
          fontFamily={"Epilogue"}
          fontSize={"16px"}
          fontWeight={"300"}
          lineHeight={"24px"}
          letterSpacing={"0.16px"}
        >
          <span className={epilogue?.className}>{para}</span>
        </Text>
      </Stack>
      <Image src={icon} alt="icon" />
    </Stack>
  );
};
