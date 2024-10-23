"use client";
import CustomText from "@/components/fonts/text";
import {
  Box,
  Divider,
  Flex,
  Image,
  Spinner,
  useMediaQuery,
} from "@chakra-ui/react";
import { IconX } from "@tabler/icons-react";
import React, { useEffect } from "react";
import Tabs from "./tabs";
import { useRouter } from "next/navigation";
import moment from "moment";
//importing tabsicon
const selected = "/icons/tabSelected.svg";
const figmaBlack = "/logo/taskLogo/figma-black.svg";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { stripePromise } from "@/app/providers";
import StripePayment from "./stripePayment";

const Transaction = ({
  toggle,
  pay,
  task,
  isLoading,
  paymentIntentInfo,
}: any) => {
  const router = useRouter();

  return (
    <Flex
      p={{ base: "0px 8px 32px 8px", md: "32px" }}
      direction={"column"}
      gap={"24px"}
      bg={"#FFF"}
      border={{ md: "1px solid  #ECECEC" }}
      borderRadius={"16px"}
      maxWidth={"644px"}
      width={"100%"}
      position={"relative"}
    >
      {/* close icon */}
      <Box
        position={"absolute"}
        boxSize={"24px"}
        top={{ base: "12px", md: "24px" }}
        right={{ base: "12px", md: "24px" }}
        cursor={"pointer"}
        onClick={toggle}
      >
        <IconX size={"24px"} color="#212121" />
      </Box>

      {/* row 2 */}
      <Flex direction={"column"} alignItems={"start"} gap={"8px"}>
        <CustomText
          text={"Enter Payment Details"}
          color={"#212121"}
          size={{ base: "18px", md: "24px" }}
          h={{ base: "21.6px", md: "28.8px" }}
          weight={600}
        />
        <CustomText
          text={"Enter your card payment details to proceed transaction."}
          color={"#666666"}
          size={{ base: "12px", md: "16px" }}
          h={{ base: "21.6px", md: "25.6px" }}
          weight={400}
        />
      </Flex>

      {/* row 3 */}
      <Flex
        p={"12px"}
        direction={"column"}
        gap={"20px"}
        borderRadius={"12px"}
        bg={"#F6F6F6"}
      >
        {/* image and title price */}
        <Flex
          width={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Flex gap={"12px"}>
            <Image
              src={task?.icon || "https://via.placeholder.com/150"}
              alt="logo"
              width={{ base: "40px", md: "50px" }}
              height={{ base: "40px", md: "50px" }}
              borderRadius="8px"
            />

            <Flex
              direction={"column"}
              gap={{ base: "4px", md: "12px" }}
              alignItems={"flex-start"}
              maxWidth={{ base: "190px", md: "336px" }}
            >
              <CustomText
                text={task?.title || ""}
                size={{ base: "14px", md: "20px" }}
                weight={600}
                color={" #212121"}
                h={"normal"}
              />

              <CustomText
                text={task?.description || ""}
                size={{ base: "12px", md: "12px" }}
                weight={400}
                color={"#666"}
                h={"19px"}
                wrap={"nowrap"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
                noOfLines={1}
              />
            </Flex>
          </Flex>

          <CustomText
            text={`$${task?.fee || "0"}`}
            size={{ base: "14px", md: "16px" }}
            weight={600}
            color={" #212121"}
            h={"19.2px"}
          />
        </Flex>
      </Flex>
      <Divider
        colorScheme="gray"
        orientation="horizontal"
        borderWidth={"1.5px"}
      />

      {/* PaymentElement section */}
      {stripePromise && paymentIntentInfo?.paymentIntent?.client_secret && (
        <Box width={"100%"} height={"100%"} minW={"400px"} minH={"100px"}>
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret: paymentIntentInfo?.paymentIntent?.client_secret,
            }}
          >
            <StripePayment toggle={toggle} task={task} />
          </Elements>
        </Box>
      )}
    </Flex>
  );
};

export default Transaction;
