"use client";
import { BlackButton } from "@/components/buttons/button";
import CustomText from "@/components/fonts/text";
import UploadFileModal from "@/components/task/taskDetail/taskTitleCard/submitFIle/upload";
import { useGetActiveTaskOfUser } from "@/utils/task.api";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Image,
  Center,
  Spinner,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
const ActiveTasks = () => {
  const router = useRouter();
  const [taskStatus, setTaskStatus] = useState("");
  const {
    data: activeTask,
    isLoading,
    refetch,
  } = useGetActiveTaskOfUser(taskStatus);
  const [toggle, setToggle] = useState(false);
  const [index, setIndex] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState(null); // State variable to store the selected task ID
  const [selectedTaskTitle, setSelectedTaskTitle] = useState("");
  const [selectedTaskType, setSelectedTaskType] = useState("");
  const [selectedTaskIcon, setSelectedTaskIcon] = useState("");

  // Function to toggle modal visibility
  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    refetch();
  }, [taskStatus]);

  return (
    <Box
      py="24px"
      px={{ base: "12px", md: "24px" }}
      borderRadius={"16px"}
      bg="#fff"
      border="1px solid #ECECEC"
    >
      <CustomText
        text="Active Tasks"
        weight="600"
        h="120%"
        size={{ base: "16px", md: "20px" }}
      />
      <Tabs
        align="start"
        onChange={(e) => {
          setIndex(e);
          if (e === 0) {
            setTaskStatus("");
          } else if (e === 2) {
            setTaskStatus("In progress");
          } else if (e === 1) {
            setTaskStatus("Submitted");
          } else if (e === 3) {
            setTaskStatus("Overdue");
          }
        }}
      >
        <TabList overflowX={{ base: "auto", sm: "inherit" }} overflowY="hidden">
          {["All Tasks", "Completed", "In Process", "Overdue"].map(
            (item, idx) => (
              <Tab
                key={idx}
                color={index === idx ? "#212121" : "#666"}
                fontWeight={index === idx ? "500" : "400"}
                lineHeight={"20px"}
                px="0"
                mr="25px"
                mt={{ base: "25px" }}
                whiteSpace="nowrap"
              >
                {item}
              </Tab>
            )
          )}
        </TabList>
        <TabPanels>
          <TabPanel px="0px">
            <SimpleGrid
              spacing={"16px"}
              columns={activeTask?.length === 0 ? 1 : { md: 2, lg: 3 }}
            >
              {isLoading ? (
                [1, 2]?.map((_, idx) => <CardLoading key={idx} />)
              ) : activeTask?.length === 0 ? (
                <NoTask />
              ) : (
                activeTask?.map((task: any) => {
                  const deadline: any = new Date(task?.deadline);
                  const currentDate: any = new Date();
                  const differenceMs = deadline - currentDate;

                  // Convert milliseconds to days.
                  const daysRemaining = Math.ceil(
                    differenceMs / (1000 * 60 * 60 * 24)
                  );
                  return (
                    <React.Fragment key={task?.id}>
                      <Card
                        img={task?.icon || "https://via.placeholder.com/150"}
                        title={task?.title}
                        taskId={task?.id}
                        des={
                          task?.description
                            ? task.description.substring(0, 30)
                            : ""
                        }
                        status={task?.status}
                        result={
                          task?.status?.toLowerCase() === "completed"
                            ? "Result Announced"
                            : task?.result === "0 days 0 hours left"
                            ? "Result Awaiting"
                            : task?.result
                        }
                        btnText={
                          task?.status === "In progress"
                            ? "Submit a File"
                            : "View Task"
                        }
                        onClick={(e: any) => {
                          e.stopPropagation(); // Prevent the card click event
                          if (task?.status !== "In progress") {
                            router.push(`/task-detail/${task?.id}`);
                          } else {
                            setSelectedTaskId(task?.id);
                            setSelectedTaskTitle(task?.title);
                            setSelectedTaskIcon(task?.icon);
                            setSelectedTaskType(
                              task?.categories?.[0]?.categoryName ||
                                task?.categories?.[1]?.categoryName
                            );
                            handleToggle(); // Show the modal
                          }
                        }}
                      />
                    </React.Fragment>
                  );
                })
              )}
            </SimpleGrid>
          </TabPanel>
          <TabPanel px="0px">
            <SimpleGrid
              spacing={"16px"}
              columns={activeTask?.length === 0 ? 1 : { md: 2, lg: 3 }}
            >
              {isLoading ? (
                [1, 2]?.map((_, idx) => <CardLoading key={idx} />)
              ) : activeTask?.length === 0 ? (
                <NoTask />
              ) : (
                activeTask?.map((task: any) => {
                  const deadline: any = new Date(task?.deadline);
                  const currentDate: any = new Date();
                  const differenceMs = deadline - currentDate;

                  // Convert milliseconds to days
                  const daysRemaining = Math.ceil(
                    differenceMs / (1000 * 60 * 60 * 24)
                  );
                  return (
                    <Card
                      key={task?.id}
                      taskId={task?.id}
                      img={task?.icon || "https://via.placeholder.com/150"}
                      title={task?.title}
                      des={
                        task?.description
                          ? task.description.substring(0, 30)
                          : ""
                      }
                      status={task?.status}
                      result={
                        task?.status?.toLowerCase() === "completed"
                          ? "Result Announced"
                          : task?.result
                      }
                      btnText={
                        task?.status === "In progress"
                          ? "Submit a File"
                          : "View Task"
                      }
                      onClick={(e: any) => {
                        e.stopPropagation(); // Prevent the card click event
                        if (task?.status !== "In progress") {
                          router.push(`/task-detail/${task?.id}`);
                        } else {
                          setSelectedTaskId(task?.id);
                          setSelectedTaskTitle(task?.title);
                          setSelectedTaskIcon(task?.icon);
                          setSelectedTaskType(
                            task?.categories?.[0]?.categoryName ||
                              task?.categories?.[1]?.categoryName
                          );

                          handleToggle(); // Show the modal
                        }
                      }}
                    />
                  );
                })
              )}
            </SimpleGrid>
          </TabPanel>
          <TabPanel px="0px">
            <SimpleGrid
              spacing={"16px"}
              columns={activeTask?.length === 0 ? 1 : { md: 2, lg: 3 }}
            >
              {isLoading ? (
                [1, 2]?.map((_, idx) => <CardLoading key={idx} />)
              ) : activeTask?.length === 0 ? (
                <NoTask />
              ) : (
                activeTask?.map((task: any) => {
                  const deadline: any = new Date(task?.deadline);
                  const currentDate: any = new Date();
                  const differenceMs = deadline - currentDate;

                  // Convert milliseconds to days
                  const daysRemaining = Math.ceil(
                    differenceMs / (1000 * 60 * 60 * 24)
                  );
                  return (
                    <Card
                      key={task?.id}
                      taskId={task?.id}
                      img={task?.icon || "https://via.placeholder.com/150"}
                      title={task?.title}
                      des={
                        task?.description
                          ? task.description.substring(0, 30)
                          : ""
                      }
                      status={task?.status}
                      result={
                        task?.status?.toLowerCase() === "completed"
                          ? "Result Announced"
                          : task?.result
                      }
                      btnText={
                        task?.status === "In progress"
                          ? "Submit a File"
                          : "View Task"
                      }
                      onClick={(e: any) => {
                        e.stopPropagation(); // Prevent the card click event
                        if (task?.status !== "In progress") {
                          router.push(`/task-detail/${task?.id}`);
                        } else {
                          setSelectedTaskId(task?.id);
                          setSelectedTaskTitle(task?.title);
                          setSelectedTaskIcon(task?.icon);
                          setSelectedTaskType(
                            task?.categories?.[0]?.categoryName ||
                              task?.categories?.[1]?.categoryName
                          );

                          handleToggle();
                        }
                      }}
                    />
                  );
                })
              )}
            </SimpleGrid>
          </TabPanel>
          <TabPanel px="0px">
            <SimpleGrid
              spacing={"16px"}
              columns={activeTask?.length === 0 ? 1 : { md: 2, lg: 3 }}
            >
              {isLoading ? (
                [1, 2]?.map((_, idx) => <CardLoading key={idx} />)
              ) : activeTask?.length === 0 ? (
                <NoTask />
              ) : (
                activeTask?.map((task: any) => {
                  const deadline: any = new Date(task?.deadline);
                  const currentDate: any = new Date();
                  const differenceMs = deadline - currentDate;

                  // Convert milliseconds to days
                  const daysRemaining = Math.ceil(
                    differenceMs / (1000 * 60 * 60 * 24)
                  );
                  return (
                    <Card
                      key={task?.id}
                      taskId={task?.id}
                      img={task?.icon || "https://via.placeholder.com/150"}
                      title={task?.title}
                      des={
                        task?.description
                          ? task.description.substring(0, 30)
                          : ""
                      }
                      status={task?.status}
                      result={
                        task?.status?.toLowerCase() === "completed"
                          ? "Result Announced"
                          : task?.result
                      }
                      btnText={
                        task?.status === "In progress"
                          ? "Submit a File"
                          : "View Task"
                      }
                      onClick={(e: any) => {
                        e.stopPropagation(); // Prevent the card click event
                        if (task?.status !== "In progress") {
                          router.push(`/task-detail/${task?.id}`);
                        } else {
                          setSelectedTaskId(task?.id);
                          setSelectedTaskTitle(task?.title);
                          setSelectedTaskIcon(task?.icon);
                          setSelectedTaskType(
                            task?.categories?.[0]?.categoryName ||
                              task?.categories?.[1]?.categoryName
                          );
                          handleToggle(); // Show the modal
                        }
                      }}
                    />
                  );
                })
              )}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* </Modal> */}
      {toggle && (
        <>
          <Drawer
            isOpen={toggle}
            onClose={handleToggle}
            initialFocusRef={undefined}
            trapFocus={false}
          >
            <DrawerOverlay
              bg={"rgba(33, 33, 33, 0.20)"}
              backdropFilter={" blur(3px)"}
              width={"100%"}
            />
            <DrawerContent
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
              maxWidth={"644px"}
            >
              <DrawerBody p="0">
                <UploadFileModal
                  toggle={handleToggle}
                  taskId={selectedTaskId}
                  title={selectedTaskTitle}
                  icon={selectedTaskIcon}
                  type={selectedTaskType}
                />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </Box>
  );
};
export default ActiveTasks;

const Card = ({
  img,
  title,
  des,
  status,
  result,
  btnText,
  onClick,
  taskId,
}: any) => {
  const router = useRouter();
  return (
    <Box
      py="24px"
      px={{ base: "12px", md: "24px" }}
      borderRadius={"16px"}
      border="1px solid #ECECEC"
      onClick={(e: any) => {
        // console.log(e.target.tagName);
        // Prevent button clicks from triggering card navigation
        if (e.target.tagName !== "BUTTON") {
          router.push(`/task-detail/${taskId}`);
        }
      }}
    >
      <Image src={img} w="44px" h={"44px"} alt="" mb="16px" />
      <CustomText
        text={title}
        weight="600"
        h="100%"
        size={{ base: "16px", md: "20px" }}
        mb="12px"
      />
      <CustomText color="#666" text={des} noOfLines={2} size="14px" h="16px" />
      <SimpleGrid columns={2} spacing={"16px"} my="32px">
        <CustomText
          color="#666"
          text="Status"
          weight="500"
          size="14px"
          h="16px"
        />
        <CustomText
          color="#666"
          text="Result"
          size="14px"
          h="16px"
          align="right"
        />
        <Center
          w="fit-content"
          px="13px"
          h="28px"
          bg={
            status === "In progress"
              ? "#5BC0EB"
              : status === "submitted"
              ? "#59C778"
              : status === "Completed"
              ? "#56CDAD"
              : "#FF6550"
          }
          color="white"
          borderRadius={"20px"}
          fontWeight={"600"}
          fontSize={"12px"}
          textTransform="capitalize"
        >
          {status}
        </Center>
        <Center
          w="fit-content"
          px="13px"
          h="28px"
          bg="#F6F6F6"
          color="#212121"
          borderRadius={"20px"}
          fontWeight={"600"}
          fontSize={"12px"}
          ml="auto"
          textTransform={"capitalize"}
        >
          {result}
        </Center>
      </SimpleGrid>
      <BlackButton
        btnText={btnText}
        fontSize="16px"
        fontWeight="500"
        h="48px"
        onClick={onClick}
      />
    </Box>
  );
};

const CardLoading = () => {
  return (
    <Box
      py="24px"
      px={{ base: "12px", md: "24px" }}
      borderRadius={"16px"}
      border="1px solid #ECECEC"
    >
      <Skeleton boxSize="44px" mb="16px" />
      <SkeletonText noOfLines={2} w="100%" />
      <SkeletonText noOfLines={2} w="100%" />
      <SimpleGrid columns={2} spacing={"16px"} my="32px">
        <SkeletonText noOfLines={1} w="80px" />
        <SkeletonText noOfLines={1} w="80px" />
        <Skeleton h="28px" borderRadius="20px" w="120px" />
        <Skeleton h="28px" borderRadius="20px" w="120px" />
      </SimpleGrid>
      <Skeleton h="48px" w="100%" />
    </Box>
  );
};

const NoTask = () => {
  return (
    <Flex flexDir="column" align="center" justify="center" w="100%">
      <Image src="/icons/no_task.svg" alt="task" />
      <Flex flexDir="column" gap="4px" justify="center" align="center">
        <CustomText
          text="No Task"
          size={{ base: "16px", md: "20px" }}
          weight="600"
        />
        <CustomText
          text="No task available for now."
          size="14px"
          weight="400"
          color="#666"
        />
      </Flex>
    </Flex>
  );
};
