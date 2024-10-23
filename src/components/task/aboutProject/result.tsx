import CustomText from "@/components/fonts/text";
import { Avatar, Flex } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Result = ({ winner }: any) => {
  const { data: user }: any = useQuery({
    queryKey: ["getLoggedInUser"],
  });

  return (
    <Flex
      direction={"column"}
      p={"16px"}
      gap={"20px"}
      borderRadius={"16px"}
      bg={"#212121"}
      alignItems={"flex-start"}
    >
      {/* row 1 profile */}
      <Flex
        p={"12px"}
        // justifyContent={"space-between"}
        alignItems={"center"}
        borderRadius={"12px"}
        bg={"linear-gradient(162deg, #212121 4.83%, #2D2D2D 103.44%)"}
        gap={"12px"}
        width={"100%"}
        minWidth={{ md: "376px" }}
      >
        <Avatar
          src={user?.picture || `/avatars/placeholder.jpg`}
          boxSize={{ base: "36px", md: "50px" }}
        />
        <Flex direction={"column"} justifyContent={"start"} gap={"8px"}>
          <CustomText
            text={user?.fullname}
            weight={300}
            size={"20px"}
            h={"normal"}
            color={"#FFF"}
          />
          <CustomText
            text={user?.email}
            weight={400}
            size={"12px"}
            h={"normal"}
            color={"#FFF"}
          />
        </Flex>
      </Flex>

      {/* row 2 stats */}
      <Flex gap={"16px"} direction={"column"} width={"100%"}>
        {/* inner row 1 */}
        <Flex justifyContent={"space-between"} width={"100%"}>
          <Flex direction={"column"} gap={"2px"} alignItems={"flex-start"}>
            <CustomText
              text={"Prize"}
              color={"#FFF"}
              size={{ base: "12px", md: "14px" }}
              h={{ base: "18px", md: "21px" }}
            />

            <CustomText
              text={Number(
                winner?.participation?.prizeWon || 0
              )?.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
              color={"#FFF"}
              size={{ base: "14px", md: "16px" }}
              h={{ base: "21px", md: "24px" }}
              weight={600}
            />
          </Flex>
          <Flex direction={"column"} gap={"2px"} alignItems={"flex-end"}>
            <CustomText
              text={"Points Earned"}
              color={"#FFF"}
              size={{ base: "12px", md: "14px" }}
              h={{ base: "18px", md: "21px" }}
            />
            <CustomText
              text={winner?.participation?.pointsEarned || 0}
              color={"#FFF"}
              size={{ base: "14px", md: "16px" }}
              h={{ base: "21px", md: "24px" }}
              weight={600}
            />
          </Flex>
        </Flex>
        {/* inner row 2 */}
        <Flex justifyContent={"space-between"} width={"100%"}>
          <Flex direction={"column"} gap={"2px"} alignItems={"flex-start"}>
            <CustomText
              text={"Category"}
              color={"#FFF"}
              size={{ base: "12px", md: "14px" }}
              h={{ base: "18px", md: "21px" }}
            />

            <CustomText
              text={winner?.category?.[0]?.categoryName}
              color={"#FFF"}
              size={{ base: "14px", md: "16px" }}
              h={{ base: "21px", md: "24px" }}
              weight={600}
            />
          </Flex>
          <Flex
            direction={"column"}
            gap={"2px"}
            alignItems={"flex-end"}
            display={{ base: "flex", md: "none" }}
          >
            <CustomText
              text={"Total Submissions"}
              color={"#FFF"}
              size={{ base: "12px", md: "14px" }}
              h={{ base: "18px", md: "21px" }}
            />

            <CustomText
              text={"02"}
              color={"#FFF"}
              size={{ base: "14px", md: "16px" }}
              h={{ base: "21px", md: "24px" }}
              weight={600}
            />
          </Flex>
        </Flex>
      </Flex>

      {/* row 3 having button  */}
      {/* <Flex
          p={"10px"}
          justifyContent={"center"}
          alignItems={"center"}
          borderRadius={"80px"}
          bg={"#FFF"}
          width={"100%"}
          cursor={"pointer"}
          onClick={() =>
            router.push(`/profile/${winner?.winner?.userDetails?.id}`)
          }
        >
          <CustomText
            text={"View Winner Profile"}
            color={"#212121"}
            size={{ base: "16px", md: "16px" }}
            h={{ base: "25.6px", md: "25.6px" }}
            weight={500}
          />
        </Flex> */}
    </Flex>
  );
};

export default Result;
