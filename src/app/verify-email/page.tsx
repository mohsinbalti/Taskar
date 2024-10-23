"use client";

import CustomText from "@/components/fonts/text";
import { useVerifyEmailUsingToken } from "@/utils/auth.api";
import { Flex, Spinner, useToast } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const authToken = searchParams.get("token");

  const verifyEmail = useVerifyEmailUsingToken();

  const toast = useToast();

  useEffect(() => {
    if (!authToken) {
      router.push("/");
    } else if (authToken && !verifyEmail?.isPending) {
      verifyEmail
        .mutateAsync({ token: authToken })
        .then(() => {
          router.push("/");
          toast({
            title: "Email Verified Successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((err) => {
          toast({
            title: err?.message || "Email Verification Failed",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  }, [authToken]);

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      flexDir="column"
      gap="24px"
    >
      <Spinner size="xl" color="#6F49FE" />
      <Flex flexDir="column" gap="8px" align="center">
        <CustomText text="Verifying Email" size="20px" weight="600" />
        <CustomText
          text="Please wait while we verify your email address"
          size="16px"
          weight="400"
          color="#666"
        />
      </Flex>
    </Flex>
  );
}

export default VerifyEmail;
