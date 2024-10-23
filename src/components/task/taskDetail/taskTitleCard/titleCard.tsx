"use client";
import CustomText from "@/components/fonts/text";
import {
  Box,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  useDisclosure,
  useMediaQuery,
  useToast,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { IconBrandX, IconCopy, IconShare } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import Transaction from "./startTask/transaction";
import Success from "./startTask/success";
import UploadFileModal from "./submitFIle/upload";
import Sheet from "react-modal-sheet";
import {
  calculateRemainingDays,
  formatDateAgo,
} from "@/components/date-format/RemainingDays";
import { useCreatePaymentIntent, useStartTask } from "@/utils/task.api";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const TitleCard = ({ btnText, task, isLoading }: any) => {
  const router = useRouter();
  const { id: taskId } = useParams();
  const searchParams = useSearchParams();
  const successParam = searchParams?.get("success");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const referralLink =
    typeof window !== "undefined" && taskId
      ? `${window.origin}/task-detail/${taskId}`
      : "";
  const toast = useToast();
  const [isMobile] = useMediaQuery("(max-width: 720px)");
  const [isLessThan380] = useMediaQuery(`(max-width: 380px)`); //for project reward in base text size

  const createPayment = useCreatePaymentIntent();
  const startTaskMutation = useStartTask();

  const btnColor = btnText.includes("Result") ? "#56CDAD" : "#212121";
  const [toggle, setToggle] = useState(false); //to display toggle
  const [isSuccessPopUp, setIsSuccessPopup] = useState(false); //if FALSE && toggle TRUE then will display Payment else if toggle && onNext will how Transaction screen
  const [paymentIntentInfo, setPaymentInfoIntent] = useState<any>(null);

  const createPaymentIntent = async () => {
    try {
      const formData = {
        taskId: taskId,
        successUrl:
          typeof window !== "undefined"
            ? `${window.origin}/task-detail/${taskId}?success=true`
            : "",
        cancelUrl:
          typeof window !== "undefined"
            ? `${window.origin}/task-detail/${taskId}`
            : "",
      };
      const res = await createPayment?.mutateAsync(formData);
      if (res?.paymentIntent) {
        setPaymentInfoIntent({
          payment: res?.payment,
          paymentIntent: res?.paymentIntent,
        });
        if (typeof window !== "undefined") {
          window?.localStorage?.setItem(
            "paymentInfo",
            JSON.stringify({
              payment: res?.payment,
              paymentIntent: res?.paymentIntent,
            })
          );
        }
        handleToggle();
      }
      if (res?.error) {
        toast({
          title: res?.error,
          status: "error",
          position: "top-right",
        });
      }
    } catch (error: any) {
      toast({
        title: error?.message,
        status: "error",
        position: "top-right",
      });
    }
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handlePay = async () => {
    try {
      await startTaskMutation.mutateAsync({
        taskId,
        paymentId: paymentIntentInfo?.payment?.paymentId,
      });
      setPaymentInfoIntent(null);
      typeof window !== "undefined" &&
        window?.localStorage?.removeItem("paymentIntentInfo");
      setIsSuccessPopup(false);
    } catch (error: any) {
      toast({
        title: error?.message,
        status: "error",
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    setToggle(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [btnText]);

  useEffect(() => {
    if (
      !isSuccessPopUp &&
      successParam &&
      paymentIntentInfo &&
      !task?.participation
    ) {
      setIsSuccessPopup(true);
    } else {
      if (task?.participation) {
        setIsSuccessPopup(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successParam, paymentIntentInfo, task]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const paymentInfo = window?.localStorage?.getItem("paymentInfo");
      if (paymentInfo) {
        const payment = JSON.parse(paymentInfo);
        setPaymentInfoIntent(payment);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Flex
        boxShadow={" 0px 0px 10px 0px rgba(0, 0, 0, 0.03)"}
        bg="#fff"
        width={"100%"}
        borderRadius={"12px"}
        border={"1px solid  #ECECEC"}
        p={isLessThan380 ? "12px" : { base: "16px", md: "24px 16px" }}
        //   flexDirection={{ md: "column" }}
        //  gap={"16px"}
        alignItems={{ base: "flex-start", md: "center" }}
        justifyContent={{ md: "space-between" }}
        direction={{ base: "column", md: "row" }}
      >
        <Flex
          gap={isLessThan380 ? "10px" : "16px"}
          alignItems={{ base: "flex-start", md: "center" }}
        >
          {isLoading ? (
            <Skeleton
              boxSize={isLessThan380 ? "32px" : { base: "40px", md: "72px" }}
              borderRadius="8px"
            />
          ) : (
            <Image
              src={task?.icon || "https://via.placeholder.com/150"}
              boxSize={isLessThan380 ? "32px" : { base: "40px", md: "72px" }}
              alt="icon"
              borderRadius="8px"
            />
          )}
          {/* title and info */}
          <Flex
            flexDirection={"column"}
            alignItems={"flex-start"}
            gap={{ base: "4px", md: "14px" }}
          >
            <Flex
              height={isLessThan380 ? "100%" : { base: "27px", md: "48px" }}
              alignItems={"center"}
            >
              {isLoading ? (
                <SkeletonText
                  noOfLines={2}
                  w={isLessThan380 ? "100px" : { base: "200px", md: "400px" }}
                />
              ) : (
                <CustomText
                  text={task?.title || ""}
                  color={"#141414"}
                  size={isLessThan380 ? "16px" : { base: "18px", md: "32px" }}
                  weight={{ base: 600, md: 700 }}
                  h={{ base: "20px", md: "48px" }}
                />
              )}
            </Flex>

            {/*  price for mobile view */}
            {Number(task?.reward || 0) > 0 && (
              <Box
                p={"4px 12px"}
                borderRadius={"80px"}
                bg={"rgba(230, 156, 11, 0.10)"}
                display={{ base: "block", md: "none" }}
                mt={"10px"}
              >
                {isLoading ? (
                  <SkeletonText noOfLines={1} w="100px" />
                ) : (
                  <CustomText
                    text={`Reward $${
                      Number(task?.reward || 0)?.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      }) || "00"
                    }`}
                    color={"#E69C0B"}
                    size={"12px"}
                    weight={500}
                    height={isLessThan380 ? "normal" : "19.2px"}
                  />
                )}
              </Box>
            )}

            {/* info in md  */}
            <Flex
              gap={{ md: "24px" }}
              justifyContent={{ base: "space-between", md: "normal" }}
              alignItems={"center"}
              display={{ base: "none", md: "flex" }}
            >
              {/* posted */}
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={{ base: "2px", md: "6px" }}
                align={{ base: "flex-start", md: "center" }}
              >
                <CustomText
                  text={"Posted"}
                  color={"#666"}
                  size={{ base: "12px", md: "14px" }}
                  height={{ base: "18px", md: "24px" }}
                />
                {isLoading ? (
                  <SkeletonText noOfLines={1} w="100px" />
                ) : (
                  <CustomText
                    text={
                      task?.publishedDate
                        ? `${formatDateAgo(task?.publishedDate)} `
                        : ""
                    }
                    color={"#212121"}
                    size={{ base: "14px", md: "16px" }}
                    height={{ base: "21px", md: "30px" }}
                    weight={600}
                  />
                )}
              </Flex>
              {/* Deadline */}
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={{ base: "2px", md: "6px" }}
                align={{ base: "flex-start", md: "center" }}
              >
                <CustomText
                  text={"Deadline"}
                  color={"#666"}
                  size={{ base: "12px", md: "14px" }}
                  height={{ base: "18px", md: "24px" }}
                />
                {isLoading ? (
                  <SkeletonText noOfLines={1} w="100px" />
                ) : (
                  <CustomText
                    text={
                      task?.deadline
                        ? `${calculateRemainingDays(task?.deadline)} days left`
                        : ""
                    }
                    color={"#212121"}
                    size={{ base: "14px", md: "16px" }}
                    height={{ base: "21px", md: "30px" }}
                    weight={600}
                  />
                )}
              </Flex>
              {/* Total Participants */}
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={{ base: "2px", md: "6px" }}
                align={{ base: "flex-start", md: "center" }}
              >
                <CustomText
                  text={"Total Participants"}
                  color={"#666"}
                  size={{ base: "12px", md: "14px" }}
                  height={{ base: "18px", md: "24px" }}
                />
                {isLoading ? (
                  <SkeletonText noOfLines={1} w="100px" />
                ) : (
                  <CustomText
                    text={
                      task?.participants
                        ? Number(task?.participants || 0) < 5
                          ? "Less Than 5"
                          : task?.participants
                        : "0"
                    }
                    color={"#212121"}
                    size={{ base: "14px", md: "16px" }}
                    height={{ base: "21px", md: "30px" }}
                    weight={600}
                  />
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* base desing for info start task button */}
        <Flex
          direction={"column"}
          display={{ base: "flex", md: "none" }}
          gap={"16px"}
          mt={"16px"}
          width={"100%"}
        >
          {/* info in base */}
          <Flex
            gap={{ base: "12px", md: "24px" }}
            justifyContent={{ base: "space-between", md: "normal" }}
            alignItems={"center"}
            display={{ base: "flex", md: "none" }}
            width={"100%"}
            wrap="wrap"
          >
            {/* posted */}
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={{ base: "2px", md: "6px" }}
            >
              <CustomText
                text={"Posted"}
                color={"#666"}
                size={isLessThan380 ? "10px" : { base: "12px", md: "16px" }}
                height={{ base: "18px", md: "24px" }}
              />
              {isLoading ? (
                <SkeletonText noOfLines={1} w="100px" />
              ) : (
                <CustomText
                  text={
                    task?.publishedDate
                      ? `${formatDateAgo(task?.publishedDate)} `
                      : " "
                  }
                  color={"#212121"}
                  size={isLessThan380 ? "12px" : { base: "14px", md: "20px" }}
                  height={{ base: "21px", md: "30px" }}
                  weight={600}
                />
              )}
            </Flex>
            {/* Deadline */}
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={{ base: "2px", md: "6px" }}
            >
              <CustomText
                text={"Deadline"}
                color={"#666"}
                size={isLessThan380 ? "10px" : { base: "12px", md: "16px" }}
                height={{ base: "18px", md: "24px" }}
              />
              {isLoading ? (
                <SkeletonText noOfLines={1} w="100px" />
              ) : (
                <CustomText
                  text={
                    task?.deadline
                      ? `${calculateRemainingDays(task?.deadline)} days left`
                      : "" || "0 days left"
                  }
                  color={"#212121"}
                  size={isLessThan380 ? "12px" : { base: "14px", md: "20px" }}
                  height={{ base: "21px", md: "30px" }}
                  weight={600}
                />
              )}
            </Flex>
            {/* Total Participants */}
            <Flex
              direction={{ base: "column", md: "row" }}
              gap={{ base: "2px", md: "6px" }}
            >
              <CustomText
                text={"Total Participants"}
                color={"#666"}
                size={isLessThan380 ? "10px" : { base: "12px", md: "16px" }}
                height={{ base: "18px", md: "24px" }}
              />
              {isLoading ? (
                <SkeletonText noOfLines={1} w="100px" />
              ) : (
                <CustomText
                  text={
                    task?.participants
                      ? Number(task?.participants || 0) < 5
                        ? "Less Than 5"
                        : task?.participants
                      : "0"
                  }
                  color={"#212121"}
                  size={isLessThan380 ? "12px" : { base: "14px", md: "20px" }}
                  height={{ base: "21px", md: "30px" }}
                  weight={600}
                />
              )}
            </Flex>
          </Flex>
          {/* start task button */}
          {isLoading ? (
            <Skeleton h="48px" w="100%" borderRadius="30px" />
          ) : (
            <Flex
              px={"48px"}
              justifyContent={"center"}
              alignItems={"center"}
              borderRadius={"30px"}
              bg={btnColor}
              //align-self: stretch
              alignSelf={{ base: "stretch" }}
              height={"48PX"}
              onClick={
                btnText !== "Start Task"
                  ? btnText === "Result Awaiting" ||
                    btnText === "Result Announced"
                    ? () => console.log("object")
                    : handleToggle
                  : async () => {
                      createPaymentIntent();
                    }
              }
            >
              {createPayment?.isPending ? (
                <Spinner color="#FFF" />
              ) : (
                <CustomText
                  text={btnText ? btnText : "Start Task"}
                  size={{ md: "18px" }}
                  weight={600}
                  height={{ bse: "25.6px", md: "28.8px" }}
                  color={"#FFFFFF"}
                />
              )}
            </Flex>
          )}
        </Flex>

        {/* share icon and start task  in md*/}
        <Flex alignItems={"center"} display={{ base: "none", md: "flex" }}>
          {/* <IconShare
            size={"32px"}
            color="#666666"
            onClick={onOpen}
            cursor={"pointer"}
          /> */}
          {isLoading ? (
            <Skeleton h="48px" w="226px" borderRadius="30px" />
          ) : (
            <Box
              p={{ md: "0px 0px 0px 32px" }}
              // marginLeft={"32px"}
              // borderLeft={"1px solid #ECECEC"}
            >
              <Flex
                px={"56px"}
                h="48px"
                justifyContent={"center"}
                alignItems={"center"}
                borderRadius={"30px"}
                bg={btnColor}
                //align-self: stretch
                alignSelf={{ base: "stretch" }}
                cursor={"pointer"}
                onClick={
                  btnText !== "Start Task"
                    ? btnText === "Result Awaiting" ||
                      btnText === "Result Announced"
                      ? () => console.log("object")
                      : handleToggle
                    : async () => {
                        createPaymentIntent();
                      }
                }
              >
                {createPayment?.isPending ? (
                  <Spinner color="#FFF" />
                ) : (
                  <CustomText
                    text={btnText ? btnText : "Start Task"}
                    size={{ md: "18px" }}
                    weight={600}
                    height={{ bse: "25.6px", md: "28.8px" }}
                    color={"#FFFFFF"}
                  />
                )}
              </Flex>
            </Box>
          )}
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap={"20px"} align="center" w="100%" mb="30px">
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
            <Stack
              flexGrow={1}
              justify={"end"}
              gap="10px"
              align="center"
              w="100%"
            >
              <Flex w="100%">
                <Flex
                  border="1px solid #ECECEC"
                  flexGrow={1}
                  borderLeftRadius={"8px"}
                  p="10px"
                  h="50px"
                  align={"center"}
                >
                  <Text wordBreak={"break-all"} noOfLines={1}>
                    {referralLink}
                  </Text>
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
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Payment View */}
      {/* in web view modal */}

      <Flex width={"100%"} display={{ base: "none", md: "flex" }}>
        {/* Success Modal */}
        <Modal
          isOpen={isSuccessPopUp && !isMobile}
          isCentered
          onClose={() => {}}
        >
          <ModalOverlay
            bg={"rgba(33, 33, 33, 0.20)"}
            backdropFilter={" blur(3px)"}
            width={"100%"}
          />
          <ModalContent
            justifyContent={"center"}
            alignItems={"center"}
            width={"100%"}
            maxWidth={"504px"}
          >
            <Success toggle={handlePay} />
          </ModalContent>
        </Modal>
        {btnText && btnText.includes("Start") ? (
          <Modal isOpen={toggle && !isMobile} onClose={handleToggle} isCentered>
            <ModalOverlay
              bg={"rgba(33, 33, 33, 0.20)"}
              backdropFilter={" blur(3px)"}
              width={"100%"}
            />
            <ModalContent
              justifyContent={"center"}
              alignItems={"center"}
              width={"100%"}
              maxWidth={"500px"}
            >
              <ModalBody p="0">
                <Transaction
                  toggle={handleToggle}
                  pay={createPaymentIntent}
                  task={task}
                  paymentIntentInfo={paymentIntentInfo}
                  isLoading={createPayment?.isPending}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        ) : (
          <Drawer
            isOpen={toggle && !isMobile}
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
                {btnText && btnText.includes("Submit") && (
                  <>
                    {
                      <UploadFileModal
                        toggle={handleToggle}
                        title={task?.title}
                        icon={task?.icon || "https://via.placeholder.com/150"}
                        type={task?.category?.[0]?.categoryName}
                        color={task?.category?.[0]?.textColorCode}
                      />
                    }
                  </>
                )}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        )}
      </Flex>
      {/* in mobile view modal/sheet */}
      <Sheet
        isOpen={toggle && isMobile}
        onClose={handleToggle}
        detent="content-height"
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <Box
              display="flex"
              // height="100vh" // Adjust height as needed
              overflowY="auto"
              mb={"10px"}
            >
              {" "}
              {btnText && btnText.includes("Start") && (
                <Transaction
                  toggle={handleToggle}
                  pay={createPaymentIntent}
                  task={task}
                  paymentIntentInfo={paymentIntentInfo}
                  isLoading={createPayment?.isPending}
                />
              )}
              {btnText && btnText.includes("Submit") && (
                <>
                  {
                    <UploadFileModal
                      toggle={handleToggle}
                      taskId={taskId}
                      title={task?.title}
                      icon={task?.icon || "https://via.placeholder.com/150"}
                      type={task?.category?.[0]?.categoryName}
                      color={task?.category?.[0]?.textColorCode}
                    />
                  }
                </>
              )}
            </Box>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
      <Sheet
        isOpen={isSuccessPopUp && isMobile}
        onClose={() => setIsSuccessPopup(false)}
        detent="content-height"
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <Box
              display="flex"
              // height="100vh" // Adjust height as needed
              overflowY="auto"
              mb={"10px"}
            >
              <Success toggle={handlePay} taskId={taskId} />
            </Box>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
};

export default TitleCard;
