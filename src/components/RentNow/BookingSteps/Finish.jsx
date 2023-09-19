import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const Finish = () => {
  const bookingData = useSelector((state) => state.bookingData.data);
  // const startDate = bookingData.startDate;
  // const endDate = bookingData.endDate;
  // const [year, month, day, hours, minutes, seconds] = endDate;
  // const startDateConverted = new Date(year, month - 1, day, hours, minutes, seconds);
  // console.log(startDate);
  

  return (
    <div>
      <Typography variant="h6" fontWeight="bold">
        You've successfully booked {bookingData.car.brand} {bookingData.car.model} {bookingData.car.productionYear} from 
        {/* {startDate} to {endDate}. */}
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        Your booking number is: {bookingData.bookingID}
      </Typography>
      <Typography variant="h6" fontWeight="bold">
        Our operator will contact you with further guidance about pickup.
      </Typography>
    </div>
  );
};

export default Finish;
