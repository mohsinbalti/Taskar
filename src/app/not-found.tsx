"use client";
import { BlackButton } from "@/components/buttons/button";
import { hNeue400, hNeue700 } from "@/components/fonts/fonts";
import CustomText from "@/components/fonts/text";
import { Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";

function NotFound() {
  const router = useRouter();
  return (
    <Flex
      minH={{ base: "calc(100vh - 300px)", md: "calc(100vh - 85px)" }}
      bg="url(/images/404.svg)"
      bgRepeat="no-repeat"
      bgPos="top"
      bgSize="contain"
      mt={{ base: "80px", md: "auto" }}
      flexDir="column"
      align="center"
      justify="end"
      gap="8px"
      pb="5%"
      px="32px"
    >
      <CustomText
        text="PAGE NOT FOUND"
        size="24px"
        weight="700"
        family={hNeue700.className}
        letterSpacing="4.8px"
        align="center"
      />
      <Box maxW="462px" textAlign="center" mb="32px">
        <CustomText
          text="The link you have clicked may be broken or the page may have been removed or renamed."
          size="16px"
          weight="400"
          color="#666"
          align="center"
          family={hNeue400.className}
        />
      </Box>

      <BlackButton
        btnText="Go to Home"
        maxW="300px"
        borderRadius="80px"
        onClick={() => {
          router.push("/");
        }}
      />
    </Flex>
  );
}

export default NotFound;
