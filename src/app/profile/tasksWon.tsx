"use client";
import React, { useRef, useState } from "react";
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
  ModalHeader,
  ModalCloseButton,
  Input,
  Spinner,
  Text,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import CustomText from "@/components/fonts/text";
import { BlackButton, TransparentButton } from "@/components/buttons/button";
import { useGetTasksWon, useGetUserSubmissions } from "@/utils/task.api";
import { useRouter } from "next/navigation";

const TasksWon = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [imgUrl, setImgUrl] = useState("");
  const fileInputRef: any = useRef(null);

  const { data: tasksWonData, isLoading } = useGetTasksWon();

  const [taskData, setTaskData] = useState<any>({});

  return (
    <Stack
      p={{ base: "16px", md: "24px" }}
      borderRadius={"16px"}
      border="1px solid #ECECEC"
      gap="24px"
      bg="#fff"
    >
      <CustomText text="Tasks Won" size="20px" weight="600" h="120%" />
      {isLoading ? (
        <TaskCardLoading />
      ) : tasksWonData && tasksWonData?.some((task: any) => task?.isWinner) ? (
        tasksWonData?.map((task: any, index: any) => (
          <div key={index}>
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
                        Number(task?.prizeWon || 0)?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        }) || 0
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
            </Flex>

            {/* <Box mx="auto" mt="15px">
                <BlackButton
                  btnText={"View Submission"}
                  h="48px"
                  maxW="240px"
                  fontSize="16px"
                  onClick={() => {
                    onOpen();
                    setTaskData(task);
                  }}
                />
              </Box> */}
            <Divider opacity={1} borderColor={"#ECECEC"} mt="15px" />
          </div>
        ))
      ) : (
        <Flex
          flexDir="column"
          align="center"
          justify="center"
          my="24px"
          gap="16px"
        >
          <Image src="/icons/no_won_task.svg" alt="task" />
          <Flex flexDir="column" gap="4px" align="center" justify="center">
            <CustomText
              text="No Task Won"
              size={{ base: "16px", md: "20px" }}
              weight="600"
            />
            <CustomText
              text="You have not won any task yet"
              size="14px"
              weight="400"
              color="#666"
            />
          </Flex>
          <BlackButton
            btnText="Explore Tasks"
            h="48px"
            maxW="296px"
            onClick={() => router.push("/")}
          />
        </Flex>
      )}

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: "xs", sm: "sm", md: "xl" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody pt="32px" px="24px" pb="24px">
            <Image
              src={taskData.image || "/images/example-task.png"}
              alt=""
              w="100%"
              objectFit={"cover"}
              borderRadius={"12px"}
              mb="24px"
            />
            <CustomText
              text={taskData.title || "N/A"}
              size="32px"
              weight="700"
              h="120%"
              mb="12px"
            />
            <CustomText
              text={taskData?.description || "N/A"}
              h="160%"
              color="#666"
            />
          </ModalBody>

          <ModalFooter>
            <SimpleGrid spacing="12px" w="100%" columns={{ md: 2 }}>
              <Box w="100%">
                <TransparentButton
                  h="57px"
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
    </Flex>
  );
};

export default TasksWon;
