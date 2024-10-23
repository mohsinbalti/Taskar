"use client";
import CustomText from "@/components/fonts/text";
import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Skeleton,
  SkeletonText,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import { IconChevronDown } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  useExportTransactionHistory,
  useGetTransactionHistory,
} from "@/utils/task.api";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";
import { useGetLoggedInUser } from "@/utils/auth.api";

const timePeriods = [
  { label: "Last 24 Hours", value: 24 * 60 * 60 * 1000 },
  { label: "Last Week", value: 7 * 24 * 60 * 60 * 1000 },
  { label: "Last 2 Weeks", value: 14 * 24 * 60 * 60 * 1000 },
  { label: "Last Month", value: 30 * 24 * 60 * 60 * 1000 },
  { label: "Last 3 Months", value: 90 * 24 * 60 * 60 * 1000 },
  { label: "Last 6 Months", value: 180 * 24 * 60 * 60 * 1000 },
];

function TransactionHistory() {
  const toast = useToast();

  const [filterValue, setFilterValue] = useState(timePeriods[0]);

  const [page, setPage] = useState(0);
  const limit = 10;
  const offset = page * limit;

  const { data, isLoading, refetch, error } = useGetTransactionHistory(
    limit,
    offset,
    filterValue.value
  );
  const exportPDF = useExportTransactionHistory();

  const { data: userInfo, isLoading: userInfoLoading } = useGetLoggedInUser();

  const handlePageClick = (selectedItem: any) => {
    setPage(selectedItem.selected);
  };

  const handleExportClick = async () => {
    try {
      const response = await exportPDF?.mutateAsync(filterValue.value);

      if (response.error) {
        toast({
          title: "Export Failed",
          description: "Failed to export PDF. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } else {
        if (typeof window !== "undefined") {
          const blob = new Blob([response], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "EzTasker - Transaction History";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          toast({
            title: "Export Successful",
            description: "PDF exported successfully!",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        }
      }
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to export PDF. Please try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterValue]);

  return (
    <DashboardLayout>
      <Box
        maxW="1440px"
        mx="auto"
        width={"100%"}
        pb="32px"
        px={{ base: "16px", md: "32px" }}
      >
        <Flex
          mt="24px"
          align={{ base: "start", md: "center" }}
          justify="space-between"
          flexDir={{ base: "column", md: "row" }}
          gap="24px"
        >
          <CustomText
            text="Transaction History"
            size="32px"
            weight="600"
            color="#212121"
          />
          <Flex
            align="center"
            gap="16px"
            display={{ base: "none", md: "flex" }}
            flexDir={{ base: "column", sm: "row" }}
            w={{ base: "100%", sm: "auto" }}
          >
            <Menu>
              <MenuButton
                gap="20px"
                p="10px 24px"
                border="1px solid #ECECEC"
                bg="#fff"
                borderRadius="40px"
                minW={{ base: "100%", sm: "200px" }}
                w="100%"
              >
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  gap="20px"
                >
                  <CustomText text={filterValue.label} />
                  <IconChevronDown color="#212121" />
                </Flex>
              </MenuButton>
              <MenuList
                display="flex"
                flexDir="column"
                gap="8px"
                p="16px"
                boxShadow=" 0px 5px 30px 0px rgba(0, 0, 0, 0.08)"
                borderRadius="12px"
                border="1px solid #ECECEC"
              >
                {timePeriods.map((item, index) => (
                  <>
                    <MenuItem
                      key={index}
                      onClick={() => setFilterValue(item)}
                      height="20px"
                      bg="#fff"
                      color={filterValue === item ? "#212121" : "#666"}
                      fontSize="14px"
                      fontWeight="400"
                      marginY="4px"
                    >
                      {item.label}
                    </MenuItem>
                    {index !== timePeriods.length - 1 && (
                      <Divider color="#ECECEC" />
                    )}
                  </>
                ))}
              </MenuList>
            </Menu>
            {/* <BlackButton
              btnText="Export PDF"
              minW={{ base: "100%", sm: "199px" }}
              h="44px"
              fontSize="16px"
              color="#fff"
              borderRadius="40px"
              isLoading={exportPDF?.isPending}
              onClick={handleExportClick}
            /> */}
          </Flex>
        </Flex>
        <Flex
          align="center"
          gap="16px"
          mt="24px"
          w="100%"
          flexWrap={{ base: "wrap", md: "nowrap" }}
        >
          <StatCard
            key={1}
            title={"Total Balance"}
            value={Number(userInfo?.availableBalance || 0)?.toFixed(2)}
            icon="/icons/dollor-ico.svg"
            isLoading={userInfoLoading}
          />
          <StatCard
            key={1}
            title={"Pending Balance"}
            value={Number(userInfo?.pendingBalance || 0)?.toFixed(2)}
            icon="/icons/dollor-ico.svg"
            isLoading={userInfoLoading}
          />
          <StatCard
            key={1}
            title={"Total Withdraw"}
            value={Number(userInfo?.totalWithdraw || 0)?.toFixed(2)}
            icon="/icons/withdraw-ico.svg"
            isLoading={userInfoLoading}
          />
          <StatCard
            key={1}
            title={"Processing Balance"}
            value={Number(userInfo?.processingBalance || 0)?.toFixed(2)}
            icon="/icons/withdraw-ico.svg"
            isLoading={userInfoLoading}
          />
        </Flex>
        <Flex
          align="center"
          gap="16px"
          mt="16px"
          display={{ base: "flex", md: "none" }}
          flexDir={{ base: "column", sm: "row" }}
          w={{ base: "100%", sm: "auto" }}
        >
          <Menu>
            <MenuButton
              gap="20px"
              p="10px 24px"
              border="1px solid #ECECEC"
              bg="#fff"
              borderRadius="40px"
              minW={{ base: "100%", sm: "200px" }}
              w="100%"
            >
              <Flex
                alignItems="center"
                justifyContent="space-between"
                gap="20px"
              >
                <CustomText text={filterValue.label} />
                <IconChevronDown color="#212121" />
              </Flex>
            </MenuButton>
            <MenuList
              display="flex"
              flexDir="column"
              gap="8px"
              p="16px"
              boxShadow=" 0px 5px 30px 0px rgba(0, 0, 0, 0.08)"
              borderRadius="12px"
              border="1px solid #ECECEC"
            >
              {timePeriods.map((item, index) => (
                <>
                  <MenuItem
                    key={index}
                    onClick={() => setFilterValue(item)}
                    height="20px"
                    bg="#fff"
                    color={filterValue === item ? "#212121" : "#666"}
                    fontSize="14px"
                    fontWeight="400"
                    marginY="4px"
                  >
                    {item.label}
                  </MenuItem>
                  {index !== timePeriods.length - 1 && (
                    <Divider color="#ECECEC" />
                  )}
                </>
              ))}
            </MenuList>
          </Menu>
          {/* <BlackButton
            btnText="Export PDF"
            minW={{ base: "100%", sm: "199px" }}
            h="44px"
            fontSize="16px"
            color="#fff"
            isDisabled={exportPDF?.isPending}
            isLoading={exportPDF?.isPending}
            onClick={handleExportClick}
          /> */}
        </Flex>

        <TableContainer my="20px">
          <Table>
            <Thead bg="#212121" p="16px 24px">
              <Tr>
                <Th borderTopLeftRadius="12px">
                  <CustomText
                    text="Description"
                    color="#FFF"
                    size="16px"
                    weight="500"
                  />
                </Th>
                <Th>
                  <CustomText
                    text="Type"
                    color="#FFF"
                    size="16px"
                    weight="500"
                  />
                </Th>
                <Th>
                  <CustomText
                    text="Reference ID"
                    color="#FFF"
                    size="16px"
                    weight="500"
                  />
                </Th>
                <Th>
                  <CustomText
                    text="Date"
                    color="#FFF"
                    size="16px"
                    weight="500"
                  />
                </Th>
                <Th>
                  <CustomText
                    text="Status"
                    color="#FFF"
                    size="16px"
                    weight="500"
                    align="center"
                  />
                </Th>
                <Th borderTopRightRadius="12px">
                  <CustomText
                    text="Amount"
                    color="#FFF"
                    size="16px"
                    weight="500"
                    align="right"
                  />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {isLoading ? (
                new Array(5)?.fill(1)?.map((_, idx) => (
                  <Tr
                    key={idx}
                    borderLeft={`1px solid #ececec`}
                    borderRight={`1px solid #ececec`}
                    bg="#fff"
                  >
                    <Td maxW="280px" minW="280px">
                      <SkeletonText noOfLines={1} w="100%" />
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} w="100%" />
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} w="100%" />
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} w="100%" />
                    </Td>
                    <Td>
                      <Skeleton
                        h="14px"
                        borderRadius="6px"
                        w="120px"
                        mx="auto"
                      />
                    </Td>
                    <Td>
                      <SkeletonText noOfLines={1} w="100%" />
                    </Td>
                  </Tr>
                ))
              ) : error ? (
                <Tr>
                  <Td>
                    <CustomText
                      text="Error loading data"
                      color="#666"
                      size="16px"
                      weight="400"
                      align="center"
                    />
                  </Td>
                </Tr>
              ) : (
                data?.data.map((transaction: any) => (
                  <Tr
                    key={transaction.id}
                    borderLeft={`1px solid #ececec`}
                    borderRight={`1px solid #ececec`}
                    bg="#fff"
                  >
                    <Td maxW="280px" minW="280px">
                      <CustomText
                        text={transaction.transactionDescription}
                        color="#666"
                        size="16px"
                        weight="400"
                        whiteSpace="wrap"
                      />
                    </Td>
                    <Td>
                      <CustomText
                        text={transaction.transactionType}
                        color="#666"
                        size="16px"
                        weight="400"
                      />
                    </Td>
                    <Td>
                      <CustomText
                        text={transaction.referenceId}
                        color="#666"
                        size="16px"
                        weight="400"
                      />
                    </Td>
                    <Td>
                      <CustomText
                        text={new Date(
                          transaction.transactionDate
                        ).toLocaleString()}
                        color="#666"
                        size="16px"
                        weight="400"
                      />
                    </Td>
                    <Td>
                      <Flex
                        p="10px 24px"
                        bg={
                          transaction.transactionStatus === "Completed"
                            ? "rgba(10, 207, 131, 0.10)"
                            : "rgba(230, 156, 11, 0.10)"
                        }
                        borderRadius="8px"
                        justify="center"
                        align="center"
                      >
                        <CustomText
                          text={transaction.transactionStatus}
                          color={
                            transaction.transactionStatus === "Completed"
                              ? "#0ACF83"
                              : "#E69C0B"
                          }
                          size="14px"
                          weight="400"
                        />
                      </Flex>
                    </Td>
                    <Td>
                      <CustomText
                        text={`$${Number(
                          transaction.amount || 0
                        )?.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}`}
                        color="#666"
                        size="16px"
                        weight="400"
                        align="end"
                      />
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
        {!isLoading && data?.data?.length ? (
          <Flex
            flexDir={{ base: "column", md: "row" }}
            justify="space-between"
            align="center"
            p="16px 24px"
            gap="16px"
            border="1px solid #ECECEC"
            borderBottomRadius="12px"
            bg="#fff"
            marginTop="-22px"
          >
            <Flex gap="8px" align="center">
              <CustomText
                text="Showing:"
                color="#666"
                size="14px"
                weight="400"
              />
              <Flex gap="3px">
                <CustomText
                  text={`${offset + 1}-${offset + data?.data.length} `}
                  color="#212121"
                  size="14px"
                  weight="600"
                />
                <CustomText
                  text={` Out of ${data?.count}`}
                  color="#666"
                  size="14px"
                  weight="400"
                />
              </Flex>
            </Flex>

            <ReactPaginate
              pageCount={Math.ceil(data?.count / limit)}
              pageRangeDisplayed={2}
              breakLabel="..."
              nextLabel={
                <Image
                  src={"/icons/chevron-right.svg"}
                  alt="right"
                  height={"24px"}
                  width={"24px"}
                />
              }
              previousLabel={
                <Image
                  alt="left"
                  src={"/icons/chevron-left.svg"}
                  height={"24px"}
                  width={"24px"}
                />
              }
              onPageChange={handlePageClick}
              containerClassName={styles.pagination}
              pageClassName={styles["page-item"]}
              pageLinkClassName={styles["page-link"]}
              activeClassName={styles.active}
            />
          </Flex>
        ) : (
          <Flex
            minH="500px"
            flexDirection="column"
            align="center"
            justify="center"
            border="1px solid #ECECEC"
            borderBottomRadius="14px"
            bg="#fff"
            marginTop="-22px"
          >
            <Image src="/images/EmptyTrx.svg" alt="empty state" ml="-30px" />
            <CustomText
              text="No Transaction History"
              color="#212121"
              size="20px"
              weight="600"
              mt="-20px"
            />
            <CustomText
              text="You have not made any transaction yet."
              color="#666"
              size="14px"
              weight="400"
            />
          </Flex>
        )}
      </Box>
    </DashboardLayout>
  );
}

const StatCard = ({ title, value, icon, isLoading }: any) => {
  return (
    <Flex
      align="center"
      bg="#fff"
      borderRadius="8px"
      border="1px solid #ECECEC"
      p="16px 24px 16px 16px"
      gap="20px"
      w="100%"
    >
      <Image src={icon} alt={title} />
      <Flex flexDir="column" gap="4px">
        <CustomText text={title} size="16px" color="#666" />
        {isLoading ? (
          <SkeletonText noOfLines={1} w="60px" h="14px" mt="10px" />
        ) : (
          <CustomText
            text={`$${value}`}
            size="20px"
            color="#212121"
            weight="500"
          />
        )}
      </Flex>
    </Flex>
  );
};

const PaginationButton = ({ text, onClick, isDisabled, active }: any) => {
  return (
    <Button
      bg={isDisabled ? "#ECECEC" : active ? "#212121" : "#F6F6F6"}
      color={isDisabled ? "#666" : active ? "#fff" : "#666"}
      borderRadius="5px"
      p="0"
      height="34px"
      width="34px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="16px"
      fontWeight="400"
      onClick={onClick}
      isDisabled={isDisabled}
      _hover={{
        bg: isDisabled ? "#ECECEC" : active ? "#212121" : "#F6F6F6",
      }}
    >
      {text}
    </Button>
  );
};

export default TransactionHistory;
