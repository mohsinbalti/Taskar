import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import techStacKImg from "../../../public/icons/techStack.svg";
import aiPowered from "../../../public/icons/aiPowered.svg";
import communityImg from "../../../public/icons/community.svg";
import earningImg from "../../../public/icons/earning.svg";
import portfolioImg from "../../../public/icons/portfolio.svg";
import Image from "next/image";
import { clashDisplay, epilogue } from "../fonts/fonts";
import { useRouter } from "next/navigation";

const WhyTasker = () => {
  const router = useRouter();
  return (
    <div id="how-it-works">
      <Stack
        align={"flex-start"}
        gap={{ base: "44px", md: "64px" }}
        p={{ base: "16px", md: "24px 107px 24px 107px" }}
        maxWidth={"1540px"}
        mx={"auto"}
      >
        <Stack
          justify={"center"}
          align={{ base: "flex-start", md: "center" }}
          gap={{ base: "12px", md: "8px" }}
          maxW={{ base: "100%", md: "670px" }}
        >
          <Heading
            color={"#212121"}
            fontFamily={"Clash Display Variable"}
            fontSize={{ base: "24px", md: "50px" }}
            maxW={{ base: "298px", md: "100%" }}
            fontWeight={{ base: "600", md: "700" }}
            lineHeight={{ base: "normal", md: "60px" }}
          >
            <span className={clashDisplay?.className}>
              How EZ Tasker Redefines Possibilities.
            </span>
          </Heading>
          <Text
            color={"#6A6A6A"}
            fontFamily={"Epilogue"}
            fontSize={{ base: "14px", md: "20px" }}
            fontWeight={"300"}
            lineHeight={{ base: "19px", md: "32px" }}
          >
            <span className={epilogue?.className}>
              EZ Tasker is a revolutionary platform where possibilities are
              limitless. Through collaboration and innovation, we empower users
              to redefine what&apos achievable. Join us today.
            </span>
          </Text>
        </Stack>
        <WhyTaskCards
          img={techStacKImg}
          head={
            <span>
              Diverse <br /> Technology Stack
            </span>
          }
          para={
            "Our tasks cover a wide array of technologies, offering you the chance to work on what you love or dive into new areas."
          }
          btnText={"Explore Opportunities"}
          onClick={() => {
            router.push("/");
          }}
        />
        <WhyTaskCards
          img={aiPowered}
          head={"AI-Powered Efficiency"}
          para={
            "With AI at the helm of task verification, expect swift, unbiased, and accurate assessments of your work."
          }
          btnText={"Get Started"}
          reverse={true}
          onClick={() => {
            router.push("/");
          }}
        />
        <WhyTaskCards
          img={communityImg}
          head={
            <span>
              Community of <br /> Tech Enthusiasts
            </span>
          }
          para={
            "Join a growing community of like-minded individuals passionate about technology and continuous learning."
          }
          btnText={"Let’s dig in"}
          onClick={() => {
            router.push("/");
          }}
        />
        <WhyTaskCards
          img={earningImg}
          head={
            <span>
              Continuous <br /> Earning Potential
            </span>
          }
          para={
            "With a dynamic pool of tasks and fair reward distribution, your earning potential is only limited by your willingness to engage and solve."
          }
          btnText={"Start Earning Now"}
          reverse={true}
          onClick={() => {
            router.push("/");
          }}
        />
        <WhyTaskCards
          img={portfolioImg}
          head={
            <span>
              Build <br /> Your Portfolio
            </span>
          }
          para={
            "Your EZ Tasker profile becomes a testament to your skills, perfect for sharing with potential employers or clients."
          }
          btnText={"Start Building Portfolio"}
          onClick={() => {
            router.push("/");
          }}
        />
      </Stack>
    </div>
  );
};

export default WhyTasker;

const WhyTaskCards = ({ img, head, para, btnText, reverse, onClick }: any) => {
  return (
    <Flex
      justify={{ md: "space-between " }}
      align={"center"}
      w={"100%"}
      gap={{ base: "24px" }}
      flexDirection={{ base: "column", lg: reverse ? "row-reverse" : "row" }}
    >
      <Stack
        maxW={{ base: "590px", lg: "100%" }}
        w={{ lg: "50%" }}
        justify={"center"}
        align={{ base: "center", lg: "flex-start" }}
        gap={{ base: "12px", md: "44px" }}
      >
        <Stack gap={"12px"} align={{ base: "center", lg: "start" }}>
          <Heading
            color={"#212121"}
            fontFamily={"Clash Display Variable"}
            fontSize={{ base: "24px", md: "44px" }}
            fontWeight={"600"}
            lineHeight={{ base: "normal", md: "50px" }}
            textAlign={{ base: "center", lg: "left" }}
          >
            <span className={clashDisplay?.className}>{head}</span>
          </Heading>
          <Text
            textAlign={{ base: "center", lg: "left" }}
            color={"#6A6A6A"}
            fontFamily={"Epilogue"}
            fontSize={{ base: "14px", md: "20px" }}
            fontWeight={"300"}
            lineHeight={{ base: "19px", md: "32px" }}
          >
            <span className={epilogue?.className}>{para}</span>
          </Text>
        </Stack>
        <Button
          variant={"unstyled"}
          px={"32px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={{ base: "40px", md: "72px" }}
          bg={"#212121"}
          color={"#FFF"}
          h={"48px"}
          fontSize={{ base: "16px", md: "20px" }}
          fontWeight={{ base: "500", md: "600" }}
          letterSpacing={"-0.24px"}
          _hover={{ bg: "black" }}
          onClick={onClick}
        >
          {btnText}
        </Button>
      </Stack>
      <Box w={"50%"}>
        <Image src={img} alt="tech Stack" />
      </Box>
    </Flex>
  );
};
