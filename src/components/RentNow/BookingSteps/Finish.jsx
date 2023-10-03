import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../shared/configs/axiosConfig";
import moment from "moment";
import { DATE_TIME_PICKER_DISPLAY_FORMAT } from "../../../shared/configs/constants";

const Finish = (props) => {
  const { carId } = props;
  const bookingData = useSelector((state) => state.bookingResult.data);
  const [car, setCar] = useState({});
  console.log("Booking data: ", bookingData);

  const token = localStorage.getItem("jwtToken");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (carId) {
          const { data: response } = await axiosInstance.get(
            `/customer/getCar/${carId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.isSuccess === true) {
            setCar(response.car);
            console.log("Car fetched: ", car);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [carId, token]);

  return (
    <div>
      <Typography variant="h6">
        You've successfully booked {car.brand} {car.model} {car.productionYear}{" "}
        from{" "}
        {moment(bookingData.startDate).format(
          DATE_TIME_PICKER_DISPLAY_FORMAT
        )}{" "}
        to {moment(bookingData.endDate).format(DATE_TIME_PICKER_DISPLAY_FORMAT)}
        .
      </Typography>
      <Typography variant="h6">
        Your booking number is: {bookingData.bookingId}
      </Typography>
      <Typography variant="h6">
        Our operator will contact you with further guidance about pickup.
      </Typography>
    </div>
  );
};

export default Finish;
