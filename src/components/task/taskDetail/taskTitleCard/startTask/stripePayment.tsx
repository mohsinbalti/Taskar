import CustomText from "@/components/fonts/text";
import { Box, Flex, Spinner, useMediaQuery, useToast } from "@chakra-ui/react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useState } from "react";

function StripePayment({ toggle, task }: any) {
  const toast = useToast();

  const [isLessThan380] = useMediaQuery(`(max-width: 380px)`); //for buttons padding and text size
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentElementReady, setIsPaymentElementReady] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmitPayment = async () => {
    setIsLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setIsLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/task-detail/${task?.id}?success=true`,
      },
    });
    setIsLoading(false);
    if (error) {
      toast({
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOnReady = (e: any) => {
    setIsPaymentElementReady(true);
  };

  return (
    <div>
      <Box>
        <PaymentElement onReady={handleOnReady} />
      </Box>
      {/* row 4 Buttons */}
      <p style={{ color: "#666666", marginTop: "16px" }}>
        By proceeding a purchase you agree that you accept our{" "}
        <span
          style={{ color: "#212121", fontWeight: 600, cursor: "pointer" }}
          onClick={() => {
            typeof window !== "undefined" &&
              window.open(
                "https://app.termly.io/policy-viewer/policy.html?policyUUID=2dcaf8b8-8e4c-481f-9649-9b629d4a97a0",
                "_blank"
              );
          }}
        >
          Terms of Service
        </span>{" "}
        and{" "}
        <span
          style={{ color: "#212121", fontWeight: 600, cursor: "pointer" }}
          onClick={() => {
            typeof window !== "undefined" &&
              window.open(
                "https://app.termly.io/policy-viewer/policy.html?policyUUID=b839d70b-ea1b-495f-9303-8824790bba9f",
                "_blank"
              );
          }}
        >
          Privacy Policy.
        </span>
      </p>
      <Flex gap={{ base: "6px", md: "12px" }} w={"100%"} mt="8px">
        <Flex
          p={isLessThan380 ? "8px 20px" : { base: "8px 40px", md: "14px 56px" }}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"30px"}
          border={"1px solid #212121"}
          width={"100%"}
          cursor={"pointer"}
          onClick={toggle}
        >
          <CustomText
            text={"Cancel"}
            size={isLessThan380 ? "14px" : { base: "16px", md: "18px" }}
            weight={600}
            color={" #212121"}
            h={"28.8px"}
          />
        </Flex>

        <Flex
          p={isLessThan380 ? "8px 20px" : { base: "8px 40px", md: "14px 56px" }}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"30px"}
          bg={" #212121"}
          width={"100%"}
          cursor={"pointer"}
          onClick={() =>
            isLoading || !isPaymentElementReady
              ? () => {}
              : handleSubmitPayment()
          }
        >
          {isLoading ? (
            <Spinner size="sm" color="white" />
          ) : (
            <CustomText
              text={"Pay"}
              size={isLessThan380 ? "14px" : { base: "16px", md: "18px" }}
              weight={600}
              color={" #FFFFFF"}
              h={"28.8px"}
            />
          )}
        </Flex>
      </Flex>
    </div>
  );
}

export default StripePayment;
