import axiosInstance from "../../shared/configs/axiosConfig";
import { carAdded } from "./CarAdapter";

export const addCarAndSendToServer = (carData) => async (dispatch) => {
  dispatch(carAdded(carData));
  try {
    const formData = new FormData();
    for (const key in carData) {
      if (key === "documents" || key === "images") {
        for (const fileType in carData[key]) {
          formData.append(`${key}.${fileType}`, carData[key][fileType]);
        }
      } else if (Array.isArray(carData[key])) {
        carData[key].forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, carData[key]);
      }
    }

    const uploadedDocument = formData.get("documents.certificate");
    if (uploadedDocument) {
      console.log("Document attached:", uploadedDocument);
    } else {
      console.log("Document not attached.");
    }

    const token = localStorage.getItem("jwtToken");
    const response = await axiosInstance.post("/owner/addCar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error sending data to server:", error);
  }
};
