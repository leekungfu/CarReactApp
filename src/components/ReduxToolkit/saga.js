// import { put, takeLatest, all, call } from "redux-saga/effects";
// import { carAdded } from "./CarAdapter";
// import axiosInstance from "../../shared/configs/axiosConfig";

// function* addCarAndSendToServer(action) {
//   try {
//     const response = yield call(uploadCarToServer, action.payload);
//     console.log("Server Response:", response);
//   } catch (error) {
//     console.error("Error sending data to server:", error);
//   }
// }

// function* watchAddCar() {
//   yield takeLatest(carAdded.type, addCarAndSendToServer);
// }

// export default function* rootSaga() {
//   yield all([watchAddCar()]);
// }

// function uploadCarToServer(carData) {
//   const formData = new FormData();

//   // Thêm các tệp ảnh vào FormData
//   carData.images.forEach((image, index) => {
//     formData.append(`images[${index}]`, image);
//   });

//   // Thêm các trường dữ liệu khác vào FormData
//   // formData.append("plateNumber", carData.plateNumber);
//   // formData.append("color", carData.color);
//   // ... thêm các trường khác

//   return axiosInstance.post("/addCar", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
// }
