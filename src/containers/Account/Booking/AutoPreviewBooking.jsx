import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { carSelected } from "../../../components/ReduxToolkit/CarAdapter";

const StyleButton = styled(Button)`
  background-color: white !important;
`;

SwiperCore.use([Navigation, Autoplay]);

function AutoPreviewBooking(props) {
  const { carId } = props;
  const cars = useSelector((state) => carSelected(state, carId)).payload.cars;
  const car = cars.entities[carId];
  console.log("Car booking: ", car);
  let swiperInstance;

  const images = [
    {
      label: "Front Image",
      imgPath: `data:image/jpeg;base64, ${
        car.files.find((item) => item.name === "frontImage").data
      }`,
    },
    {
      label: "Right Image",
      imgPath: `data:image/jpeg;base64, ${
        car.files.find((item) => item.name === "rightImage").data
      }`,
    },
    {
      label: "Left Image",
      imgPath: `data:image/jpeg;base64, ${
        car.files.find((item) => item.name === "leftImage").data
      }`,
    },
    {
      label: "Back Image",
      imgPath: `data:image/jpeg;base64, ${
        car.files.find((item) => item.name === "backImage").data
      }`,
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

export default AutoPreviewBooking;
