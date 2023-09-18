import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import styled from "styled-components";
import { useSelector } from "react-redux";

const StyleButton = styled(Button)`
  background-color: white !important;
`;

SwiperCore.use([Navigation, Autoplay]);

function AutoPlaySwipePreview() {
  let swiperInstance;
  const imageData = useSelector((state) => state.details.data);
  const images = [
    {
      label: "Front Image",
      imgPath: URL.createObjectURL(imageData.images.frontImage),
    },
    {
      label: "Right Image",
      imgPath: URL.createObjectURL(imageData.images.rightImage),
    },
    {
      label: "Left Image",
      imgPath: URL.createObjectURL(imageData.images.leftImage),
    },
    {
      label: "Back Image",
      imgPath: URL.createObjectURL(imageData.images.backImage),
    },
  ];

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      onSwiper={(swiper) => (swiperInstance = swiper)}
      autoplay={{ delay: 2000 }}
    >
      {images.map((step, index) => (
        <div key={index}>
          <SwiperSlide>
            <Box
              component="img"
              sx={{
                height: "fit-content",
                display: "block",
                maxWidth: "92%",
                overflow: "hidden",
                width: "100%",
              }}
              src={step.imgPath}
              alt={step.label}
            />
          </SwiperSlide>
        </div>
      ))}
      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <StyleButton
          onClick={() => swiperInstance.slidePrev()}
          variant="outlined"
        >
          <ArrowBack fontSize="small" />
        </StyleButton>
        <Box sx={{ flex: "0.9 1 auto" }} />
        <StyleButton
          onClick={() => swiperInstance.slideNext()}
          variant="outlined"
        >
          <ArrowForward fontSize="small" />
        </StyleButton>
      </Box>
    </Swiper>
  );
}

export default AutoPlaySwipePreview;
