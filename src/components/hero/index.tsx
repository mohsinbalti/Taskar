import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import React from "react";
import { clashDisplay, epilogue } from "../fonts/fonts";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <Box
      p={{ base: "16px 0px", md: "0px 0px 24px 64px" }}
      w={"100%"}
      maxWidth={"1540px"}
      mx={"auto"}
    >
      <Flex
        align={"center"}
        justify={{ base: "center", lg: "none" }}
        direction={{ base: "column", lg: "row" }}
        mb={{ md: "100px" }}
      >
        <Stack
          justify={"center"}
          align={{ base: "center", lg: "flex-start" }}
          gap={{ base: "12px", lg: "32px" }}
        >
          <Heading
            maxWidth={"654px"}
            width={"100%"}
            color={"#212121"}
            fontSize={{ base: "40px", md: "77px" }}
            fontWeight={"600"}
            lineHeight={{ base: "52px", md: "90px" }}
            fontFamily={"Clash Display Variable"}
            textAlign={{ base: "center", lg: "left" }}
          >
            <span className={clashDisplay?.className}>
              The Easiest Way To <span style={{ color: "#6F49FE" }}>Earn</span>,
              Using Your Skills.
            </span>
          </Heading>
          <Text
            maxWidth={"654px"}
            width={"100%"}
            color={"#666"}
            textAlign={{ base: "center", lg: "left" }}
            //  fontFamily={"Epilogue"}
            fontSize={{ base: "14px", md: "20px" }}
            fontWeight={"300"}
            lineHeight={{ base: "19px", md: "28px" }}
          >
            <span className={epilogue?.className}>
              Where we&apos;re more than just a platform; we&apos;re a community
              pushing boundaries. Explore tasks, make submissions, and earn
              rewards for your efforts.
            </span>
          </Text>
          <Button
            variant={"unstyled"}
            h="48px"
            px={{ base: "32px", md: "44px" }}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius={{ base: "40px", md: "56px" }}
            bg={"#212121"}
            color={"#FFF"}
            _hover={{ bg: "black" }}
            fontSize={{ base: "16px", md: "20px" }}
            fontWeight={{ base: "500", md: "600" }}
            letterSpacing={"-0.24px"}
            onClick={() => router.push("/")}
          >
            Explore Tasks
          </Button>
        </Stack>
        <Box w="100%">
          <Box
            display={{ base: "none", md: "flex" }}
            // w={"100%"}
            // h={"700px"}
            position={"relative"}
            justifyContent="end"
            pos="relative"
          >
            <Image
              src="/icons/landing-page-hero.svg"
              alt="image"
              draggable={false}
            />
            <Image
              src="/icons/earning-card.svg"
              alt="stats"
              pos="absolute"
              bottom="0"
              left={{ base: "25%", "2xl": "35%" }}
              className="moveUpDown"
              draggable={false}
            />
            <Image
              src="/icons/arrow-yellow.svg"
              alt="stats"
              pos="absolute"
              top="35%"
              right="40%"
              className="fadeArrow"
              draggable={false}
            />
          </Box>
          <Box
            display={{ base: "block", md: "none" }}
            // w={"100%"}
            h={{ base: "244px", sm: "350px", md: "450px" }}
            position={"relative"}
          >
            <Image src="/icons/statsBgSmall.svg" alt="image" mx="auto" />
          </Box>
        </Box>
      </Flex>
      {/* <Flex
        justify={"space-between"}
        align={"center"}
        p={{ base: "12px 24px", md: "32px" }}
        borderRadius={{ base: "16px", md: "22px" }}
        border={"0.6px solid #ECECEC"}
        bg={"#FFF"}
        maxW={"1170px"}
        mx={"auto"}
        mr={{ md: "64px", xl: "auto" }}
      >
        <StatCard
          img={activeUserImg}
          users={"30k+"}
          title="Active user"
          bg="#C06EF320"
        />
        <StatCard
          img={participantsImg}
          users={"15k"}
          title="Total Participants"
          bg="#FDBA0920"
        />
        <StatCard
          img={winnersImg}
          users={"100+"}
          title="Winners"
          bg="#6DEDC320"
        />
      </Flex> */}
    </Box>
  );
};

export default Hero;

const StatCard = ({ img, users, title, bg }: any) => {
  return (
    <Flex
      align={"center"}
      gap={{ base: "8px", md: "16px" }}
      flexDirection={{ base: "column", md: "row" }}
      justify={{ base: "center", md: "none" }}
    >
      <Box
        position={"relative"}
        w={{ base: "24px", md: "80px" }}
        h={{ base: "24px", md: "80px" }}
        borderRadius={"50px"}
        // opacity={"0.2"}
        bg={bg}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        boxShadow={"17.5px 25px 60px 0px rgba(25,15,44,0.02)"}
      >
        <Image
          src={img}
          alt="active users"

          // sizes="(max-width: 768px) 24px, (max-width: 1200px) 80px, 24px"
        />
      </Box>
      <Stack justify={"center"} align={{ base: "center", md: "flex-start" }}>
        <Heading
          color={"#212121"}
          fontSize={{ base: "20px", md: "48px" }}
          fontWeight={"600"}
          lineHeight={"130%"}
          textAlign={{ base: "center", md: "left" }}
          textTransform={"capitalize"}
          fontFamily={"Clash Display Variable"}
        >
          {users}
        </Heading>
        <Text
          color={"#666"}
          fontFamily={"Epilogue"}
          fontSize={{ base: "12px", md: "18px" }}
          textAlign={{ base: "center", md: "left" }}
          fontWeight={"400"}
          lineHeight={"180%"}
        >
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};
