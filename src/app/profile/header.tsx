import { BlackButton, TransparentButton } from "@/components/buttons/button";
import CustomText from "@/components/fonts/text";
import { useEditProfile } from "@/utils/auth.api";
import {
  Avatar,
  Box,
  Button,
  Center,
  Circle,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  SimpleGrid,
  SkeletonCircle,
  SkeletonText,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { read } from "fs";
import React, { useRef, useState } from "react";
import { useUploadMedia } from "@/utils/media.api";

const Header = ({ userData, isLoading }: any) => {
  const toast = useToast();
  const {
    isOpen: isUploadOpen,
    onOpen: onUploadOpen,
    onClose: onUploadClose,
  } = useDisclosure();

  const fileUploadRef = useRef<HTMLInputElement>(null);
  const editProfileMutation = useEditProfile();
  const uploadMedia = useUploadMedia();

  const [image, setImage] = useState<any>(null);

  const handleImageUpload = () => {
    if (fileUploadRef.current) {
      fileUploadRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast({
        title: "File size exceeds 2 MB",
        status: "error",
        position: "top-right",
        isClosable: true,
        duration: 3000,
      });
      return;
    }

    const form = new FormData();
    form.append("file", file);
    uploadMedia
      .mutateAsync(form)
      .then(async (result) => {
        const formData: any = {
          image: result,
        };
        await editProfileMutation?.mutateAsync(formData);
        onUploadClose();
        toast({
          title: "Picture Uploaded Successfully!!!",
          status: "success",
          position: "top-right",
        });
      })
      .catch((err) => {
        toast({
          title: err?.message || "Error uploading image",
          status: "error",
          position: "top-right",
          isClosable: true,
          duration: 3000,
        });
      });
  };
  return (
    <Flex gap="32px" direction={{ base: "column", md: "row" }} align={"center"}>
      <Stack align={"center"} w={"fit-content"}>
        {isLoading ? (
          <SkeletonCircle boxSize="140px" />
        ) : (
          <Avatar
            boxSize="140px"
            border="0.4px solid #e6e6e6"
            src={
              image
                ? image
                : userData?.picture
                ? userData?.picture
                : "/icons/user.svg"
            }
            name={userData?.fullname}
          />
        )}

        <>
          {/* Invisible file input element */}

          {/* <Input
            id="image-upload"
            type="file"
            accept="image/*"
            // style={{ display: "none" }}
            onChange={onUploadOpen}
            // ref={fileUploadRef}
            hidden
            style={{ display: "none" }}
          /> */}
          {/* Image component with onClick handler */}
          <Image
            src="/icons/camera.svg"
            alt=""
            mt="-28px"
            zIndex="1"
            cursor={"pointer"}
            onClick={onUploadOpen}
          />
        </>
      </Stack>
      <Flex
        justify={"space-between"}
        align={"center"}
        flexGrow={1}
        w={{ base: "100%", md: "auto" }}
        wrap={"wrap"}
        gap="15px"
      >
        <Stack gap={{ base: "8px", md: "16px" }}>
          <Flex gap={{ base: "4px", md: "12px" }} align={"center"}>
            {isLoading ? (
              <SkeletonText w="120px" noOfLines={1} />
            ) : (
              <CustomText
                text={userData?.fullname}
                weight="600"
                h="120%"
                size={{ base: "16px", md: "32px" }}
              />
            )}
            {/* {userData?.title && (
              <Button
                gap={{ base: "4px", md: "10px" }}
                h={{ base: "28px", md: "35px" }}
                bg="#F4B0001A"
                color="#F4B000"
                borderRadius={"8px"}
                w={{ base: "18px", md: "140px" }}
                px={{ base: "0", md: "auto" }}
                fontSize={{ base: "10px", md: "12px" }}
                fontWeight={"600"}
                _hover={{}}
                _active={{}}
              >
                <Image src="/icons/crown.svg" alt="" />
                <Box display={{ base: "none", md: "block" }}>
                  {userData?.title}
                </Box>
              </Button>
            )} */}
          </Flex>
          <Stack gap="16px" w="fit-content">
            <CustomText
              text={`${
                Number(userData?.taskCompletionRate || 0)?.toLocaleString(
                  undefined,
                  {
                    maximumFractionDigits: 2,
                  }
                ) || 0
              }% Task Completion Rate`}
              size={{ base: "12px", md: "18px" }}
              weight={{ base: "400", md: "500" }}
            />
            <Progress
              size="lg"
              value={userData?.taskCompletionRate || 0}
              borderRadius={"12px"}
              display={{ base: "none", md: "block" }}
              sx={{
                "& > div:first-of-type": {
                  bg: "#212121",
                },
              }}
            />
          </Stack>
        </Stack>
        <Stack gap={{ base: "8px", md: "16px" }} align={{ md: "end" }}>
          <CustomText
            text="Total Earnings"
            weight="500"
            size={{ base: "14px", md: "20px" }}
          />
          {isLoading ? (
            <SkeletonText w="120px" noOfLines={1} h="32px" />
          ) : (
            <CustomText
              text={
                Number(userData?.totalEarnings)?.toLocaleString(undefined, {
                  maximumFractionDigits: 4,
                }) || 0
              }
              weight="500"
              t2="USD"
              size={{ base: "16px", md: "32px" }}
              h="32px"
              t2Size={{ base: "12px", md: "20px" }}
              t2Weight="500"
            />
          )}
        </Stack>
      </Flex>
      <Modal
        isOpen={isUploadOpen}
        onClose={onUploadClose}
        size={{ base: "xs", sm: "sm", md: "md" }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {" "}
            <CustomText
              text="Upload Profile Photo"
              weight="600"
              size={{ base: "18px", md: "24px" }}
            />{" "}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            pt="32px"
            px="24px"
            pb="24px"
            onClick={() => {
              if (uploadMedia?.isPending || editProfileMutation.isPending)
                return;
              handleImageUpload();
            }}
            cursor={"pointer"}
          >
            <Center
              flexDirection={"column"}
              border="1px dashed #666666"
              h="274px"
              w="100%"
              borderRadius={"8px"}
              gap="32px"
              px="5px"
            >
              <Image
                src={
                  userData?.picture
                    ? userData?.picture
                    : image || "/icons/user.svg"
                }
                alt=""
                w={"140px "}
              />
              <CustomText
                color="#666"
                text="Upload  jpeg files only of maximum size 2 MBs"
                size="12px"
                align="center"
              />
            </Center>
            <Input
              type="file"
              onChange={handleImageChange}
              style={{ display: "none" }}
              accept=".jpeg, .jpg"
              id="image-upload"
              ref={fileUploadRef}
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
                  onClick={onUploadClose}
                />
              </Box>
              <Box w="100%">
                <BlackButton
                  h="48px"
                  btnText="Choose Image"
                  borderRadius="40px"
                  isLoading={
                    editProfileMutation.isPending || uploadMedia?.isPending
                  }
                  onClick={handleImageUpload}
                />
              </Box>
            </SimpleGrid>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Header;
