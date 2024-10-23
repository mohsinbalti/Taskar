"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import TaskCard from "@/components/task/taskCard/taskCard";
import CustomText from "@/components/fonts/text";
import Stats from "@/components/stats/stats";
import Notifications from "@/components/notification/notifications";
import { SearchBar } from "@/components/search/search";
import DropDown from "@/components/dropDown/dropDown";
import TaskHeader from "@/components/header/taskPage/taskHeader";
import HeaderSwiper from "@/components/header/taskPage/headerSwiper";
import CategoryCard from "@/components/general cards/category";
import { useGetCategoriesWithTask, useGetTasks } from "@/utils/task.api";
import { useQuery } from "@tanstack/react-query";
import { useGetCategory } from "@/utils/auth.api";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import DashboardLayout from "../layouts/DashboardLayout";
import ComingSoon from "@/components/comingSoon";

const icoFlutter = "/logo/taskLogo/flutter-dark.svg";

const Task = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category");

  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [allTasks, setAllTasks] = useState([]);

  const { data: tasks, isLoading } = useGetTasks(limit, 0, search, category);
  const { data: tasksLength } = useGetTasks(
    Number.MAX_SAFE_INTEGER,
    0,
    search,
    category
  );
  const { data: categoryData, isLoading: categoryLoading } = useGetCategory();

  const [viewMore, setViewMore] = useState(false);
  const toggleViewMore = () => setViewMore(!viewMore);

  const getRandomColor = () => (Math.random() < 0.5 ? "#56CDAD" : "#4640DE"); // Randomly select color between "#56CDAD" and "#4640DE"

  const optionData = categoryData?.map((category: any) => {
    return { value: category?.categoryName, label: category?.categoryName };
  });
  const loadMoreTasks = () => {
    setLimit((prevLimit) => prevLimit + 5);
  };

  useEffect(() => {
    if (tasks) {
      setAllTasks(tasks);
    }
    if (categoryName) {
      setCategory(categoryName);
      if (searchParams && typeof window !== "undefined") {
        window.history.replaceState(null, "", "/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tasks, categoryName]);

  return (
    <>
      <DashboardLayout>
        <Suspense fallback={"...loading"}>
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
              {false ? (
                <>
                  <Flex gap={"16px"} alignItems={"center"}>
                    <SearchBar
                      searchInput={search}
                      setSearchInput={setSearch}
                    />
                    <DropDown
                      options={optionData}
                      category={category}
                      setCategory={setCategory}
                    />
                  </Flex>
                  {isLoading ? (
                    <Flex my="16px" justify="center">
                      <Spinner size="md" />
                    </Flex>
                  ) : (
                    <>
                      {/* tasks list */}
                      {allTasks && allTasks.length > 0 ? (
                        allTasks.map((task: any, idx: number) => (
                          <TaskCard
                            key={task.id}
                            id={task.id}
                            trending={task?.badge === "Trending" ? true : false}
                            type={task.category?.map(
                              (category: any) => category?.categoryName
                            )}
                            title={task.title}
                            desc={task.description}
                            price={Number(task?.reward)?.toLocaleString(
                              undefined,
                              {
                                maximumFractionDigits: 4,
                              }
                            )}
                            icon={
                              task?.icon || "https://via.placeholder.com/150"
                            }
                            info={[
                              {
                                title: "Skills Required",
                                info: task.skills?.map(
                                  (skill: any) => skill?.skillName
                                ),
                              },
                              {
                                title: " Posted",
                                info: [
                                  `${getTimeDifference(task?.publishedDate)}`,
                                ],
                              },
                              { title: "Deadline", info: [`${task.deadline}`] },
                              {
                                title: "Total Participants",
                                info: [`${task.participants} People`],
                              },
                              {
                                title: "Participation Fee",
                                info: [`$${task.fee}`],
                              },
                            ]}
                            color={task.category?.map(
                              (category: any) => category?.textColorCode
                            )}
                          />
                        ))
                      ) : (
                        <Text>No tasks available</Text>
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
                </>
              ) : (
                <ComingSoon />
              )}
            </Flex>

            {/* notifications and stats */}
            {!isLoading && (
              <Flex
                direction={"column"}
                gap={"32px"}
                display={{ base: "none", lg: "flex" }}
              >
                <Stats />
                <Notifications />
              </Flex>
            )}
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
              <Flex my="16px" justify="center">
                <Spinner size="md" />
              </Flex>
            ) : (
              <>
                <Flex
                  gap={{ base: "20px 12px", md: "32px" }}
                  wrap={"wrap"}
                  width={"100%"}
                >
                  {categoryData?.map((category: any) => {
                    return (
                      <CategoryCard
                        key={category?.id}
                        title={category?.categoryName}
                        count={category?.noOfTasks}
                        iconLight={category?.categoryPictureDark}
                        iconDark={category?.categoryPicture}
                        onClick={() =>
                          router.push(`/?category=${category?.categoryName}`)
                        }
                      />
                    );
                  })}{" "}
                </Flex>

                {categoryData?.length > 7 && (
                  <Flex
                    p={{ base: "14px 32px", md: "11px 28px" }}
                    borderRadius={"80px"}
                    border={"1px solid #212121"}
                    width={"223px"}
                    height={"50px"}
                    alignSelf={"center"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    cursor={"pointer"}
                    onClick={toggleViewMore}
                  >
                    <CustomText
                      text={viewMore ? "View Less" : "View More"}
                      color={" #212121"}
                      weight={500}
                      height={"25.6px"}
                    />
                  </Flex>
                )}
              </>
            )}
          </Flex>
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
