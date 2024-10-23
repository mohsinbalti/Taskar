"use client";
import { BlackButton, TransparentButton } from "@/components/buttons/button";
import CustomText from "@/components/fonts/text";
import { useGetLoggedInUser } from "@/utils/auth.api";
import { useGetPointHistory } from "@/utils/task.api";
import {
  Box,
  Center,
  Divider,
  Flex,
  Image,
  Input,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { IconArrowRight, IconBrandX, IconCopy } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React from "react";
import DonutChart from "./donutChart";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const Stats = ({ userData, isLoading }: any) => {
  const router = useRouter();
  const toast = useToast();

  const { data: pointsData } = useGetPointHistory(Number.MAX_SAFE_INTEGER, 0);
  const { data: referralData, isLoading: referralLoading } =
    useGetLoggedInUser();
  const referralLink =
    typeof window !== "undefined" && referralData
      ? `${window.origin}/?ref=${referralData?.myRefferralCode}`
      : "";

  return (
    <SimpleGrid columns={{ md: 2, lg: 3 }} spacing={"24px"}>
      <Card title="My Earnings">
        {userData?.availableBalance ||
        userData?.totalEarnings ||
        userData?.totalPoints ||
        userData?.referralEarning ? (
          <DonutChart />
        ) : (
          <Image src="/icons/pie_empty.svg" alt="pie" mx="auto" />
        )}
        <SimpleGrid
          columns={{ base: 2 }}
          spacing={{ base: "12px", sm: "20px" }}
        >
          <Flex gap="12px" align="center">
            <Box
              boxSize={{ base: "16px", sm: "20px" }}
              borderRadius={"4px"}
              bg="#FFA36B"
            />
            <Stack gap="0px">
              <CustomText text="Total Earnings" color="#666" size="14px" />
              {isLoading ? (
                <SkeletonText noOfLines={1} w="50px" mt="17px" />
              ) : (
                <Text fontSize={"20px"} fontWeight={700}>
                  $
                  {Number(userData?.totalEarnings)?.toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                  }) || 0}
                </Text>
              )}
            </Stack>
          </Flex>
          <Flex gap="12px" align="center">
            <Box
              boxSize={{ base: "16px", sm: "20px" }}
              borderRadius={"4px"}
              bg="#87E9FF"
            />
            <Stack gap="0px">
              <CustomText text="Available Balance" color="#666" size="14px" />
              {isLoading ? (
                <SkeletonText noOfLines={1} w="50px" mt="17px" />
              ) : (
                <Text fontSize={"20px"} fontWeight={700}>
                  $
                  {Number(userData?.availableBalance)?.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 4,
                    }
                  ) || 0}
                </Text>
              )}
            </Stack>
          </Flex>
          <Flex gap="12px" align="center">
            <Box
              boxSize={{ base: "16px", sm: "20px" }}
              borderRadius={"4px"}
              bg="#FFE0BB"
            />
            <Stack gap="0px">
              <CustomText text="Pending Balance" color="#666" size="14px" />
              {isLoading ? (
                <SkeletonText noOfLines={1} w="50px" mt="17px" />
              ) : (
                <Text fontSize={"20px"} fontWeight={700}>
                  {Number(userData?.pendingBalance || 0)?.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 4,
                    }
                  ) || 0}
                </Text>
              )}
            </Stack>
          </Flex>
          <Flex gap="12px" align="center">
            <Box
              boxSize={{ base: "16px", sm: "20px" }}
              borderRadius={"4px"}
              bg="#05A4A6"
            />
            <Stack gap="0px">
              <CustomText text="Referral Earning" color="#666" size="14px" />
              {isLoading ? (
                <SkeletonText noOfLines={1} w="50px" mt="17px" />
              ) : (
                <Text fontSize={"20px"} fontWeight={700}>
                  $
                  {Number(userData?.referralEarning)?.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 4,
                    }
                  ) || 0}
                </Text>
              )}
            </Stack>
          </Flex>
        </SimpleGrid>
        <BlackButton
          // disabled={withdrawMutation?.isPending}
          btnText={"Withdraw"}
          h="48px"
          fontSize="16px"
          icon={<IconArrowRight color="white" />}
          flexDirection="row-reverse"
          gap="0px"
          onClick={() => router.push("/dashboard/withdraw")}
          disabled={!userData?.availableBalance}
        />
      </Card>
      <div
        style={{
          maxHeight: "530px",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#ccc transparent",
        }}
      >
        {!pointsData?.length ? (
          <Box
            p="16px"
            borderRadius={"16px"}
            border="1px solid #ECECEC"
            height="100%"
            bg="#fff"
          >
            <CustomText
              text="My Points History"
              size={{ base: "16px", md: "20px" }}
              weight="600"
            />
            <Flex
              flexDir="column"
              justify="center"
              align="center"
              height="98%"
              gap="16px"
            >
              <Image src="/icons/empty_points.svg" h="58px" alt="points" />
              <Flex flexDir="column" gap="4px">
                <CustomText
                  text="No Points History"
                  size={{ base: "16px", md: "20px" }}
                  weight="600"
                  align="center"
                />
                <CustomText
                  text="Win a task to earn points"
                  size="14px"
                  weight="400"
                  color="#666"
                  align="center"
                />
              </Flex>
              {/* <BlackButton
                btnText="Explore Tasks"
                h="48px"
                w="220px"
                fontSize="16px"
                onClick={() => router.push("/")}
              /> */}
            </Flex>
          </Box>
        ) : (
          <Card title="My Points History">
            {pointsData?.map((point: any, index: any) => {
              const calculateDays = (createdAt: any) => {
                const now = new Date();
                const createdDate = new Date(createdAt);
                const differenceInTime = now.getTime() - createdDate.getTime();
                const differenceInDays = Math.floor(
                  differenceInTime / (1000 * 3600 * 24)
                );
                return differenceInDays;
              };
              return (
                <>
                  <Flex gap="9px" direction={{ base: "column", sm: "row" }}>
                    <Center
                      boxSize={"32px"}
                      minW="32px"
                      bg="#212121"
                      borderRadius={"8px"}
                    >
                      <Image src="/icons/edit.svg" alt="" />
                    </Center>
                    <Box flexGrow={1}>
                      <Flex justify={"space-between"}>
                        <CustomText
                          text={point?.task?.category?.[0]?.categoryName || ""}
                          size="14px"
                          color="#666"
                        />
                        <CustomText
                          text={`${calculateDays(
                            point?.publishedDate
                          )} days ago`}
                          size="14px"
                          color="#666"
                        />
                      </Flex>
                      <CustomText
                        text={point?.task?.title || ""}
                        weight="600"
                      />
                      <CustomText
                        text={point?.task?.description || ""}
                        noOfLines={2}
                        color="#666"
                        size="12px"
                        h="16px"
                        mt="12px"
                      />
                      <Flex justify={"space-between"} my="12px">
                        <Flex direction={"column"} gap={"2px"}>
                          <CustomText
                            text={"Reward Earned"}
                            color={"#666"}
                            size={"14px"}
                            h={"21px"}
                          />
                          <CustomText
                            text={`$${
                              Number(point?.prizeWon || 0)?.toLocaleString(
                                undefined,
                                {
                                  maximumFractionDigits: 4,
                                }
                              ) || 0
                            }`}
                            color={"#212121"}
                            size={"18px"}
                            h={"150%"}
                            weight={700}
                          />
                        </Flex>
                        <Flex
                          direction={"column"}
                          gap={"2px"}
                          alignItems={"flex-end"}
                        >
                          <CustomText
                            text={"Points Earned"}
                            color={"#666"}
                            size={"14px"}
                            h={"21px"}
                          />
                          <CustomText
                            text={point?.pointsEarned}
                            color={"#212121"}
                            size={"18px"}
                            h={"150%"}
                            weight={700}
                          />
                        </Flex>
                      </Flex>
                      <TransparentButton
                        btnText="View Details"
                        w="100%"
                        h="36px"
                        fontSize="14px"
                        fontWeight="500"
                        onClick={() =>
                          router.push(`/task-detail/${point?.task?.id}`)
                        }
                      />
                    </Box>
                  </Flex>
                  <Divider
                    opacity={1}
                    borderColor={"#ECECEC"}
                    mt="-8px"
                    mb="8px"
                  />
                </>
              );
            })}
          </Card>
        )}
      </div>
      <Card title="My Referrals">
        <CustomText
          text="Earn up to 10% of every invited user when they start earning"
          size="14px"
          color="#666"
          mt="-12px"
          h="21px"
        />
        <Flex
          justify={"space-between"}
          my="12px"
          p="12px"
          bg="#F6F6F6"
          borderRadius={"12px"}
        >
          <Flex direction={"column"} gap={"2px"}>
            <CustomText
              text={"Total Referrals"}
              color={"#666"}
              size={"14px"}
              h={"21px"}
            />
            {referralLoading ? (
              <SkeletonText noOfLines={1} w="50px" mt="20px" />
            ) : (
              <CustomText
                text={userData?.totalReferralInvites}
                color={"#212121"}
                size={"28px"}
                h={"150%"}
                weight={700}
              />
            )}
          </Flex>
          <Flex direction={"column"} gap={"2px"} alignItems={"flex-end"}>
            <CustomText
              text={"Earnings"}
              color={"#666"}
              size={"14px"}
              h={"21px"}
            />
            {referralLoading ? (
              <SkeletonText noOfLines={1} w="50px" mt="20px" />
            ) : (
              <CustomText
                text={`$${
                  Number(userData?.referralEarning)?.toLocaleString(undefined, {
                    maximumFractionDigits: 4,
                  }) || 0
                }`}
                color={"#212121"}
                size={"28px"}
                h={"150%"}
                weight={700}
              />
            )}
          </Flex>
        </Flex>
        <Stack gap={"12px"}>
          <CustomText text="Invite now using:" size="20px" weight="600" />
          <Flex gap="10px">
            <Center boxSize={"48px"} borderRadius={"8px"} bg="#212121">
              <TwitterShareButton url={referralLink}>
                <IconBrandX color="white" style={{ cursor: "pointer" }} />
              </TwitterShareButton>
            </Center>
            <Center boxSize={"48px"} borderRadius={"8px"} bg="#212121">
              <LinkedinShareButton url={referralLink}>
                <Image
                  src="/icons/linkedin-white.svg"
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </LinkedinShareButton>
            </Center>
            <Center boxSize={"48px"} borderRadius={"8px"} bg="#212121">
              <FacebookShareButton url={referralLink}>
                <Image
                  src="/icons/fb-white.svg"
                  alt=""
                  style={{ cursor: "pointer" }}
                />
              </FacebookShareButton>
            </Center>
          </Flex>
        </Stack>
        <Stack flexGrow={1} justify={"end"} gap="10px">
          <CustomText text="Or copy your platform link" color="#666" />
          <Flex>
            <Flex
              border="1px solid #ECECEC"
              flexGrow={1}
              borderLeftRadius={"8px"}
              p="10px"
              h="50px"
              align={"center"}
              overflow={"hidden"}
              width="100%"
            >
              {referralLoading ? (
                <Skeleton h="20px" w="200px" />
              ) : (
                <Input value={referralLink} isReadOnly p="0" border="none" />
              )}
              {/* <Text noOfLines={1}>{referralLink}</Text> */}
            </Flex>
            <Center
              boxSize={"50px"}
              bg="#212121"
              borderRightRadius={"8px"}
              ml="-2px"
              cursor="pointer"
              onClick={() => {
                navigator.clipboard.writeText(referralLink);
                toast({
                  title: "Copied to clipboard",
                  status: "success",
                  position: "top-right",
                });
              }}
            >
              <IconCopy color="white" />
            </Center>
          </Flex>
        </Stack>
      </Card>
    </SimpleGrid>
  );
};

export default Stats;

const Card = ({ children, title }: any) => {
  return (
    <Stack
      p="16px"
      gap="24px"
      borderRadius={"16px"}
      border="1px solid #ECECEC"
      bg="#fff"
    >
      <CustomText
        text={title}
        size={{ base: "16px", md: "20px" }}
        weight="600"
      />
      {children}
    </Stack>
  );
};
