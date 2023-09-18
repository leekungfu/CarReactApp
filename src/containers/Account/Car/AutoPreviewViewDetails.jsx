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
import axiosInstance from "../../../shared/configs/axiosConfig";
import { useSnackbar } from "../../../components/Hooks/useSnackBar";

const StyleButton = styled(Button)`
  background-color: white !important;
`;

SwiperCore.use([Navigation, Autoplay]);

function AutoPreviewViewDetails(props) {
  let swiperInstance;
  const { carId } = props;
  const { createSnack } = useSnackbar();
  const [car, setCar] = useState({});
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (carId) {
          const response = await axiosInstance.get(
            `/customer/getCar/${carId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.isSuccess === true) {
            setCar(response.data.car);
            console.log("Car dbsdsdsds:", response.data.car);
            createSnack(response.data.message, { severity: "success" });
          } else {
            createSnack(response.data.message, { severity: "error" });
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        createSnack("Error fetching data", { severity: "error" });
      }
    };

    fetchData();
  }, [carId, token, createSnack]);

  const imageNames = ["frontImage", "rightImage", "leftImage", "backImage"];

  const images = imageNames.map((imageName) => {
    const carFile = car.files
      ? car.files.find((item) => item.name === imageName)
      : null;
    return {
      label: imageName,
      imgPath: carFile ? `data:image/jpeg;base64, ${carFile.data}` : "",
    };
  });

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

export default AutoPreviewViewDetails;
