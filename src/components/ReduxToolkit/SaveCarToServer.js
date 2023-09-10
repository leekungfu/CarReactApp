import { useSelector } from "react-redux";
import axiosInstance from "../../shared/configs/axiosConfig";
import { carAdded } from "./CarAdapter";

export const addCarAndSendToServer =
  (carData, basicData, detailsData) => async (dispatch) => {
    try {
      const formData = new FormData();
      for (const key in carData) {
        if (Array.isArray(carData[key])) {
          carData[key].forEach((item) => {
            formData.append(key, item);
          });
        } else {
          formData.append(key, carData[key]);
        }
      }
      const registrationPaper = basicData.documents.registrationPaper;
      const certificate = basicData.documents.certificate;
      const insurance = basicData.documents.insurance;
      const frontImage = detailsData.images.frontImage;
      const backImage = detailsData.images.backImage;
      const leftImage = detailsData.images.leftImage;
      const rightImage = detailsData.images.rightImage;

      formData.append("documents", registrationPaper, "registrationPaper");
      formData.append("documents", certificate, "certificate");
      formData.append("documents", insurance, "insurance");
      formData.append("images", frontImage, "frontImage");
      formData.append("images", backImage, "backImage");
      formData.append("images", leftImage, "leftImage");
      formData.append("images", rightImage, "rightImage");

      const token = localStorage.getItem("jwtToken");
      const response = await axiosInstance.post("/owner/addCar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.isSuccess === true) {
        const carDBData = response.data.car;
        const files = response.data.files;
        const carEntityAdapter = {
          id: carDBData.id,
          plateNumber: carDBData.plateNumber,
          color: carDBData.color,
          brand: carDBData.brand,
          model: carDBData.model,
          productionYear: carDBData.productionYear,
          numberOfSeat: carDBData.numberOfSeat,
          transmissionType: carDBData.transmissionType,
          fuelType: carDBData.fuelType,
          mileage: carDBData.mileage,
          fuelConsumption: carDBData.fuelConsumption,
          province: carDBData.province,
          district: carDBData.district,
          ward: carDBData.ward,
          street: carDBData.street,
          description: carDBData.description,
          additionalFunctions: carDBData.additionalFunctions,
          basePrice: carDBData.price,
          deposit: carDBData.deposit,
          terms: carDBData.terms,
          status: carDBData.status,
          files: files,
        };
        dispatch(carAdded(carEntityAdapter));
        console.log("Add car to database success!");
      }
      else {
        console.log("Add car to database failed!");
      }
    } catch (error) {
      console.error("Error sending car data to server:", error);
    }
  };
