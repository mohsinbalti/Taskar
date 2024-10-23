"use client";
import { Flex, Image, useMediaQuery, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CustomText from "../fonts/text";
import { useRouter } from "next/navigation";

//importing logo
const icoFigma = "/logo/taskLogo/figma.svg";

const FileCard = ({ icon, name, ext, task }: any) => {
  const router = useRouter();

  const toast = useToast();

  const [fileExtension, setFileExtension] = useState("");

  const extRegex = /\.([0-9a-z]+)(?:[\?#]|$)/i;
  const match = ext?.match(extRegex);
  // if (match) {

  const handleDownload = async () => {
    if (typeof window !== "undefined") {
      const response = await fetch(ext);
      const blob = await response?.blob();
      const url = window?.URL?.createObjectURL(blob);
      const a = document?.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = name; // Set the file name
      document?.body?.appendChild(a);
      a?.click();
      window?.URL?.revokeObjectURL(url);
      document?.body?.removeChild(a);
    }
  };

  useEffect(() => {
    if (match) {
      setFileExtension(match[1]?.toLowerCase());
    }
  }, [match]);

  const [isLessThan390] = useMediaQuery(`(max-width: 390px)`); //for less than 390 size changes
  return (
    <Flex
      p={isLessThan390 ? "9px" : { base: "12px", md: "16px" }}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"flex-start"}
      gap={"16px"}
      borderRadius={"8px"}
      bg={"#F6F6F6"}
      width={isLessThan390 ? "142px" : { base: "173px", md: "257px" }}
    >
      <Flex
        borderRadius={"6.4px"}
        bg={"#FFF"}
        width={"32px"}
        height={"32px"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Image
          src={icon ? icon : icoFigma}
          boxSize={{ base: "20px", md: "20px" }}
          alt="icon"
        />
      </Flex>

      <Flex direction={"column"} gap={"4px"}>
        <CustomText
          text={name ? name : "User Flow Diagram"}
          color={"#212121"}
          size={{ base: "12px", md: "14px" }}
          weight={600}
          height={{ base: "19px", md: "20px" }}
        />

        <CustomText
          text={fileExtension ? `.${fileExtension}` : ""}
          color={"#212121"}
          size={{ base: "12px", md: "14px" }}
          weight={400}
          height={{ base: "16px", md: "16px" }}
        />
      </Flex>

      <Flex
        p={{ base: "7px 20px", md: "7px 64px" }}
        justifyContent={"center"}
        alignItems={"center"}
        borderRadius={"80px"}
        bg={"#FFF"}
        width={"100%"}
        onClick={() => {
          if (task?.participation) {
            handleDownload();
          } else {
            toast({
              title: "You are not a participant",
              description: "You can't download the file",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          }
        }}
        cursor={"pointer"}
      >
        <CustomText
          text={"Download File"}
          color={"#212121"}
          size={{ base: "12px", md: "14px" }}
          weight={500}
          height={{ base: "19.2px", md: "22.4px" }}
        />
      </Flex>
    </Flex>
  );
};

export default FileCard;
