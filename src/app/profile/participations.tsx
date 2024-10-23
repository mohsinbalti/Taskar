"use client";
import React, { useState } from "react";
import {
  Box,
  Center,
  Divider,
  Flex,
  Image,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  useDisclosure,
  SimpleGrid,
  Spinner,
  Text,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import CustomText from "@/components/fonts/text";
import { BlackButton, TransparentButton } from "@/components/buttons/button";
import { useGetTaskParticipations } from "@/utils/task.api";
import { useRouter } from "next/navigation";
const Participations = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: tasksParticipation, isLoading } = useGetTaskParticipations();
  const [taskData, setTaskData] = useState<any>({});
  const [isBtnVisible, setIsBtnVisible] = useState(-1);

  return (
    <Stack
      p={{ base: "16px", md: "24px" }}
      borderRadius={"16px"}
      border="1px solid #ECECEC"
      gap="24px"
      bg="#fff"
    >
      <CustomText text="Participations" size="20px" weight="600" h="120%" />
      {isLoading ? (
        <TaskCardLoading />
      ) : tasksParticipation &&
        tasksParticipation.some((task: any) => !task.isWinner) ? (
        tasksParticipation.map((task: any, index: any) =>
          !task.isWinner ? (
            <React.Fragment key={index}>
              <Flex gap={"24px"} align={"start"} wrap="wrap">
                <Image
                  src={
                    task?.task?.icon ||
                    task?.task?.picture ||
                    "https://via.placeholder.com/150"
                  }
                  alt=""
                  w={"50px"}
                  h={"50px"}
                />
                <Stack gap="8px" maxW="576px" w="100%">
                  <CustomText
                    text={task?.task?.title || "N/A"}
                    size="20px"
                    weight="600"
                    h="160%"
                  />
                  <CustomText
                    text={task?.task?.description || "N/A"}
                    color="#666666"
                    h="160%"
                    noOfLines="2"
                  />
                  <Flex gap="48px" mt="8px">
                    <Stack gap="2px">
                      <CustomText
                        color="#666"
                        text="Prize Won"
                        size="14px"
                        h="140%"
                      />
                      <CustomText
                        text={`$${
                          Number(task?.prizeWon || 0)?.toLocaleString(
                            undefined,
                            {
                              maximumFractionDigits: 2,
                            }
                          ) || 0
                        }`}
                        size="18px"
                        h="150%"
                        weight="600"
                      />
                    </Stack>
                    <Stack gap="2px">
                      <CustomText
                        color="#666"
                        text="Points Earned"
                        size="14px"
                        h="140%"
                      />
                      <CustomText
                        text={`${task?.pointsEarned || 0}`}
                        size="18px"
                        h="150%"
                        weight="600"
                      />
                    </Stack>
                  </Flex>
                </Stack>
                <Box
                  flexGrow={1}
                  h="156px"
                  bgImage={task?.image || "/images/no-submission.svg"}
                  bgSize={"cover"}
                  bgRepeat={"no-repeat"}
                  bgPosition={"center"}
                  borderRadius={"12px"}
                  minW={{ base: "240px", md: "320px" }}
                  position="relative"
                  onMouseEnter={() => setIsBtnVisible(task?.id)}
                  onMouseLeave={() => setIsBtnVisible(-1)}
                >
                  <Center
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    bg="#26323899"
                    borderRadius={"12px"}
                    opacity={isBtnVisible === task?.id ? 1 : 0}
                  >
                    <BlackButton
                      btnText={"View Submission"}
                      h="48px"
                      bg="white"
                      color="black"
                      w="80%"
                      fontSize="16px"
                      onClick={() => {
                        onOpen();
                        setTaskData(task);
                      }}
                    />
                  </Center>
                </Box>
              </Flex>
              <Divider opacity={1} borderColor={"#ECECEC"} />
            </React.Fragment>
          ) : null
        )
      ) : (
        <Flex
          flexDir="column"
          align="center"
          justify="center"
          my="24px"
          gap="16px"
        >
          <Image src="/icons/no_parti_task.svg" alt="task" />
          <Flex flexDir="column" gap="4px" align="center" justify="center">
            <CustomText
              text="Not Participating"
              size={{ base: "16px", md: "20px" }}
              weight="600"
            />
            <CustomText
              text="You are not participating in any task."
              size="14px"
              weight="400"
              color="#666"
            />
          </Flex>
        </Flex>
      )}

      {/* <CustomText
        text="Show more"
        weight="600"
        h="160%"
        align="center"
        cursor="pointer"
      /> */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "xs", sm: "sm", md: "xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody pt="32px" px="24px" pb="24px">
            <Image
              src={taskData?.image || "/images/no-submission.svg"}
              alt=""
              w="100%"
              maxH="250px"
              objectFit={"cover"}
              borderRadius={"12px"}
              mb="24px"
              display={taskData?.image ? "block" : "none"}
            />
            <CustomText
              text={taskData?.task?.title || "N/A"}
              size="32px"
              weight="700"
              h="120%"
              mb="12px"
            />
            <CustomText
              text={
                taskData?.task?.description?.length > 200
                  ? taskData?.task?.description?.substring(0, 200) + "..."
                  : taskData?.task?.description || "N/A"
              }
              h="160%"
              color="#666"
            />
          </ModalBody>

          <ModalFooter>
            <SimpleGrid spacing="12px" w="100%" columns={{ md: 2 }}>
              <Box w="100%">
                <TransparentButton
                  h="48px"
                  w="100%"
                  btnText="Cancel"
                  fontSize="18px"
                  onClick={onClose}
                />
              </Box>
              <Box w="100%">
                <BlackButton
                  h="48px"
                  btnText="View Details"
                  onClick={() =>
                    router.push(`/task-detail/${taskData?.taskId}`)
                  }
                />
              </Box>
            </SimpleGrid>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

const TaskCardLoading = () => {
  return (
    <Flex gap={"24px"} align={"start"} wrap="wrap">
      <Skeleton w={"50px"} h={"50px"} />
      <Stack gap="8px" maxW="576px" w="100%">
        <SkeletonText noOfLines={1} w="120px" />
        <SkeletonText noOfLines={4} w="100%" />
        <Flex gap="48px" mt="8px">
          <Stack gap="2px">
            <SkeletonText noOfLines={1} w="120px" />
            <SkeletonText noOfLines={1} w="80px" />
          </Stack>
          <Stack gap="2px">
            <SkeletonText noOfLines={1} w="120px" />
            <SkeletonText noOfLines={1} w="80px" />
          </Stack>
        </Flex>
      </Stack>
      <Skeleton
        h="156px"
        borderRadius={"12px"}
        minW={{ base: "240px", md: "620px" }}
      />
    </Flex>
  );
};

export default Participations;
