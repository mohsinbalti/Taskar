import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { IconArrowRight, IconCopy } from "@tabler/icons-react";
import React from "react";
import XIcon from "../../../public/icons/XBlackBgIcon.svg";
import linkdlnIcon from "../../../public/icons/linkdlnBlackBgIcon.svg";
import FacebookIcon from "../../../public/icons/FacebookBlackBgIcon.svg";
import Image from "next/image";
import bgImg from "../../../public/icons/referralBgImg.svg";
import { clashDisplay, epilogue400, epilogue600 } from "../fonts/fonts";
import { useGetLoggedInUser } from "@/utils/auth.api";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const ReferralProgram = () => {
  const { data: referralData } = useGetLoggedInUser();
  const router = useRouter();
  console.log(referralData);
  const toast = useToast();
  const referralLink =
    typeof window !== "undefined" && referralData
      ? `${window.origin}/?ref=${referralData?.myRefferralCode}`
      : "";
  const origin = typeof window !== "undefined" ? window.origin : "";

  return (
    <Box
      bg={"#212121"}
      color={"#FFF"}
      display={"flex"}
      maxWidth={"1540px"}
      mx={"auto"}
      pl={{ base: "16px", lg: "120px" }}
      //   justifyContent={"space-between"}
      gap={{ base: "30px", lg: "90px", xl: "190px" }}
      alignItems={"center"}
      pr={{ base: "16px", lg: "140px" }}
      pt={{ base: "34px", lg: "85px" }}
      pb={"168px"}
      flexDirection={{ base: "column", lg: "row" }}
    >
      <Stack
        align={{ base: "center", lg: "flex-start" }}
        gap={{ base: "12px", md: "24px" }}
        maxW={"473px"}
      >
        <Heading
          fontSize={{ base: "24px", md: "50px" }}
          fontWeight={"600"}
          lineHeight={{ base: "normal", md: "60px" }}
          letterSpacing={"1px"}
          textAlign={{ base: "center", md: "left" }}
        >
          <span className={clashDisplay?.className}>
            Introducing Our Referral Program
          </span>
        </Heading>
        <Text
          fontFamily={"Epilogue"}
          lineHeight={"26px"}
          fontSize={{ base: "14px", md: "16px" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <span className={epilogue400?.className}>
            Refer friends and colleagues to EZ Tasker and reap the benefits!
            Earn rewards for every successful referral. Start sharing and
            earning today!
          </span>
        </Text>
        <Button
          variant={"unstyled"}
          display={"flex"}
          px={{ base: "32px", md: "24px" }}
          h="48px"
          justifyContent={"center"}
          alignItems={"center"}
          gap={"10px"}
          borderRadius={"56px"}
          border={"1px solid #FFF"}
          fontWeight={"500"}
          letterSpacing={"-0.16px"}
          onClick={() => router.push("/")}
        >
          Get Started <IconArrowRight />
        </Button>
      </Stack>

      <Box
        display={"flex"}
        w={"100%"}
        flexDirection={{ base: "column", lg: "row" }}
      >
        <Stack
          maxW={{ lg: "351px" }}
          w={"100%"}
          p={"24px"}
          align={"flex-start"}
          gap={"16px"}
          borderRadius={"16px"}
          border={"1px solid #ECECEC"}
          bg={"#FFF"}
        >
          <Stack align={"flex-start"} gap={"12px"}>
            <Heading
              color={"#212121"}
              fontFamily={"Epilogue"}
              fontSize={"20px"}
              fontWeight={"600"}
              lineHeight={"120%"}
            >
              <span className={epilogue600?.className}>Referrals</span>
            </Heading>
            <Text color={"#666"} fontSize={"14px"} lineHeight={"21px"}>
              Earn up to 10% of every invited user when they start earning
            </Text>
          </Stack>
          <Flex
            p={"12px"}
            borderRadius={"12px"}
            bg={"#F6F6F6"}
            justify={"space-between"}
            align={"center"}
            w={"100%"}
          >
            <Stack gap={"2px"} justify={"center"} align={"flex-start"}>
              <Text
                color={"#666"}
                fontSize={"14px"}
                fontWeight={"400"}
                lineHeight={"150%"}
              >
                Total Referrals
              </Text>
              <Text
                color={"#212121"}
                fontSize={"28px"}
                fontWeight={"700"}
                lineHeight={"150%"}
              >
                {(referralData && referralData?.totalReferralInvites) || 0}
              </Text>
            </Stack>
            <Stack gap={"2px"} justify={"center"} align={"flex-start"}>
              <Text
                color={"#666"}
                fontSize={"14px"}
                fontWeight={"400"}
                lineHeight={"150%"}
              >
                Earnings
              </Text>
              <Text
                color={"#212121"}
                fontSize={"28px"}
                fontWeight={"700"}
                lineHeight={"150%"}
              >
                {(referralData &&
                  Number(referralData?.referralEarning)?.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 4,
                    }
                  )) ||
                  0 ||
                  0}
              </Text>
            </Stack>
          </Flex>
          <Stack gap={"12px"} align={"flex-start"}>
            <Text
              color={"#212121"}
              fontSize={"20px"}
              fontWeight={"600"}
              lineHeight={"120%"}
            >
              Invite now using:
            </Text>
            <Flex gap={"10px"}>
              <TwitterShareButton url={referralLink}>
                <Image
                  src={XIcon}
                  alt="social icon"
                  style={{ cursor: "pointer" }}
                />
              </TwitterShareButton>
              <LinkedinShareButton url={referralLink}>
                <Image
                  src={linkdlnIcon}
                  alt="social icon"
                  style={{ cursor: "pointer" }}
                />
              </LinkedinShareButton>
              <FacebookShareButton url={referralLink}>
                <Image
                  src={FacebookIcon}
                  alt="social icon"
                  style={{ cursor: "pointer" }}
                />
              </FacebookShareButton>
            </Flex>
          </Stack>
          <Stack align={"flex-start"} w={"100%"}>
            <Text color={"#666"} lineHeight={"24px"}>
              Or copy your platform link
            </Text>
            <InputGroup h="50px">
              <Input
                variant={"unstyled"}
                p={"10px"}
                display={"flex"}
                alignItems={"center"}
                gap={"10px"}
                borderRadius={"8px 0px 0px 8px"}
                border={"1px solid #ECECEC"}
                color={"black"}
                defaultValue={referralLink}
              />
              <InputRightElement
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                bg={"#212121"}
                h={"50px"}
                borderRadius={"0px 8px 8px 0px"}
                cursor={"pointer"}
                onClick={() => {
                  navigator.clipboard.writeText(referralLink);
                  toast({
                    title: "Copied to clipboard",
                    status: "success",
                    position: "top-right",
                  });
                }}
              >
                <IconCopy color="#FFF" />
              </InputRightElement>
            </InputGroup>
          </Stack>
        </Stack>
        <Box
          mt={{ base: "-120px", md: "" }}
          mr={{ base: "-120px", md: "" }}
          // overflowX={"auto"}as
          // overflow={"no-scroll"}
          ml={{ md: "-110px" }}
          mb={{ md: "-70px" }}
          w={"fit-content"}
          alignSelf={{ lg: "end" }}
        >
          <Image src={bgImg} alt="bg img" />
        </Box>
      </Box>
    </Box>
  );
};
export default ReferralProgram;
