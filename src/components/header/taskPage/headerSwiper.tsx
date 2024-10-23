"use client";
import React, { useState } from "react";
import TaskHeader from "./taskHeader";
import { Box, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const HeaderSwiper = () => {
  const [swiper, setSwiper] = useState<any>(null);
  return (
    <>
      <Box mt={"16px"} border={"1px solid red"}>
        {/* <Swiper
          direction="horizontal"
          pagination={{
            clickable: true,
            renderBullet: (index: number, className: string) => {
              return `<span class="${className}" style="background-color: ${
                index === (swiper && swiper.activeIndex) ? "#F3F4F6" : "#F3F4F6"
              }"></span>`;
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          onSwiper={setSwiper}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <Text> some text</Text>
          </SwiperSlide>
          <SwiperSlide>
            <Text> some text</Text>
          </SwiperSlide>
        </Swiper> */}

        {/* <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          ...
        </Swiper> */}
      </Box>
    </>
  );
};

export default HeaderSwiper;
