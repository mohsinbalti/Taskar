"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import TaskCard from "@/components/task/taskCard/taskCard";
import CustomText from "@/components/fonts/text";
import Stats from "@/components/stats/stats";
import Notifications from "@/components/notification/notifications";
import { SearchBar } from "@/components/search/search";
import DropDown from "@/components/dropDown/dropDown";
import TaskHeader from "@/components/header/taskPage/taskHeader";
import CategoryCard from "@/components/general cards/category";
import { useGetTasks } from "@/utils/task.api";
import {
  useGetCategory,
  useGetLoggedInUser,
  useSendActivationEmail,
  useSetNewPassword,
} from "@/utils/auth.api";
import { useRouter, useSearchParams } from "next/navigation";
import DashboardLayout from "./layouts/DashboardLayout";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { BlackButton } from "@/components/buttons/button";
import NoTask from "@/svgs/notask";
import TaskCardLoading from "@/components/task/taskCard/taskCardLoading";
import CategoryCardLoading from "@/components/general cards/categoryLoading";

const Task = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category");

  const setNewPassowrd = useSetNewPassword();
  const resendVerification = useSendActivationEmail();

  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [passwordPayload, setPasswordPayload] = useState({
    password: "",
    confirmPassword: "",
    isPasswordVisible: false,
    isConfirmPasswordVisible: false,
  });

  const [categoryLimit, setCategoryLimit] = useState(8);
  const [offset] = useState(0);

  const { data: tasks, isLoading } = useGetTasks(limit, 0, search, category);
  const { data: userData, isLoading: userInfoLoading } = useGetLoggedInUser();
  const { data: tasksLength } = useGetTasks(
    Number.MAX_SAFE_INTEGER,
    0,
    search,
    category
  );
  const { data: categoryData, isLoading: categoryLoading } = useGetCategory({
    limit: Number.MAX_SAFE_INTEGER,
    offset,
  });

  const {
    isOpen: isSetPasswordOpen,
    onOpen: onSetPasswordOpen,
    onClose: onSetPasswordClose,
  } = useDisclosure();

  const toast = useToast();

  const optionData = categoryData?.map((category: any) => {
    return { value: category?.categoryName, label: category?.categoryName };
  });
  const loadMoreTasks = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  const loadMoreCategories = () => {
    setCategoryLimit((prevLimit) => prevLimit + 4);
  };

  const handleSetNewPassword = () => {
    if (passwordPayload?.password !== passwordPayload?.confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const passwordValidation =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordValidation.test(passwordPayload?.password)) {
      toast({
        title:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setNewPassowrd
      ?.mutateAsync({ password: passwordPayload?.password })
      .then((result) => {
        toast({
          title: "Password Set Successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onSetPasswordClose();
      })
      .catch((err) => {
        toast({
          title: err?.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    if (tasks) {
      setAllTasks(tasks);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks]);

  useEffect(() => {
    if (categoryName) {
      setCategory(categoryName);
      if (searchParams && typeof window !== "undefined") {
        window.history.replaceState(null, "", "/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);

  useEffect(() => {
    if (userInfoLoading) {
      return;
    }
    if (
      userData &&
      !userData?.isPasswordAdded &&
      !isSetPasswordOpen &&
      !userInfoLoading
    ) {
      onSetPasswordOpen();
    } else {
      onSetPasswordClose();
    }
  }, [userData, userInfoLoading]);

  return (
    <>
      <DashboardLayout>
        <Suspense fallback={"...loading"}>
          {!userInfoLoading && !userData?.isVerified && (
            <Box
              px={{ base: "16px", md: "32px" }}
              maxWidth={"1380px"}
              mx={"auto"}
              mb="24px"
              mt={{ base: "80px", md: "100px", lg: "0px" }}
            >
              <Flex
                p="8px 24px"
                align="center"
                justify="center"
                bg="rgba(244, 176, 0, 0.10)"
                borderRadius="12px"
                gap="10px"
              >
                <CustomText
                  size="14px"
                  text={
                    <>
                      <span>
                        Please activate your account to start performing tasks.
                        We sent an activation email to{" "}
                      </span>
                      <span
                        style={{
                          color: "#6F49FE",
                        }}
                      >
                        {userData?.email}
                      </span>
                      <span
                        style={{
                          color: "#212121",
                          marginLeft: "15px",
                          fontSize: "10px",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          if (resendVerification?.isPending) return;
                          resendVerification
                            ?.mutateAsync()
                            .then((result) => {
                              toast({
                                title: "Email Sent Successfully",
                                status: "success",
                                duration: 3000,
                                isClosable: true,
                              });
                            })
                            .catch((err) => {
                              toast({
                                title: err?.message,
                                status: "error",
                                duration: 3000,
                                isClosable: true,
                              });
                            });
                        }}
                      >
                        {resendVerification?.isPending ? (
                          <Spinner size="sm" color="black" />
                        ) : (
                          "Send Again"
                        )}
                      </span>
                    </>
                  }
                  color="#926900"
                />
              </Flex>
            </Box>
          )}
          <Flex
            gap={"24px"}
            justifyContent={"center"}
            px={{ base: "16px", md: "32px" }}
            maxWidth={"1440px"}
            mx={"auto"}
          >
            {/* header , search bar and tasks list  */}

            <Flex
              direction={"column"}
              gap={"24px"}
              paddingBottom={"32px"}
              maxWidth={"981px"}
              width={"100%"}
            >
              <TaskHeader />
              <Flex gap={"16px"} alignItems={"center"}>
                <SearchBar searchInput={search} setSearchInput={setSearch} />
                <DropDown
                  options={optionData}
                  category={category}
                  setCategory={setCategory}
                />
              </Flex>
              {isLoading ? (
                new Array(4)
                  .fill(1)
                  .map((_, idx) => <TaskCardLoading key={idx} />)
              ) : (
                <>
                  {/* tasks list */}
                  {allTasks && allTasks.length > 0 ? (
                    allTasks.map((task: any, idx: number) => (
                      <TaskCard
                        key={task.id}
                        id={task.id}
                        trending={task?.badge === "Trending" ? true : false}
                        categories={task?.category}
                        title={task.title}
                        desc={
                          task.description?.length > 250
                            ? task?.description?.substr(0, 250) + "..."
                            : task?.description
                        }
                        price={Number(task?.reward)?.toLocaleString(undefined, {
                          maximumFractionDigits: 4,
                        })}
                        icon={task?.icon || "https://via.placeholder.com/150"}
                        info={[
                          {
                            title: "Skills Required",
                            info: [
                              task.skills
                                ?.map((skill: any) => skill?.skillName)
                                ?.join(", "),
                            ],
                          },
                          {
                            title: " Posted",
                            info: [`${getTimeDifference(task?.publishedDate)}`],
                          },
                          { title: "Deadline", info: [`${task.deadline}`] },
                          {
                            title: "Total Participants",
                            info: [
                              `${
                                Number(task.participants || 0) < 5
                                  ? "Less Than 5"
                                  : task?.participants
                              }`,
                            ],
                          },
                          {
                            title: "Participation Fee",
                            info: [`$${task.fee}`],
                          },
                        ]}
                      />
                    ))
                  ) : (
                    <Flex
                      align="center"
                      justify="center"
                      gap="24px"
                      minH="350px"
                      flexDir="column"
                      borderRadius="8px"
                      bg="#fff"
                      p="20px"
                      border="1px solid #eaeaea"
                    >
                      <NoTask />
                      <Flex align="center" gap="12px" flexDir="column">
                        <CustomText
                          text="No Tasks Available"
                          weight="600"
                          size={{ base: "16px", md: "20px" }}
                        />
                        <Flex flexDir="column" align="center">
                          <CustomText
                            text="You have no available tasks at the moment."
                            size={{ base: "12px", md: "14px" }}
                            color="#666"
                            h="10px"
                          />
                          <CustomText
                            text="You will receive an email when the tasks are available for you."
                            size={{ base: "12px", md: "14px" }}
                            color="#666"
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  )}
                  {tasksLength?.length > limit && (
                    <Flex
                      p={"11px 79px"}
                      borderRadius={"80px"}
                      border={"1px solid #212121"}
                      width={"223px"}
                      height={"50px"}
                      alignSelf={"center"}
                      alignItems={"center"}
                      justifyContent={"center"}
                      cursor={"pointer"}
                      onClick={loadMoreTasks}
                    >
                      <CustomText
                        text={"View All"}
                        color={" #212121"}
                        weight={500}
                        height={"25.6px"}
                      />
                    </Flex>
                  )}
                </>
              )}
            </Flex>

            {/* notifications and stats */}
            <Flex
              direction={"column"}
              gap={"32px"}
              display={{ base: "none", lg: "flex" }}
            >
              <Stats />
              <Notifications />
            </Flex>
          </Flex>

          {/* Categories list */}
          <Flex
            direction={"column"}
            gap={"32px"}
            width={"100%"}
            maxWidth={"1380px"}
            mx={"auto"}
            p={{ base: "24px 16px 0px 16px", md: "0px 30px 32px 30px" }}
            marginBottom={"32px"}
          >
            <CustomText
              text={"Categories"}
              color={" #212121"}
              size={"32px"}
              weight={600}
              height={"38.4px"}
            />

            {categoryLoading ? (
              <Flex
                gap={{ base: "20px 12px", md: "32px" }}
                wrap={"wrap"}
                width={"100%"}
                justify={{ base: "center", md: "left" }}
              >
                {new Array(8).fill(1)?.map((_, idx) => (
                  <CategoryCardLoading key={idx} />
                ))}
              </Flex>
            ) : (
              <>
                <Flex
                  gap={{ base: "20px 12px", md: "32px" }}
                  wrap={"wrap"}
                  width={"100%"}
                  justify={{ base: "center", md: "left" }}
                >
                  {categoryData.slice(0, categoryLimit).map((category: any) => (
                    <CategoryCard
                      key={category?.id}
                      title={category?.categoryName}
                      count={category?.noOfTasks}
                      iconLight={category?.categoryPictureDark}
                      iconDark={category?.categoryPicture}
                      onClick={() => {
                        router.push(`/?category=${category?.categoryName}`);
                      }}
                    />
                  ))}{" "}
                </Flex>

                {categoryData.length > categoryLimit && (
                  <Flex
                    p={{ base: "14px 32px", md: "11px 28px" }}
                    borderRadius="80px"
                    border="1px solid #212121"
                    width="223px"
                    height="50px"
                    alignSelf="center"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    onClick={loadMoreCategories}
                  >
                    <CustomText
                      text="View More"
                      color="#212121"
                      weight={500}
                      height="25.6px"
                    />
                  </Flex>
                )}
              </>
            )}
          </Flex>
          <Modal isOpen={isSetPasswordOpen} onClose={() => {}} isCentered>
            <ModalOverlay />
            <ModalContent maxW="600px" mx="16px">
              <ModalBody p="24px">
                <form
                  onSubmit={(e: any) => {
                    e.preventDefault();
                    handleSetNewPassword();
                  }}
                >
                  <Flex
                    flexDir="column"
                    gap="24px"
                    borderRadius="12px"
                    bg="#fff"
                    maxW="644px"
                    w="100%"
                  >
                    <Flex flexDir="column" gap="8px">
                      <CustomText
                        text="Set New Password"
                        size="20px"
                        weight="600"
                      />
                      <CustomText
                        text="Please set your new password"
                        size="16px"
                        weight="400"
                        color="#666"
                      />
                    </Flex>
                    <Divider bg="#ECECEC" />
                    <Flex flexDir="column" gap="12px">
                      <Flex flexDir="column" gap="6px">
                        <Text
                          fontSize="14px"
                          fontWeight="400"
                          textAlign="left"
                          color="#666666"
                        >
                          Set New Password{" "}
                        </Text>
                        <Box pos="relative">
                          <Input
                            placeholder="*********"
                            _placeholder={{
                              color: "#C0C0C0",
                              fontSize: "14px",
                              fontWeight: "400",
                            }}
                            h="45px"
                            width="100%"
                            borderRadius="5px"
                            paddingEnd="50px"
                            border="1.5px solid #CFCFCF"
                            background="#FFFFFF"
                            focusBorderColor="#d9d9d9"
                            _hover={{ borderColor: "#d9d9d9" }}
                            type={
                              passwordPayload?.isPasswordVisible
                                ? "text"
                                : "password"
                            }
                            boxShadow="none"
                            value={passwordPayload?.password}
                            isRequired
                            onChange={(e) =>
                              setPasswordPayload({
                                ...passwordPayload,
                                password: e.target.value,
                              })
                            }
                          />
                          <Box
                            pos="absolute"
                            top="0"
                            right="0"
                            mr="10px"
                            mt="15px"
                            zIndex="10"
                            onClick={() =>
                              setPasswordPayload({
                                ...passwordPayload,
                                isPasswordVisible:
                                  !passwordPayload?.isPasswordVisible,
                              })
                            }
                          >
                            {passwordPayload?.isPasswordVisible ? (
                              <IconEye
                                color="#666"
                                size="16px"
                                cursor="pointer"
                              />
                            ) : (
                              <IconEyeOff
                                color="#666"
                                size="16px"
                                cursor="pointer"
                              />
                            )}
                          </Box>
                        </Box>
                      </Flex>
                      <Flex flexDir="column" gap="6px">
                        <Text
                          fontSize="14px"
                          fontWeight="400"
                          textAlign="left"
                          color="#666666"
                        >
                          Confirm Password{" "}
                        </Text>
                        <Box pos="relative">
                          <Input
                            placeholder="*********"
                            _placeholder={{
                              color: "#C0C0C0",
                              fontSize: "14px",
                              fontWeight: "400",
                            }}
                            h="45px"
                            paddingEnd="50px"
                            width="100%"
                            borderRadius="5px"
                            border="1.5px solid #CFCFCF"
                            background="#FFFFFF"
                            focusBorderColor="#d9d9d9"
                            _hover={{ borderColor: "#d9d9d9" }}
                            type={
                              passwordPayload?.isConfirmPasswordVisible
                                ? "text"
                                : "password"
                            }
                            boxShadow="none"
                            value={passwordPayload?.confirmPassword}
                            isRequired
                            onChange={(e) =>
                              setPasswordPayload({
                                ...passwordPayload,
                                confirmPassword: e.target.value,
                              })
                            }
                          />
                          <Box
                            pos="absolute"
                            top="0"
                            right="0"
                            mr="10px"
                            mt="15px"
                            zIndex="10"
                            onClick={() =>
                              setPasswordPayload({
                                ...passwordPayload,
                                isConfirmPasswordVisible:
                                  !passwordPayload?.isConfirmPasswordVisible,
                              })
                            }
                          >
                            {passwordPayload?.isConfirmPasswordVisible ? (
                              <IconEye
                                color="#666"
                                size="16px"
                                cursor="pointer"
                              />
                            ) : (
                              <IconEyeOff
                                color="#666"
                                size="16px"
                                cursor="pointer"
                              />
                            )}
                          </Box>
                        </Box>
                      </Flex>
                    </Flex>
                    <BlackButton
                      btnText="Set Password"
                      color="#fff"
                      type="submit"
                      isLoading={setNewPassowrd.isPending}
                    />
                  </Flex>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Suspense>
      </DashboardLayout>
    </>
  );
};

export default Task;

const getTimeDifference = (createdAt: any) => {
  const currentDate: any = new Date();
  const createdDate: any = new Date(createdAt);

  const timeDifference = currentDate - createdDate;

  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);

  if (months > 0) {
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  }
};
