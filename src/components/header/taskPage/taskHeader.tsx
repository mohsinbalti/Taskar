"use client";
import { Box, Flex, Image, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect } from "react";
import CustomText from "../../fonts/text";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
// import styled from 'styled-components';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// const SwiperWrapper = styled.div`
//   .swiper-pagination {
//     bottom: 20px !important; /* Adjust the value as needed */
//   }
// `;

const TaskHeader = () => {
  const [isLessThan678] = useMediaQuery(`(max-width: 678px)`); //left margin on Total Participants 45px

  useEffect(() => {
    const paginationEl = document.querySelector(
      ".swiper-pagination-bullets"
    ) as HTMLElement;
    if (paginationEl) {
      paginationEl.style.bottom = "4px"; // Adjust the value as needed
    }
  }, []);

  return (
    <Box
      maxWidth={"981px"}
      // height={{ base: "157px", md: "240px" }}
      width={"100%"}
      borderRadius={"20px"}
      overflow={"hidden"}
      pos="relative"
    >
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
      >
        <SwiperSlide>
          <Image
            src="/icons/banner-1.svg"
            alt="welcome"
            display={{ base: "none", md: "block" }}
          />
          <Image
            src="/icons/banner-1-sm.svg"
            alt="welcome"
            mx="auto"
            display={{ base: "block", md: "none" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/icons/banner-2.svg"
            alt="dive"
            display={{ base: "none", md: "block" }}
          />
          <Image
            src="/icons/banner-2-sm.svg"
            alt="dive"
            mx="auto"
            display={{ base: "block", md: "none" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/icons/banner-3.svg"
            alt="invite"
            display={{ base: "none", md: "block" }}
          />
          <Image
            src="/icons/banner-3-sm.svg"
            alt="invite"
            mx="auto"
            display={{ base: "block", md: "none" }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/icons/banner-4.svg"
            alt="academy"
            display={{ base: "none", md: "block" }}
          />
          <Image
            src="/icons/banner-4-sm.svg"
            alt="academy"
            mx="auto"
            display={{ base: "block", md: "none" }}
          />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default TaskHeader;
