import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import HomeGuest from "./containers/Home/HomeGuest";
import HomeCustomer from "./containers/Home/HomeCustomer";

import "rsuite/dist/rsuite.min.css";
import { createPack } from "react-component-pack";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import DefaultTheme from "./shared/DefaultTheme";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import HomeOwner from "./containers/Home/HomeOwner";
import AddCar from "./components/Dialogs/AddCar";
import ProfileTabs from "./containers/Account/Profile";
import MyCars from "./containers/Account/Car";
import RentNow from "./components/RentNow";
import MyBookings from "./containers/Account/Booking";
import EditCarDetails from "./containers/Account/Car/EditCarDetails";
import ViewCarDetails from "./containers/Account/Car/ViewCarDetails";
import BookingDetails from "./containers/Account/Booking/BookingDetails";
import MyWallet from "./containers/Account/Wallet";
import MyFeedBack from "./containers/Account/FeedBack";
import ResetPass from "./containers/Account/Reset/ResetPass";
import ConfirmReset from "./containers/Account/Reset/ConfirmReset";
import Layout from "./components/Layout";
import { SnackProvider } from "./components/Hooks/useSnackBar";
import ViewBookedCar from "./containers/Account/Car/ViewBookedCar";
import { createContext, useContext, useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const UserContext = createContext();
const useHookEffect = () => {
  const [userData, setUserData] = useState(() => {
    const savedUserData = localStorage.getItem("userData");
    return savedUserData ? JSON.parse(savedUserData) : null;
  });
  const save = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setUserData(userData);
  };
  useEffect(() => {
    const currentUser = localStorage.getItem("userData");
    setUserData(JSON.parse(currentUser));
  }, []);
  return { userData, save };
};

export function UserContextProvider({ children }) {
  const myEffect = useHookEffect();
  return (
    <UserContext.Provider value={myEffect}>{children}</UserContext.Provider>
  );
}
export const useCustomHook = () => useContext(UserContext);

const ProviderPack = createPack(
  (props) => <ThemeProvider theme={DefaultTheme} {...props} />,
  (props) => <StyledThemeProvider theme={DefaultTheme} {...props} />,
  (props) => <SnackProvider {...props} />,
  (props) => <UserContextProvider {...props} />,
  (props) => <LocalizationProvider dateAdapter={AdapterDayjs} {...props} />
);

function App() {
  return (
    <ProviderPack>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route index={true} path="/" element={<HomeGuest />} />
            <Route path="/homecustomer" element={<HomeCustomer />} />
            <Route path="/homeowner" element={<HomeOwner />} />
            <Route path="/addcar" element={<AddCar />} />
            <Route path="/profile" element={<ProfileTabs />} />
            <Route path="/booking" element={<MyBookings />} />
            <Route path="/wallet" element={<MyWallet />} />
            <Route path="/cars" element={<MyCars />} />
            <Route path="/feedback" element={<MyFeedBack />} />
            <Route path="/rentnow/:carId" element={<RentNow />} />
            <Route path="/editcardetails/:carId" element={<EditCarDetails />} />
            <Route path="/viewcardetails/:carId" element={<ViewCarDetails />} />
            <Route path="/viewbookedcar/:carId" element={<ViewBookedCar />} />
            <Route
              path="/bookingdetails/:bookingId"
              element={<BookingDetails />}
            />
            <Route path="/reset" element={<ResetPass />} />
            <Route path="/confirmreset" element={<ConfirmReset />} />
          </Routes>
        </Layout>
      </Router>
    </ProviderPack>
  );
}

export default App;
