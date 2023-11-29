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
  if (
    !imageData ||
    !imageData.images ||
    Object.values(imageData.images).some((img) => !img)
  ) {
    return <div>No images available</div>;
  }
  const images = [
    {
      label: "Front Image",
      imgPath: imageData.images.frontImage
        ? URL.createObjectURL(imageData.images.frontImage)
        : null,
    },
    {
      label: "Right Image",
      imgPath: imageData.images.rightImage
        ? URL.createObjectURL(imageData.images.rightImage)
        : null,
    },
    {
      label: "Left Image",
      imgPath: imageData.images.leftImage
        ? URL.createObjectURL(imageData.images.leftImage)
        : null,
    },
    {
      label: "Back Image",
      imgPath: imageData.images.backImage
        ? URL.createObjectURL(imageData.images.backImage)
        : null,
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
            {step.imgPath ? (
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
            ) : (
              <Box
                sx={{
                  height: "fit-content",
                  maxWidth: "92%",
                  backgroundColor: "white",
                }}
              />
            )}
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
