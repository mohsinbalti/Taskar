import { Flex } from "@chakra-ui/react";
import React from "react";
import FooterColumn from "./footerColumn";
import { useGetCategory, useGetSkills } from "@/utils/auth.api";

const FooterContent = () => {
  const { data: categoryData } = useGetCategory();
  const { data: skillsData } = useGetSkills();

  const footerData = [
    {
      title: "Categories",
      subtitles: categoryData,
    },
    {
      title: "Skills",
      subtitles: skillsData?.sort(() => Math.random() - 0.5).slice(0, 8),
    },
    {
      title: "Resources",
      subtitles: [
        "Find Tasks",
        "Profile",
        "Dashboard",
        "How It Works",
        "Terms of Service",
        "Privacy Policy",
      ],
    },
  ];
  return (
    <Flex wrap={"wrap"} gap={{ base: "32px", md: "94px" }}>
      {footerData.map(({ title, subtitles }: any, index: number) => (
        <FooterColumn title={title} subtitles={subtitles} key={index} />
      ))}
    </Flex>
  );
};

export default FooterContent;
