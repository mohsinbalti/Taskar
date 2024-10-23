import CustomText from "@/components/fonts/text";
import { Box, Flex, Image } from "@chakra-ui/react";
import { IconX } from "@tabler/icons-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

//importing success icon
const success = "/icons/success.svg";

const Success = ({ toggle, title, details, btnText, link }: any) => {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  return (
    <Flex
      // maxWidth={"556px"}
      maxWidth={"644px"}
      width={"100%"}
      p={"32px"}
      direction={"column"}
      gap={"24px"}
      position={"relative"}
      border={"1px solid #ECECEC"}
      bg={"#FFF"}
      borderRadius={"16px"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* close icon */}
      <Box
        position={"absolute"}
        boxSize={"24px"}
        top={{ base: "12px", md: "24px" }}
        right={{ base: "12px", md: "24px" }}
        cursor={"pointer"}
        onClick={() => {
          if (!link) {
            router.push(`/task-detail/${params?.id}?status=submit`);
          } else {
            router.push(link);
          }
          toggle();
        }}
      >
        <IconX size={"24px"} color="#212121" />
      </Box>

      {/* success icon */}
      <Flex alignItems={"center"} justify={"center"}>
        <Image
          alt="Success Icon"
          src={success}
          width={"56px"}
          height={"56px"}
        />
      </Flex>

      {/* title and desc */}
      <Flex
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"12px"}
        maxWidth={"376px"}
      >
        <CustomText
          text={title ? title : "Transaction Success"}
          color={"#212121"}
          size={{ base: "18px", md: "24px" }}
          h={{ base: "21.6px", md: "28.8px" }}
          weight={600}
        />

        <CustomText
          text={
            details
              ? details
              : "Your task fee has been successfully paid, visit profile to see its status & make your submission."
          }
          color={"#666666"}
          size={{ base: "14px", md: "16px" }}
          h={{ base: "22.4px", md: "25.6px" }}
          align={"center"}
        />
      </Flex>

      {/* button */}
      <Box width={"100%"}>
        {/* <Link
          style={{
            textDecoration: "none",
            border: "none",
          }}
          href={link ? link : `/task-detail/${params?.id}?status=submit`}
        > */}
        <Flex
          p={{ base: "8px 40px", md: "14px 56px" }}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"30px"}
          bg={" #212121"}
          width={"100%"}
          cursor={"pointer"}
          onClick={() => {
            if (!link) {
              router.push(`/task-detail/${params?.id}?status=submit`);
            } else {
              router.push(link);
            }
            toggle();
          }}
        >
          <CustomText
            text={btnText ? btnText : "Take me to task"}
            size={{ base: "16px", md: "18px" }}
            weight={600}
            color={" #FFFFFF"}
            h={"28.8px"}
          />
        </Flex>
        {/* </Link> */}
      </Box>
    </Flex>
  );
};

export default Success;
