"use client";
import CustomText from "@/components/fonts/text";
import SimilarTask from "@/components/general cards/similarTask";
import Tags from "@/components/general cards/tags";
import Description from "@/components/task/aboutProject/description";
import DetailInfo from "@/components/task/aboutProject/detailInfo";
import TitleCard from "@/components/task/taskDetail/taskTitleCard/titleCard";
import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Skeleton,
  SkeletonText,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { IconArrowRight, IconTornado } from "@tabler/icons-react";
import React, { useState } from "react";
import FileSubmission from "@/components/task/taskDetail/fileSubmission/fileSubmission";
import AboutProject from "@/components/task/aboutProject/aboutProject";
import Deadline from "@/components/task/aboutProject/deadline";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  useClaimTask,
  useGetSimilarTasks,
  useGetTaskById,
  useGetTaskWinner,
} from "@/utils/task.api";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import Confetti from "react-confetti";
import { BlackButton } from "@/components/buttons/button";
import { useGetLoggedInUser } from "@/utils/auth.api";

const TaskDetail = () => {
  const [isMoreThan1200] = useMediaQuery(`(min-width: 1200px)`);

  const {
    isOpen: isCollectOpen,
    onOpen: onCollectOpen,
    onClose: onCollectClose,
  } = useDisclosure();

  const router = useRouter();
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  const claimTask = useClaimTask();
  const { data: userInfo, isLoading: userInfoLoading } = useGetLoggedInUser();
  const { data: task, isLoading: taskLoading } = useGetTaskById(params.id);
  const { data: similarTasks, isLoading: similarTasksLoading } =
    useGetSimilarTasks(task?.id);
  const { data: winnerData } = useGetTaskWinner(params.id);
  const [btnText, setBtnText] = useState("Start Task"); // this will use for this page rendering in 3 diff ways
  const [isExplode, setIsExplode] = useState(false);

  React.useEffect(() => {
    const currentDate = new Date();
    const deadline = new Date(task?.deadline);

    if (task?.participation?.status === "In progress") {
      setBtnText("Submit a File");
    } else if (
      task?.participation?.status === "Submitted" ||
      task?.participation?.status === "Overdue"
    ) {
      setBtnText("Result Awaiting");
    } else if (task?.participation?.status === "Result Announced") {
      setBtnText("Result Announced");
    } else if (!task?.participation?.status) {
      setBtnText("Start Task");
    } else {
      setBtnText(task?.status);
    }

    // if (winnerData?.length > 0) {
    //   setBtnText("Result Announced");
    // }

    if (task?.participation?.isWinner && !task?.participation?.isClaimed) {
      onCollectOpen();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, task?.deadline, winnerData, task?.participation]);

  React.useEffect(() => {
    if (!userInfoLoading && userInfo && !userInfo?.isVerified) {
      router.push("/");
    }
  }, [userInfo, router]);

  return (
    <DashboardLayout>
      <Flex
        direction={"column"}
        gap={"24px"}
        mx={"auto"}
        maxWidth={"1440px"}
        px={{ base: "16px", md: "32px" }}
      >
        <Box display={{ base: "none", md: "block" }}>
          <p
            style={{
              color: "black",
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <span style={{ color: "#8f9197" }} onClick={() => router.push("/")}>
              <a href="#">Home</a>
            </span>{" "}
            <span style={{ color: "#8f9197" }}>/</span>
            <span style={{ color: "#8f9197" }} onClick={() => router.push("/")}>
              <a href="#"> Tasks</a>
            </span>{" "}
            <span style={{ color: "#8f9197" }}>/</span>{" "}
            <span>
              {taskLoading ? (
                <SkeletonText noOfLines={1} w="100px" />
              ) : (
                task?.title
              )}
            </span>
          </p>
        </Box>

        <TitleCard task={task} btnText={btnText} isLoading={taskLoading} />

        <Box display={{ base: "block", md: "none" }}>
          {/* before start project 1 */}
          {btnText.includes("Start") ? (
            <AboutProject before task={task} winnerData={winnerData} />
          ) : btnText.includes("Submit") ? (
            <Box>
              {" "}
              <Deadline deadline={task?.deadline} />
            </Box>
          ) : (
            <></>
          )}
        </Box>
        {/* desc and task detail and deadline about this task etc */}
        <Flex
          gap={"40px"}
          mt={{ base: "0px", md: "0px" }}
          py={"0px"}
          justify="space-between"
        >
          {/* project detail desc tags etc */}
          <Box className="taskdetails">
            {" "}
            {/* description */}
            <Description task={task} isLoading={taskLoading} />
            {/* detail info & required skills etc */}
            <Flex
              direction={"column"}
              mt={{ base: "24px", md: "40px" }}
              gap={{ base: "24px", md: "40px" }}
              maxWidth={"752px"}
              width={"100%"}
            >
              <DetailInfo
                title="Deliverables"
                info={task?.deliverables}
                isLoading={taskLoading}
              />
              <DetailInfo
                title="Must-Haves"
                info={task?.mustHave}
                isLoading={taskLoading}
              />

              {/* TAGS */}
              <Flex
                gap={{ base: "24px", md: "30px" }}
                direction={{ base: "column", md: "row" }}
                pt={{ base: "24px", md: "0px" }}
                borderTop={{ base: "1px solid #ECECEC", md: "0px" }}
              >
                {/* required skills */}
                <Tags
                  title={"Required Skills"}
                  tags={task?.skills?.map((skill: any) => skill?.skillName)}
                  isLoading={taskLoading}
                />
                {/* categories */}
                <Tags
                  title={"Categories"}
                  tags={task?.category?.map(
                    (category: any) => category?.categoryName
                  )}
                  isColored
                  isLoading={taskLoading}
                />
              </Flex>

              <Box display={{ base: "block", md: "none" }}>
                {/* about project in mobile view  */}
                {/* but will only show during and after result */}

                {!btnText.includes("Start") && (
                  <AboutProject
                    before
                    task={task}
                    winnerData={winnerData}
                    isLoading={taskLoading}
                  />
                )}
              </Box>

              {!btnText.includes("Start") && (
                <FileSubmission taskId={params.id} />
              )}
            </Flex>
          </Box>
          {/* about project card in MD */}
          {/* it will show Deadling before and during project  */}
          {/* it will show RESULT after project  */}
          <Box
            display={{ base: "none", md: "block" }}
            className="taskdetails-sidebar"
          >
            {/* <AboutProject /> */}
            {btnText.includes("Result") ? (
              <AboutProject
                task={task}
                winnerData={winnerData}
                isLoading={taskLoading}
              />
            ) : (
              <AboutProject
                task={task}
                winnerData={winnerData}
                isLoading={taskLoading}
              />
            )}
          </Box>
        </Flex>

        {/*  similar tasks */}
        <Flex
          mt={{ md: "8px" }}
          py={{ base: "12px", md: "32px" }}
          direction={"column"}
          gap={{ base: "20px", md: "32px" }}
        >
          <Flex justifyContent={"space-between"} width={"100%"}>
            <CustomText
              text={` Similar Tasks`}
              size={{ base: "24px", md: "32px" }}
              h={{ base: "28.8px", md: "38.4px" }}
              weight={600}
              color={"#212121"}
            />
            <Flex
              gap={"12px "}
              cursor={"pointer"}
              display={similarTasks?.length ? "flex" : "none"}
              onClick={() => router.push("/")}
            >
              <CustomText
                text={`Show all Tasks`}
                size={{ base: "12px", md: "16px" }}
                h={"25.6px"}
                weight={600}
                color={"#212121"}
              />
              <IconArrowRight size={"24px"} color={"#212121"} />
            </Flex>
          </Flex>
          <Flex
            // justifyContent={"center"}
            // border={"1px solid red"}
            gap={{ base: "16px 12px", md: "32px" }}
            wrap={"wrap"}
          >
            {similarTasksLoading ? (
              [1, 2].map((_, idx) => (
                <Skeleton
                  key={idx}
                  borderRadius="16px"
                  w={{ base: "100%", md: "276px" }}
                  h="240px"
                  opacity="0.2"
                />
              ))
            ) : !similarTasks?.length ? (
              <Flex
                flexDir="column"
                gap="24px"
                align="center"
                justify="center"
                w="100%"
                minH="240px"
                bg="#fff"
                borderRadius="8px"
                border="1px solid #eaeaea"
              >
                <IconTornado size="48px" color="#6F49FE" />
                <CustomText
                  text={"No Similar Tasks Found"}
                  weight={600}
                  color={"#212121"}
                />
                <BlackButton
                  btnText="Explore Tasks"
                  maxW="160px"
                  h="40px"
                  onClick={() => router.push("/")}
                />
              </Flex>
            ) : (
              similarTasks?.map((similarTask: any, idx: number) => (
                <SimilarTask
                  key={idx}
                  title={similarTask?.title}
                  icon={similarTask?.icon || "https://via.placeholder.com/150"}
                  desc={similarTask?.description}
                  onClick={() => {
                    router.push(`/task-detail/${similarTask?.id}`);
                  }}
                />
              ))
            )}
          </Flex>
        </Flex>

        {/* Collect Popup */}
        <Modal isOpen={isCollectOpen} onClose={() => {}} isCentered>
          <ModalOverlay />
          <ModalContent
            maxW="600px"
            p={{ base: "24px", md: "48px" }}
            mx="20px"
            pos="relative"
            overflow="hidden"
          >
            <ModalBody p="0px">
              {/* <Image
                src="/images/confetti.svg"
                alt="confetti"
                pos="absolute"
                top="0"
                left="0"
                zIndex="-1"
              /> */}
              <Flex
                align="center"
                gap={{ base: "16px", md: "24px" }}
                flexDir="column"
                zIndex="100"
              >
                <CustomText
                  text={"Congratulations!"}
                  size={{ base: "20px", md: "28px" }}
                  weight={700}
                  color="#212121"
                />
                <CustomText
                  text={"You have earned reward for"}
                  size={{ base: "14px", md: "16px" }}
                  weight={400}
                  color="#212121"
                />
                <Flex
                  px="10px"
                  py="6px"
                  align="center"
                  justify="center"
                  bg={
                    task?.category?.[0]?.bgColorCode ||
                    "rgba(38, 164, 255, 0.10)"
                  }
                  borderRadius="84px"
                >
                  <CustomText
                    text={task?.category?.[0]?.categoryName}
                    size={{ base: "12px", md: "16px" }}
                    weight={500}
                    color={task?.category?.[0]?.textColorCode || "#26A4FF"}
                  />
                </Flex>
                <CustomText
                  text={task?.title || ""}
                  size={{ base: "20px", md: "28px" }}
                  weight={700}
                  color="#141414"
                />
                <Flex
                  flexDir={{ base: "column", md: "row" }}
                  gap="22px"
                  align="center"
                  justify="center"
                  w="100%"
                  display={isExplode ? "flex" : "none"}
                >
                  <Flex
                    align="center"
                    flexDir="column"
                    justify="center"
                    gap={{ md: "11px" }}
                    p="18px"
                    maxW="286px"
                    w="100%"
                    minH="100px"
                    bg="rgba(86, 205, 173, 0.10)"
                    borderRadius="24px"
                    border="1px solid #30C823"
                  >
                    <CustomText
                      text={`$${Number(
                        task?.participation?.prizeWon || 0
                      )?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}`}
                      size={{ base: "22px", md: "36px" }}
                      weight={700}
                      color="#30C823"
                    />
                    <CustomText
                      text={"Reward"}
                      size={{ base: "16px", md: "20px" }}
                      weight={400}
                      color="#30C823"
                    />
                  </Flex>
                  <Flex
                    align="center"
                    flexDir="column"
                    justify="center"
                    gap={{ md: "11px" }}
                    p="18px"
                    maxW="286px"
                    w="100%"
                    minH="100px"
                    bg="rgba(230, 156, 11, 0.10)"
                    borderRadius="24px"
                    border="1px solid #E69C0B"
                  >
                    <CustomText
                      text={`${task?.participation?.pointsEarned || 0}/10`}
                      size={{ base: "22px", md: "36px" }}
                      weight={700}
                      color="#E69C0B"
                    />
                    <CustomText
                      text={"Points"}
                      size={{ base: "16px", md: "20px" }}
                      weight={400}
                      height="0"
                      color="#E69C0B"
                    />
                  </Flex>
                </Flex>
                {isExplode && (
                  <Confetti
                    width={800}
                    height={600}
                    recycle={false}
                    tweenDuration={3000}
                  />
                )}
                <Button
                  maxW={{ base: "320px", md: "594px" }}
                  w="100%"
                  h="56px"
                  display="flex"
                  alignItems="center"
                  bg="#6F49FE"
                  borderRadius="999px"
                  _hover={{
                    bg: "#6F49FE",
                  }}
                  outline="none"
                  onClick={() => {
                    if (isExplode) {
                      setIsExplode(false);
                      onCollectClose();
                    } else {
                      claimTask.mutateAsync(task?.id);
                      setIsExplode(true);
                    }
                  }}
                  isLoading={claimTask.isPending}
                  isDisabled={claimTask.isPending}
                >
                  <CustomText
                    text={isExplode ? "Close" : "Collect Now"}
                    size={{ md: "22px" }}
                    weight={500}
                    color="#FFF"
                  />
                </Button>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </DashboardLayout>
  );
};

export default TaskDetail;
