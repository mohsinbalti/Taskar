import { Flex, Image, Spinner } from "@chakra-ui/react";
import React, { useState } from "react";
import Notification from "./notification";
import CustomText from "../fonts/text";
import { useGetUpcomingDeadlines } from "@/utils/task.api";

const Notifications = () => {
  const { data: UpcomingDeadlines, isLoading } = useGetUpcomingDeadlines();
  const [seeAll, setSeeAll] = useState(false);

  return (
    <Flex
      width={"307px"}
      p={"16px"}
      direction={"column"}
      alignItems={"self-start"}
      gap={"16px"}
      borderRadius={"16px"}
      border={"1px solid #ECECEC"}
      bg={"#FFF"}
    >
      <CustomText
        text={"Upcoming Deadlines"}
        color={"#212121"}
        size={"20px"}
        weight={600}
        h={"24px"}
      />
      {UpcomingDeadlines?.length === 0 ? (
        <Flex flexDir="column" align="center" justify="center" mb="16px">
          <Image src="/icons/no_upcoming.svg" alt="deadlines" />
          <Flex flexDir="column" gap="4px">
            <CustomText
              text="No Deadline Pending"
              size={{ base: "16px", md: "20px" }}
              weight="600"
            />
            <CustomText
              text="You have no pending deadlines"
              size="14px"
              weight="400"
              color="#666"
            />
          </Flex>
        </Flex>
      ) : seeAll ? (
        UpcomingDeadlines?.map((data: any, idx: number) => (
          <Notification data={data} key={idx} isLoading={isLoading} />
        ))
      ) : (
        UpcomingDeadlines?.length > 0 && (
          <Notification data={UpcomingDeadlines[0]} isLoading={isLoading} />
        )
      )}
      {/* <Notification />
      <Notification borderTop /> */}
      <Flex
        display={UpcomingDeadlines?.length === 0 ? "none" : "flex"}
        py={"10px"}
        borderRadius={"80px"}
        width={"full"}
        alignItems={"center"}
        justifyContent={"center"}
        border={"1px solid #212121"}
        cursor={"pointer"}
        onClick={() => {
          seeAll ? setSeeAll(false) : setSeeAll(true);
        }}
      >
        <CustomText
          text={seeAll ? "View Less" : "View All"}
          color={"#212121"}
          size={"16px"}
          weight={500}
          h={"25.6px"}
        />
      </Flex>
    </Flex>
  );
};

export default Notifications;
