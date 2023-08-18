import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import styled from "styled-components";

const StyleButton = styled(Button)`
  background-color: white !important;
`;

const images = [
  {
    label: "Front Image",
    imgPath:
      "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Right Image",
    imgPath:
      "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
  },
  {
    label: "Left Image",
    imgPath:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
  },
  {
    label: "Back Image",
    imgPath:
      "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
  },
];

SwiperCore.use([Navigation, Autoplay]);

function AutoPlaySwipePreview() {
  let swiperInstance;

  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      onSwiper={(swiper) => (swiperInstance = swiper)}
      autoplay={{ delay: 2000 }}
    >
      {images.map((step, index) => (
        <div key={step.label}>
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
