"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Flex,
  SimpleGrid,
  Stack,
  Wrap,
  Center,
  useOutsideClick,
  useToast,
  Spinner,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerCloseButton,
  DrawerBody,
  DrawerFooter,
  SkeletonText,
  Skeleton,
} from "@chakra-ui/react";
import CustomText from "@/components/fonts/text";
import { BlackButton, TransparentButton } from "@/components/buttons/button";
import { PrimaryInput, PrimaryTextarea } from "@/components/input";
import { IconSearch, IconXboxX } from "@tabler/icons-react";
import {
  useEditProfile,
  useGetAllInterests,
  useGetSkills,
} from "@/utils/auth.api";
const AboutMe = ({ userData, isOpen, onOpen, onClose, isLoading }: any) => {
  const skills = [
    "Java Development",
    "Kotlin Development",
    "Flutter Development",
    "Android Development",
  ];
  const toast = useToast();
  const { data: interestData } = useGetAllInterests();
  const { data: skillsData } = useGetSkills();

  const editProfileMutation = useEditProfile();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInterestSearchOpen, setIsInterestSearchOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("");
  const ref: any = useRef();
  const interestRef: any = useRef();

  const [formData, setFormData] = useState<any>({
    fullname: "",
    title: "",
    aboutMe: "",
    skills: [],
    interests: [],
  });

  useOutsideClick({
    ref: ref,
    handler: () => setIsSearchOpen(false),
  });
  useOutsideClick({
    ref: interestRef,
    handler: () => setIsInterestSearchOpen(false),
  });

  const filteredSkillsData = () => {
    if (skillsData) {
      const tempSkills = skillsData?.filter(
        (skill: any) =>
          !formData?.skills?.some((item: any) => item?.id === skill?.id)
      );
      return tempSkills.filter((item: any) =>
        item?.skillName?.toLowerCase().includes(selectedSkill.toLowerCase())
      );
    }
  };

  const filteredInterestData = () => {
    if (interestData) {
      const tempInterests = interestData?.filter(
        (interest: any) =>
          !formData?.interests?.some((item: any) => item?.id === interest?.id)
      );
      return tempInterests.filter((item: any) =>
        item?.categoryName
          ?.toLowerCase()
          .includes(selectedInterest.toLowerCase())
      );
    }
  };

  useEffect(() => {
    if (userData) {
      setFormData({
        fullname: userData?.fullname,
        title: userData?.title,
        aboutMe: userData?.aboutMe,
        skills: userData?.skills || [],
        interests: userData?.interests || [],
      });
    }
  }, [userData]);

  return (
    <Box
      p={{ base: "16px", md: "24px" }}
      borderRadius={"16px"}
      border="1px solid #ECECEC"
      bg="#fff"
    >
      <Flex justify={"space-between"} align={"center"}>
        {isLoading ? (
          <>
            <SkeletonText noOfLines={1} w="120px" />
            <Skeleton
              h={{ base: "32px", md: "44px" }}
              borderRadius="56px"
              w={{
                base: "80px",
                md: "140px",
              }}
            />
          </>
        ) : (
          <>
            <CustomText text="About Me" size="24px" weight="600" h="28px" />
            <TransparentButton
              btnText="Edit"
              h={{ base: "32px", md: "44px" }}
              fontSize="16px"
              w={{ base: "80px", md: "140px" }}
              mtText="0px"
              onClick={onOpen}
            />
          </>
        )}
      </Flex>
      {isLoading ? (
        <SkeletonText noOfLines={1} w="120px" mt="10px" h="14px" />
      ) : (
        <CustomText text={userData?.title} weight="500" size="20px" mt="16px" />
      )}
      {isLoading ? (
        <SkeletonText noOfLines={1} w="120px" mt="10px" h="14px" />
      ) : (
        <CustomText text={userData?.aboutMe || ""} color="#666666" mt="16px" />
      )}
      {/* <CustomText
        text="Eget aliquam faucibus molestie tortor. Consectetur blandit id arcu gravida id quam pretium. At cursus egestas ornare dignissim ullamcorper blandit. Sed quam blandit cras elementum turpis turpis leo. Quis in mi vitae vitae. Porttitor enim amet magna."
        color="#666666"
        mt="16px"
      /> */}
      <Drawer
        placement="right"
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={undefined}
      >
        <DrawerOverlay />
        <DrawerContent
          minW={{ base: "80vw", xl: "800px" }}
          maxW={{ base: "80vw", xl: "800px" }}
        >
          <DrawerHeader>Edit Profile</DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody p="24px" display={"flex"} flexDir={"column"} gap="32px">
            <Stack>
              <CustomText text="Full Name" weight="600" />
              <PrimaryInput
                ph="Full Name"
                value={formData?.fullname}
                onChange={(e: any) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
              />
            </Stack>
            <Stack>
              <CustomText text="Profile Title" weight="600" />
              <PrimaryInput
                ph="Profile Title"
                value={formData?.title}
                onChange={(e: any) => {
                  const newValue = e.target.value.slice(0, 25);
                  setFormData({ ...formData, title: newValue });
                }}
              />
              <Flex justify="space-between">
                <CustomText
                  text="Maximum 25 characters"
                  size="12px"
                  color="#666"
                  h="160%"
                />
                <CustomText
                  text={`${formData?.title?.length || 0} / 25`}
                  size="12px"
                  color="#666"
                  h="160%"
                />
              </Flex>
            </Stack>
            <Stack>
              <CustomText text="About Me" weight="600" />
              <PrimaryTextarea
                value={formData?.aboutMe}
                onChange={(e: any) => {
                  const newValue = e.target.value.slice(0, 500);
                  setFormData({ ...formData, aboutMe: newValue });
                }}
                ph="Write your bio here..."
              />
              <Flex justify="space-between">
                <CustomText
                  text="Maximum 500 characters"
                  size="12px"
                  color="#666"
                  h="160%"
                />
                <CustomText
                  text={`${formData?.aboutMe?.length || 0} / 500`}
                  size="12px"
                  color="#666"
                  h="160%"
                />
              </Flex>
            </Stack>
            <Stack gap="16px">
              <Flex justify="space-between">
                <CustomText text="Skills" weight="600" />
                <CustomText
                  text="Maximum 10 skills"
                  size="12px"
                  color="#666"
                  h="160%"
                />
              </Flex>
              <Box onClick={() => setIsSearchOpen(true)}>
                <PrimaryInput
                  h="56px"
                  ph="Search Skills"
                  Icon={IconSearch}
                  value={selectedSkill}
                  onChange={(e: any) => setSelectedSkill(e.target.value)}
                />
              </Box>
              {isSearchOpen && (
                <Stack
                  p="8px"
                  bg="#fff"
                  mt="-15px"
                  borderRadius={"12px"}
                  border="1px solid #F6F6F6"
                  position="relative"
                  zIndex={2}
                  ref={ref}
                  minH="80px"
                >
                  {filteredSkillsData()?.map((item: any, idx: any) => (
                    <Flex
                      key={idx}
                      px="16px"
                      py="8px"
                      gap="8px"
                      align="center"
                      _hover={{ bg: "#F6F6F6" }}
                      cursor={"pointer"}
                      bg="#fff"
                      onClick={() => {
                        setSelectedSkill("");
                        setIsSearchOpen(false);
                        // Check if formData exists and if skills array exists inside it
                        if (formData && formData.skills) {
                          if (
                            !formData?.skills?.find(
                              (skill: any) => skill?.id === item?.id
                            )
                          ) {
                            const updatedSkills = [...formData.skills, item];
                            setFormData({
                              ...formData,
                              skills: updatedSkills,
                            });
                          }
                        }
                      }}
                    >
                      <Center
                        boxSize={"24px"}
                        borderRadius={"4px"}
                        bg={
                          selectedSkill === item?.skillName
                            ? "white"
                            : "#F6F6F6"
                        }
                      >
                        <Box
                          boxSize={"12px"}
                          borderRadius={"3px"}
                          bg={
                            selectedSkill === item?.skillName
                              ? "#212121"
                              : "white"
                          }
                        />
                      </Center>
                      <CustomText
                        text={item?.skillName}
                        color="#666"
                        h="20px"
                      />
                    </Flex>
                  ))}
                </Stack>
              )}
              {formData?.skills?.length && (
                <Wrap
                  p="16px"
                  borderRadius={"8px"}
                  border="1px solid #ECECEC"
                  gap="16px"
                  // mt={isSearchOpen ? "-180px" : "0px"}
                >
                  {formData?.skills?.map((skill: any, index: any) => (
                    <Center
                      key={index}
                      bg="#F6F6F6"
                      borderRadius={"20px"}
                      py="4px"
                      px="12px"
                      gap="12px"
                      h="34px"
                    >
                      <CustomText text={skill?.skillName} h="100%" />
                      <IconXboxX
                        color="#212121"
                        size="16px"
                        cursor={"pointer"}
                        onClick={() => {
                          // Check if formData exists and if skills array exists inside it
                          if (formData && formData.skills) {
                            // Create a new array with the skill removed
                            const updatedSkills = formData?.skills?.filter(
                              (item: any) => item?.id !== skill?.id
                            );
                            // Update formData with the new skills array
                            setFormData({ ...formData, skills: updatedSkills });
                          }
                        }}
                      />
                    </Center>
                  ))}
                </Wrap>
              )}
            </Stack>
            <Stack gap="16px">
              <Flex justify="space-between">
                <CustomText text="Interests" weight="600" />
                <CustomText
                  text="Maximum 10 Interests"
                  size="12px"
                  color="#666"
                  h="160%"
                />
              </Flex>
              <Box onClick={() => setIsInterestSearchOpen(true)}>
                <PrimaryInput
                  h="56px"
                  ph="Search Interest"
                  Icon={IconSearch}
                  value={selectedInterest}
                  onChange={(e: any) => setSelectedInterest(e.target.value)}
                />
              </Box>
              {isInterestSearchOpen && (
                <Stack
                  p="8px"
                  bg="white"
                  mt="-15px"
                  borderRadius={"12px"}
                  border="1px solid #F6F6F6"
                  position="relative"
                  zIndex={2}
                  ref={interestRef}
                  minH="80px"
                >
                  {filteredInterestData()?.map((item: any, idx: any) => (
                    <Flex
                      key={idx}
                      px="16px"
                      py="8px"
                      gap="8px"
                      align="center"
                      _hover={{ bg: "#F6F6F6" }}
                      cursor={"pointer"}
                      onClick={() => {
                        setSelectedInterest("");
                        setIsInterestSearchOpen(false);
                        // Check if formData exists and if skills array exists inside it
                        if (formData && formData.interests) {
                          if (
                            !formData?.interests?.find(
                              (interest: any) => interest?.id === item?.id
                            )
                          ) {
                            const updatedInterest = [
                              ...formData.interests,
                              item,
                            ];
                            setFormData({
                              ...formData,
                              interests: updatedInterest,
                            });
                          }
                        }
                      }}
                    >
                      <Center
                        boxSize={"24px"}
                        borderRadius={"4px"}
                        bg={
                          selectedInterest === item?.categoryName
                            ? "white"
                            : "#F6F6F6"
                        }
                      >
                        <Box
                          boxSize={"12px"}
                          borderRadius={"3px"}
                          bg={
                            selectedInterest === item?.categoryName
                              ? "#212121"
                              : "white"
                          }
                        />
                      </Center>
                      <CustomText
                        text={item?.categoryName}
                        color="#666"
                        h="20px"
                      />
                    </Flex>
                  ))}
                </Stack>
              )}
              {formData?.interests?.length && (
                <Wrap
                  p="16px"
                  borderRadius={"8px"}
                  border="1px solid #ECECEC"
                  gap="16px"
                  mt={isInterestSearchOpen ? "-180px" : "0px"}
                >
                  {formData?.interests?.map((interest: any, index: any) => (
                    <Center
                      key={index}
                      bg="#F6F6F6"
                      borderRadius={"20px"}
                      py="4px"
                      px="12px"
                      gap="12px"
                      h="34px"
                    >
                      <CustomText text={interest?.categoryName} h="100%" />
                      <IconXboxX
                        color="#212121"
                        size="16px"
                        cursor={"pointer"}
                        onClick={() => {
                          // Check if formData exists and if skills array exists inside it
                          if (formData && formData.interests) {
                            // Create a new array with the skill removed
                            const updatedInterest = formData?.interests?.filter(
                              (item: any) => item?.id !== interest?.id
                            );
                            // Update formData with the new skills array
                            setFormData({
                              ...formData,
                              interests: updatedInterest,
                            });
                          }
                        }}
                      />
                    </Center>
                  ))}
                </Wrap>
              )}
            </Stack>
          </DrawerBody>
          <DrawerFooter>
            <SimpleGrid spacing="12px" w="100%" columns={{ md: 2 }}>
              <Box w="100%">
                <BlackButton
                  h="48px"
                  btnText="Cancel"
                  onClick={onClose}
                  bg="#F6F6F6"
                  color="#212121"
                />
              </Box>
              <Box w="100%">
                <BlackButton
                  disabled={editProfileMutation?.isPending}
                  h="48px"
                  btnText={
                    editProfileMutation?.isPending ? (
                      <Spinner />
                    ) : (
                      "Save & Update"
                    )
                  }
                  onClick={async () => {
                    try {
                      await editProfileMutation?.mutateAsync({
                        ...formData,
                        skills: formData?.skills?.map(
                          (skill: any) => skill?.id
                        ),
                        interests: formData?.interests?.map(
                          (interest: any) => interest?.id
                        ),
                      });
                      toast({
                        title: "Profile Updated SUccesfully!!!",
                        status: "success",
                        position: "top-right",
                      });
                      onClose();
                    } catch (error: any) {
                      toast({
                        title: error?.message,
                        status: "error",
                        position: "top-right",
                      });
                    }
                  }}
                />
              </Box>
            </SimpleGrid>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default AboutMe;
