"use client";
import CustomText from "@/components/fonts/text";
import {
  Box,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { calculateRemainingDays } from "@/components/date-format/RemainingDays";
import { useSendActivationEmail } from "@/utils/auth.api";
import { useQuery } from "@tanstack/react-query";
import { IconX } from "@tabler/icons-react";
import { BlackButton } from "@/components/buttons/button";

//icons import
const icoTrending = "/logo/taskLogo/trending.svg";
const icoellipse = "/logo/taskLogo/Ellipse.svg";

const TaskCard = ({
  id,
  trending,
  categories,
  title,
  desc,
  price,
  icon,
  info,
}: any) => {
  const [isLessThan463] = useMediaQuery(`(max-width: 463px)`); //left margin on Total Participants 45px
  const [isLargerThan370] = useMediaQuery(`(min-width: 370px)`); //left margin on Total Participants 45px

  const [isLessThan370] = useMediaQuery(`(max-width: 370px)`); //left margin on Deadline then 15px
  const [isLargerThan342] = useMediaQuery(`(min-width: 340px)`); //left margin on Deadline then15px
  const [isLessThan380] = useMediaQuery(`(max-width: 380px)`); //for project type text size

  const toast = useToast();

  const sendActivationEmail = useSendActivationEmail();
  const { data: userData }: any = useQuery({
    queryKey: ["getLoggedInUser"],
  });

  const {
    isOpen: isActivationOpen,
    onOpen: onActivationOpen,
    onClose: onActivationClose,
  } = useDisclosure();

  const handleActivationEmail = () => {
    sendActivationEmail
      ?.mutateAsync()
      .then((result) => {
        toast({
          title: `Activation Email Sent to ${userData?.email}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onActivationClose();
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

  return (
    //href={`/task-detail/?id=${id}/?status=start`}
    <>
      <Link
        href={userData?.isVerified ? `/task-detail/${id}?status=start` : "#"}
        onClick={() => {
          if (!userData?.isVerified) {
            onActivationOpen();
          }
        }}
      >
        <Flex
          maxWidth={"981px"}
          width={"100%"}
          p={
            trending
              ? { base: "44px 16px 16px 16px", md: "58px 24px 24px 24px" }
              : { base: "16px", md: "24px 24px 24px 24px" }
          }
          direction={"column"}
          alignItems={"flex-start"}
          gap={"16px"}
          borderRadius={"12px"}
          border={"1px solid #ECECEC "}
          background={"#FFF"}
          boxShadow={"0px 0px 10px 0px rgba(0, 0, 0, 0.03)"}
          cursor={"pointer"}
        >
          {/*project Trending */}

          {trending && (
            <Flex
              p={{ base: "7px 18px", md: "10px 18px" }}
              borderRadius={"12px 0px"}
              bg={"#212121"}
              marginLeft={{ base: "-16px", md: "-24px" }}
              marginTop={{ base: "-44px", md: "-58px" }}
              gap={"8px"}
              align={"center"}
            >
              <Image src={icoTrending} boxSize={"12px"} alt="icon" />
              <CustomText
                text={"Trending Task"}
                color={"#FFF"}
                size={"12px"}
                weight={900}
                height={"normal"}
              />
            </Flex>
          )}

          {/* logo and task title, type and description */}
          <Flex
            alignItems={"flex-start"}
            gap={{ base: "8px", md: "16px" }}
            width={"100%"}
          >
            <Image
              src={icon}
              width={{ base: "40px", md: "72px" }}
              height={{ base: "40px", md: "72px" }}
              alt="icon"
              borderRadius="8px"
            />

            <Flex direction={"column"} gap={"12px"} width={"100%"}>
              {/* project Type, Title and rewards */}
              <Flex justifyContent={"space-between"}>
                {/* TYPE and Title*/}
                <Flex
                  direction={"column"}
                  alignItems={"flex-start"}
                  gap={"8px"}
                >
                  <Flex>
                    {categories?.map((cat: any, idx: any) => (
                      <Box
                        key={idx}
                        p={"6px 10px"}
                        borderRadius={"80px"}
                        bg={cat?.bgColorCode}
                        me={"3px"}
                        display={{ base: "none", md: "block" }}
                      >
                        <CustomText
                          text={cat?.categoryName}
                          color={cat?.textColorCode}
                          size={"12px"}
                          weight={500}
                          height={"19.2px"}
                        />
                      </Box>
                    ))}
                  </Flex>

                  <CustomText
                    text={title}
                    color={"#141414"}
                    size={{ base: "18px", md: "24px" }}
                    weight={{ base: 600, md: 700 }}
                    height={{ base: "27px", md: "36px" }}
                  />
                  {/* title and reward in base screen */}
                  <Flex gap={isLessThan380 ? "5px" : "8px"} wrap="wrap">
                    {categories?.map((cat: any, idx: any) => (
                      <Box
                        key={idx}
                        p={isLessThan380 ? "4px 6px" : "4px 12px"}
                        borderRadius={"80px"}
                        bg={cat?.bgColorCode}
                        me={"3px"}
                        display={{ base: "block", md: "none" }}
                      >
                        <CustomText
                          text={cat?.categoryName}
                          color={cat?.textColorCode}
                          size={"12px"}
                          weight={500}
                          height={"19.2px"}
                        />
                      </Box>
                    ))}

                    {Number(price) > 0 && (
                      <Box
                        p={isLessThan380 ? "4px 7px" : "4px 12px"}
                        borderRadius={"80px"}
                        bg={`rgba(230, 156, 11, 0.10)`}
                        display={{ base: "block", md: "none" }}
                      >
                        <CustomText
                          text={`Reward $${price}`}
                          color={"#E69C0B"}
                          //size={"12px"}
                          size={isLessThan380 ? "10px" : "12px"}
                          weight={500}
                          height={"19.2px"}
                          // height={isLessThan380 ? "normal" : "19.2px"}
                        />
                      </Box>
                    )}
                  </Flex>
                </Flex>
                {/* reward  in md screen*/}
                {Number(price) > 0 && (
                  <Flex
                    display={{ base: "none", md: "block" }}
                    marginRight={"-1px"}
                    marginTop={trending ? "-37px" : "-1px"}
                    direction={"column"}
                    align={"center"}
                    gap={"8px"}
                    p={"12px"}
                    borderRadius={"6px"}
                    border={"0.3px solid #E69C0B "}
                    bg={"rgba(230, 156, 11, 0.10)"}
                    maxHeight={"68px"}
                  >
                    <CustomText
                      text={`$${price}`}
                      color={"#E69C0B"}
                      size={"24px"}
                      weight={700}
                      height={"normal"}
                      letterSpacing={"0.96px"}
                    />
                    <CustomText
                      text={"Reward"}
                      color={"#E69C0B"}
                      size={"12px"}
                      weight={400}
                      height={"normal"}
                      letterSpacing={"0.96px"}
                    />
                  </Flex>
                )}
              </Flex>

              {/* desc */}

              <Box ml={{ base: "-41px", md: "0px" }}>
                <CustomText
                  text={desc}
                  color={"#666"}
                  size={{ base: "12px", md: "14px" }}
                  height={{ base: "18px", md: "21px" }}
                />
              </Box>

              {/* trying to achieve bottom Info  for  MD & Base*/}

              <Flex
                mt={"4px"}
                p={"0px 12px 0px 0px"}
                justifyContent={{ base: "flex-start", md: "space-between" }}
                gap={{ base: "12px 45px", md: "0px" }}
                alignItems={"center"}
                wrap={"wrap"}
                ml={{ base: "-41px", md: "0px" }}
                display={{ base: "none", md: "flex" }}
              >
                {info?.map((item: any, index: number) => (
                  <>
                    {index !== 0 && (
                      <Image
                        key={index * 2}
                        display={{ base: "none", md: "block" }}
                        src={icoellipse}
                        boxSize={"3px"}
                        alt="icon"
                      />
                    )}

                    <div
                      key={index}
                      style={{
                        marginLeft:
                          item.title === "Total Participants" &&
                          isLessThan463 &&
                          isLargerThan370
                            ? "45px"
                            : item.title === "Deadline" &&
                              isLessThan370 &&
                              isLargerThan342
                            ? "15px"
                            : undefined,
                      }}
                    >
                      <CustomText
                        key={item.title}
                        text={item?.title}
                        color={"#666"}
                        size={{ base: "12px", md: "14px" }}
                        height={{ base: "18px", md: "21px" }}
                      />
                      <Flex key={index * 8}>
                        {item?.info?.map((info: any, idx: number) => (
                          <>
                            {item.title === "Deadline" &&
                              idx === item.info.length - 1 && (
                                <CustomText
                                  key={`${idx}-days-left`}
                                  text={`${calculateRemainingDays(
                                    info
                                  )} days left`}
                                  color={"#212121"}
                                  size={{ base: "12px", md: "14px" }}
                                  height={"21px"}
                                  weight={600}
                                />
                              )}
                            {item.title !== "Deadline" && (
                              <CustomText
                                key={idx}
                                text={info}
                                color={"#212121"}
                                size={{ base: "12px", md: "14px" }}
                                height={"21px"}
                                weight={600}
                              />
                            )}
                          </>
                        ))}
                      </Flex>
                    </div>
                  </>
                ))}
              </Flex>
              {/* For small screen */}
              <Flex
                gap="12px"
                wrap="wrap"
                display={{
                  base: "flex",
                  md: "none",
                }}
                ml={{ base: "-41px", md: "0px" }}
              >
                {info?.map((item: any, index: number) => (
                  <Flex flexDir="column" maxW="140px" w="100%" key={index}>
                    <CustomText
                      key={item.title}
                      text={item?.title}
                      color={"#666"}
                      size={{ base: "12px", md: "14px" }}
                      height={{ base: "18px", md: "21px" }}
                    />
                    <Flex key={index * 8}>
                      {item?.info?.map((info: any, idx: number) => (
                        <>
                          {item.title === "Deadline" &&
                            idx === item.info.length - 1 && (
                              <CustomText
                                key={`${idx}-days-left`}
                                text={`${calculateRemainingDays(
                                  info
                                )} days left`}
                                color={"#212121"}
                                size={{ base: "12px", md: "14px" }}
                                h={{ base: "14px", md: "21px" }}
                                weight={600}
                              />
                            )}
                          {item.title !== "Deadline" && (
                            <CustomText
                              key={idx}
                              text={info}
                              color={"#212121"}
                              size={{ base: "12px", md: "14px" }}
                              h={{ base: "14px", md: "21px" }}
                              weight={600}
                            />
                          )}
                        </>
                      ))}
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Modal isOpen={isActivationOpen} onClose={() => {}} isCentered>
          <ModalOverlay />
          <ModalContent maxW="600px" mx="16px">
            <ModalBody p="24px">
              <form
                onSubmit={(e: any) => {
                  e.preventDefault();
                  handleActivationEmail();
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
                    <Flex align="center" justify="space-between">
                      <CustomText
                        text="Activate your email"
                        size="20px"
                        weight="600"
                      />
                      <IconX
                        cursor="pointer"
                        onClick={onActivationClose}
                        style={{
                          marginTop: "-20px",
                        }}
                      />
                    </Flex>
                    <CustomText
                      text="Please activate your email first to perform tasks"
                      size="16px"
                      weight="400"
                      color="#666"
                    />
                  </Flex>
                  <Divider bg="#ECECEC" />
                  <Flex justify="center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="222"
                      height="213"
                      viewBox="0 0 222 213"
                      fill="none"
                    >
                      <path
                        d="M220.975 84.1373L221.322 83.883H220.639L111.001 1.4585L1.36239 83.883H0.679688L1.02922 84.1343L0.679688 84.3976H1.39364L111.977 163.939L220.62 84.3976H221.322L220.975 84.1373Z"
                        fill="#BBFC4A"
                        stroke="#263238"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M183.228 9.70264H35.2344V193.394H183.228V9.70264Z"
                        fill="white"
                        stroke="#BBFC4A"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M140.789 59.7019C140.789 80.9848 131.115 93.2378 121.119 93.2378C115.959 93.2378 112.95 90.6587 112.627 85.9288C110.478 90.6587 106.824 93.3449 101.557 93.2378C93.4953 93.1307 90.7005 86.3587 91.6688 76.7919L92.8512 66.0426C93.818 56.2616 98.2251 50.1351 106.18 50.3493C111.017 50.3493 114.134 52.9284 115.424 57.4441L116.176 50.7792H123.485L120.261 81.6273C119.938 84.0994 120.69 86.2486 123.378 86.2486C131.655 86.2486 134.449 70.4482 134.342 59.9146C134.342 44.9739 127.355 35.3 111.232 35.3C89.7352 35.3 79.7385 53.1426 79.7385 77.2203C79.7385 95.8154 88.2299 106.995 106.932 106.995C114.457 106.995 121.336 105.489 128.106 100.223L127.461 107.639C120.905 112.153 114.026 113.442 106.501 113.442C82.8546 113.442 72.5352 98.9315 72.5352 76.7889C72.5352 51.2075 84.7881 28.7422 111.445 28.7422C133.051 28.7466 140.789 41.9665 140.789 59.7019ZM100.052 66.7967L99.0848 76.4706C98.4393 82.0602 100.16 86.0374 105.211 86.1445C110.155 86.2516 112.843 82.3829 113.487 76.5777L114.562 66.2583C115.099 61.2072 113.057 57.6598 108.329 57.6598C103.383 57.5527 100.697 60.9915 100.052 66.7967Z"
                        fill="#6F49FE"
                      />
                      <path
                        d="M0.679688 83.8828V211.778H221.322V83.8828L111.001 147.831L0.679688 83.8828Z"
                        fill="#6F49FE"
                        stroke="white"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M0.679688 211.778L111.001 147.832L221.322 211.778"
                        stroke="white"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </Flex>
                  <BlackButton
                    btnText="Send Again"
                    color="#fff"
                    type="submit"
                    isLoading={sendActivationEmail.isPending}
                  />
                </Flex>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Link>
    </>
  );
};

export default TaskCard;
