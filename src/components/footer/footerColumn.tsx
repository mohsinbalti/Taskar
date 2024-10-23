import { Flex } from "@chakra-ui/react";
import React from "react";
import CustomText from "../fonts/text";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const FooterColumn = ({ title, subtitles }: any, key: number) => {
  const router = useRouter();

  const filterSubtitles = () => {
    if (title === "Resources") {
      return subtitles.filter(
        (subtitle: any) => subtitle !== "Profile" && subtitle !== "Dashboard"
      );
    } else {
      return subtitles;
    }
  };

  return (
    <Flex direction={"column"} gap={{ base: "8px", md: "16px" }} key={key}>
      <CustomText
        text={title}
        weight={600}
        size="18px"
        h="28.8px"
        color="#FFF"
        mb={{ base: "4px", md: "2px" }}
      />

      {filterSubtitles()?.map((subtitle: any, index: number) => (
        <CustomText
          key={index}
          text={subtitle?.categoryName || subtitle?.skillName || subtitle}
          weight={400}
          size="16px"
          h="25.6px"
          color="#CFCFCF"
          cursor={"pointer"}
          onClick={() => {
            // Conditionally handle navigation based on subtitle
            if (subtitle === "Find Tasks") {
              router.push("/");
            } else if (subtitle === "Profile") {
              router.push("/profile");
            } else if (subtitle === "Dashboard") {
              router.push("/dashboard");
            } else if (title === "Categories") {
              router.push(`/?category=${subtitle?.categoryName}`);
            } else if (title === "Skills") {
              router.push(`/?category=${subtitle?.category?.categoryName}`);
            } else if (subtitle === "How It Works") {
              typeof window !== "undefined" &&
                window.open("https://eztasker.com/how-it-work", "_blank");
            } else if (subtitle === "Privacy Policy") {
              typeof window !== "undefined" &&
                window.open(
                  "https://app.termly.io/policy-viewer/policy.html?policyUUID=b839d70b-ea1b-495f-9303-8824790bba9f",
                  "_blank"
                );
            } else if (subtitle === "Terms of Service") {
              typeof window !== "undefined" &&
                window.open(
                  "https://app.termly.io/policy-viewer/policy.html?policyUUID=2dcaf8b8-8e4c-481f-9649-9b629d4a97a0",
                  "_blank"
                );
            }
          }}
        />
      ))}
    </Flex>
  );
};

export default FooterColumn;
