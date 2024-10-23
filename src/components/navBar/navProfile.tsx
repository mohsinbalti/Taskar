import {
  Avatar,
  Box,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SkeletonCircle,
  SkeletonText,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import CustomText from "../fonts/text";
import { IconChevronDown } from "@tabler/icons-react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ChangePasswordModal from "./changePasswordModal";

const NavProfile = ({ user, isLoading }: any) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const pathname = usePathname();
  useQuery({
    queryKey: ["token"],
    queryFn: () => localStorage.getItem("token"),
  });

  const {
    isOpen: isChangePasswordOpen,
    onOpen: onPasswordChangeOpen,
    onClose: onPasswordChangeClose,
  } = useDisclosure();

  return (
    <Flex>
      {isLoading ? (
        <SkeletonCircle size="30px" display={{ base: "block", md: "none" }} />
      ) : (
        <Avatar
          src={user?.picture || `/avatars/placeholder.jpg`}
          name={user?.fullname || user?.email?.split("@")[0]}
          boxSize={{ base: "30px" }}
          display={{ base: "block", md: "none" }}
          onClick={() => router.push("/profile")}
        />
      )}
      <Menu>
        <MenuButton>
          <Flex
            p={"12px"}
            alignItems={"center"}
            gap={"12px"}
            borderRadius={"42px"}
            //border={"1px solid #ECECEC"}
            //bg={"#F6F6F6"}
            maxHeight={"64px"}
            onClick={() => router.push("/profile")}
            cursor={"pointer"}
            display={{ base: "none", md: "flex" }}
          >
            {isLoading ? (
              <SkeletonCircle size="40px" />
            ) : (
              <Avatar
                src={user?.picture || "/icons/user.svg"}
                name={user?.fullname || user?.email?.split("@")[0]}
                boxSize={"40px"}
              />
            )}
            <Flex direction={"column"} justifyContent={"start"} gap={"4px"}>
              {isLoading ? (
                <>
                  <SkeletonText noOfLines={1} w="50px" h="10px" />
                  <SkeletonText noOfLines={1} w="110px" h="10px" />
                </>
              ) : (
                <>
                  <CustomText
                    text={user?.fullname || user?.email?.split("@")[0]}
                    weight={600}
                    size={"16px"}
                    h={"normal"}
                  />
                  <CustomText
                    text={user?.email}
                    weight={400}
                    size={"12px"}
                    h={"normal"}
                  />
                </>
              )}
            </Flex>
            <IconChevronDown size={"24px"} color="#212121" cursor={"pointer"} />
          </Flex>
        </MenuButton>
        <MenuList
          p="0px"
          minW="234px"
          borderRadius="12px"
          border="1px solid #ECECEC"
          bg="#fff"
          boxShadow="0px 5px 30px 0px rgba(0, 0, 0, 0.08)"
          width="100%"
        >
          <Flex p="16px" flexDir="column" gap="8px">
            <MenuItem
              onClick={() => router.push("/profile")}
              borderRadius="6px"
              display="flex"
              alignItems="center"
              gap="16px"
              px="8px"
              height="36px"
              background={pathname === "/profile" ? "#F6F6F6" : "#fff"}
            >
              <Image src="/icons/profile-icon.svg" alt="profile" />
              <Text color="#212121" fontSize="16px" fontWeight="400">
                Profile
              </Text>
            </MenuItem>
            <MenuItem
              onClick={() => onPasswordChangeOpen()}
              borderRadius="6px"
              display="flex"
              alignItems="center"
              gap="16px"
              px="8px"
              height="36px"
            >
              <Image src="/icons/lock.svg" alt="profile" />
              <Text color="#212121" fontSize="16px" fontWeight="400">
                Change Password
              </Text>
            </MenuItem>
            {/* <MenuItem
              onClick={() => router.push("/dashboard")}
              borderRadius="6px"
              display="flex"
              alignItems="center"
              gap="16px"
              px="8px"
              height="36px"
              background={pathname === "/dashboard" ? "#F6F6F6" : "#fff"}
            >
              <Image src="/icons/dashboard-ico.svg" alt="profile" />
              <Text color="#212121" fontSize="16px" fontWeight="400">
                Dashboard
              </Text>
            </MenuItem>
            <MenuItem
              onClick={() => router.push("/transaction-history")}
              borderRadius="6px"
              display="flex"
              alignItems="center"
              gap="16px"
              px="8px"
              height="36px"
              background={
                pathname === "/transaction-history" ? "#F6F6F6" : "#fff"
              }
            >
              <Image src="/icons/transaction-history.svg" alt="profile" />
              <Text color="#212121" fontSize="16px" fontWeight="400">
                Transaction History
              </Text>
            </MenuItem> */}
          </Flex>
          <Divider />
          <Box padding="16px">
            <MenuItem
              borderRadius="8px"
              display="flex"
              alignItems="center"
              gap="16px"
              height="36px"
              px="8px"
              _hover={{
                background: "#fff",
              }}
              onClick={() => {
                localStorage?.removeItem("token");
                queryClient.invalidateQueries();
              }}
            >
              <Image src="/icons/logout-ico.svg" alt="profile" />
              <Text color="#212121" fontSize="16px" fontWeight="400">
                Logout
              </Text>
            </MenuItem>
          </Box>
        </MenuList>
      </Menu>
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={onPasswordChangeClose}
        onOpen={onPasswordChangeOpen}
      />
    </Flex>
  );
};

export default NavProfile;
