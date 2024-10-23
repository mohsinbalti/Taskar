"use client";

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import designCardIcon from "../../../public/icons/designCardIcon.svg";
import marketingCardIcon from "../../../public/icons/marketingCardIcon.svg";
import salesCardIcon from "../../../public/icons/salesCardIcon.svg";
import financeCardIcon from "../../../public/icons/financeCardIcon.svg";
import appDevCardIcon from "../../../public/icons/appDevCardIcon.svg";
import webDevCardIcon from "../../../public/icons/webDevCardIcon.svg";
import managementCardIcon from "../../../public/icons/managementCardIcon.svg";
import UxCardIcon from "../../../public/icons/UxCardIcon.svg";
import React, { useState } from "react";
import CategoryCard from "../general cards/category";
import CustomText from "../fonts/text";
import { clashDisplay, epilogue } from "../fonts/fonts";
import { useGetCategoriesWithTask } from "@/utils/task.api";
import { useGetCategory } from "@/utils/auth.api";
import { useRouter } from "next/navigation";

//importing icons for categories
const appLight = "/logo/categoryLogo/light/app.svg";
const financeLight = "/logo/categoryLogo/light/finance.svg";
const managementLight = "/logo/categoryLogo/light/management.svg";
const marketLight = "/logo/categoryLogo/light/market.svg";
const salesLight = "/logo/categoryLogo/light/sales.svg";
const webLight = "/logo/categoryLogo/light/web.svg";
const writingLight = "/logo/categoryLogo/light/writing.svg";
const designLight = "/logo/categoryLogo/light/design.svg";
const appDark = "/logo/categoryLogo/dark/app.svg";
const financeDark = "/logo/categoryLogo/dark/finance.svg";
const managementDark = "/logo/categoryLogo/dark/management.svg";
const marketDark = "/logo/categoryLogo/dark/market.svg";
const salesDark = "/logo/categoryLogo/dark/sales.svg";
const webDark = "/logo/categoryLogo/dark/web.svg";
const writingDark = "/logo/categoryLogo/dark/writing.svg";
const designDark = "/logo/categoryLogo/dark/design.svg";

const categoryIcons: any = {
  Design: { light: designLight, dark: designDark },
  Marketing: { light: marketLight, dark: marketDark },
  Sales: { light: salesLight, dark: salesDark },
  Finance: { light: financeLight, dark: financeDark },
  "App Development": { light: appLight, dark: appDark },
  "Web Development": { light: webLight, dark: webDark },
  Management: { light: managementLight, dark: managementDark },
  "UX Writing": { light: writingLight, dark: writingDark },
  // Add other categories and their respective icons here
};
const DiverseChallanges = () => {
  const router = useRouter();
  const [viewMore, setViewMore] = useState(false);
  const toggleViewMore = () => setViewMore(!viewMore);
  const { data: categoryData, isPending } = useGetCategory();
  console.log(categoryData);

  return (
    <div id="categories">
      <Stack
        my={{ base: "0px", md: "80px" }}
        p={{ base: "24px 16px", md: "32px 64px" }}
        align={"center"}
        gap={{ base: "20px", md: "44px" }}
        maxWidth={"1540px"}
        mx={"auto"}
      >
        <Stack
          justify={"center"}
          align={{ base: "flex-start", md: "center" }}
          gap={{ base: "12px", md: "8px" }}
          alignSelf={"stretch"}
        >
          <Heading
            color={"#212121"}
            fontSize={{ base: "24px", md: "50px" }}
            fontWeight={{ base: "600", md: "700" }}
            lineHeight={{ base: "normal", md: "64px" }}
            fontFamily={"Clash Display Variable"}
          >
            <span className={clashDisplay?.className}>
              Diverse Challenges Await
            </span>
          </Heading>
          <Text
            color={"#666"}
            fontFamily={"Epilogue"}
            fontSize={{ base: "14px", md: "20px" }}
            fontWeight={"300"}
            lineHeight={{ base: "19px", md: "32px" }}
            maxW={"1098px"}
            textAlign={{ base: "left", md: "center" }}
          >
            <span className={epilogue?.className}>
              Our vast array of tasks encompasses coding, UI/UX design, data
              analysis, and much more. There&apos always a new challenge to keep
              you engaged and ensure your skills remain sharp and relevant.
            </span>
          </Text>
        </Stack>

        <Flex
          gap={{ base: "20px 12px", md: "32px" }}
          wrap={"wrap"}
          width={"100%"}
        >
          {isPending && (
            <Center w={"100%"}>
              <Spinner size={"lg"} />
            </Center>
          )}{" "}
          {/* Show loader when data is pending */}
          {!isPending && categoryData?.length === 0 && (
            <CustomText text="No Category Available" />
          )}{" "}
          {/* Show no data available message */}
          {!isPending &&
            categoryData?.map((category: any) => (
              <CategoryCard
                key={category?.id}
                isClashDisplay
                title={category?.categoryName}
                count={category?.noOfTasks}
                iconLight={category?.categoryPictureDark}
                iconDark={category?.categoryPicture}
                onClick={() =>
                  router.push(`/?category=${category?.categoryName}`)
                }
              />
            ))}
          {/* <CategoryCard
          isClashDisplay
          title={"Design"}
          count={"140"}
          iconLight={designLight}
          iconDark={designDark}
        />
        <CategoryCard
          isClashDisplay
          title={"Marketing"}
          count={"236"}
          iconLight={marketLight}
          iconDark={marketDark}
        />
        <CategoryCard
          isClashDisplay
          title={"Sales"}
          count={"756"}
          iconLight={salesLight}
          iconDark={salesDark}
        />
        <CategoryCard
          isClashDisplay
          title={"Finance"}
          count={"325"}
          iconLight={financeLight}
          iconDark={financeDark}
        />
        <Flex
          gap={{ base: "20px 12px", md: "32px" }}
          wrap={"wrap"}
          width={"100%"}
          display={{ base: viewMore ? "flex" : "none", md: "flex" }}
        >
          <CategoryCard
            isClashDisplay
            title={"App Development"}
            count={"436"}
            iconLight={appLight}
            iconDark={appDark}
          />
          <CategoryCard
            isClashDisplay
            title={"Web Development"}
            count={"542"}
            iconLight={webLight}
            iconDark={webDark}
          />
          <CategoryCard
            isClashDisplay
            title={"Management"}
            count={"211"}
            iconLight={managementLight}
            iconDark={managementDark}
          />
          <CategoryCard
            isClashDisplay
            title={"UX Writing"}
            count={"346"}
            iconLight={writingLight}
            iconDark={writingDark}
          /> */}
          {/* </Flex>{" "} */}
        </Flex>

        {categoryData?.length > 8 && (
          <Flex
            p={{ base: "14px 32px", md: "11px 32px" }}
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
              weight={500}
              height={"25.6px"}
              color={"#212121"}
            />
          </Flex>
        )}
      </Stack>
    </div>
  );
};

export default DiverseChallanges;
