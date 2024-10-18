import { ArrowForward, List, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  MenuItem,
  OutlinedInput,
  Pagination,
  Rating,
  Select,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "rsuite";
import subVn from "sub-vn";
import { useSnackbar } from "../../components/Hooks/useSnackBar";
import { setUserData } from "../../components/ReduxToolkit/UserSlice";
import axiosInstance from "../../shared/configs/axiosConfig";
import {
  RSUITE_DATE_TIME_PICKER_DISPLAY_FORMAT,
  SERVER_POSTING_DATE_TIME_FORMAT,
} from "../../shared/configs/constants";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 180,
    },
  },
};

function getStyles(name, items, theme) {
  return {
    fontWeight:
      items.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const HomeCustomer = (props) => {
  const theme = useTheme();
  const { loading = false } = props;
  const { createSnack } = useSnackbar();
  const navigate = useNavigate();
  const [rateValue, setRateValue] = useState(4.5);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const provinces = subVn.getProvinces();
  const provinceArray = provinces.map((province) => province.name);
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };
  const handleClickViewDetails = (carId) => {
    navigate(`/viewcardetails/${carId}`);
  };
  const handleClickRentNow = (carId) => {
    navigate(`/rentnow/${carId}`);
  };

  const fromTime = new Date();
  fromTime.setHours(0, 0, 0, 0);
  const toTime = new Date();
  toTime.setHours(23, 59, 59, 999);
  const [startTime, setStartTime] = useState(fromTime);
  const [endTime, setEndTime] = useState(toTime);
  const [cars, setCars] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalCars = cars.length;
  const totalPages = Math.ceil(totalCars / itemsPerPage);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const carsOnCurrentPage = cars.slice(startIndex, endIndex);

  const handleClickSearch = async () => {
    const token = localStorage.getItem("jwtToken");
    const response = await axiosInstance.get("/customer/searchCar", {
      params: {
        selectedProvince,
        startTimeFormatted: dayjs(startTime).format(
          SERVER_POSTING_DATE_TIME_FORMAT
        ),
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.data.isSuccess === true) {
      setCars(response.data.cars);
      console.log("Cars: ", response.data.cars);
      createSnack(response.data.message, { severity: "success" });
    } else {
      createSnack(response.data.message, { severity: "error" });
    }
  };
  const dispatch = useDispatch();
  const [apiCalled, setApiCalled] = useState(false);
  useEffect(() => {
    if (!apiCalled) {
      const token = localStorage.getItem("jwtToken");
      axiosInstance
        .get("/currentUser", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log(response.data);
          dispatch(setUserData(response.data));
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })
        .finally(() => {
          setApiCalled(true);
        });
    }
  }, [apiCalled, dispatch]);

  return (
    <Box>
      <Container maxWidth="lg">
        <Card elevation={0}>
          <CardContent>
            <Typography sx={{ pt: 5, pb: 5, fontWeight: 600 }} variant="h5">
              SEARCH FOR RENT NOW
            </Typography>
            <Grid container columnSpacing={4}>
              <Grid item xs={4}>
                <FormControl size="small" fullWidth>
                  <Select
                    size="small"
                    displayEmpty
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                    input={<OutlinedInput size="small" />}
                    renderValue={(selected) => {
                      if (!selected) {
                        return <em>Choose Province</em>;
                      }
                      return selected;
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem disabled value="">
                      <em>--Province--</em>
                    </MenuItem>
                    {provinceArray.map((name) => (
                      <MenuItem
                        key={name}
                        value={name}
                        style={getStyles(name, provinceArray, theme)}
                      >
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <DatePicker
                  format={RSUITE_DATE_TIME_PICKER_DISPLAY_FORMAT}
                  value={new Date(startTime)}
                  onChange={(value) => setStartTime(value)}
                />
              </Grid>
              <Grid item xs={4}>
                <Button
                  sx={{
                    minWidth: "50% ",
                    color: "#fca311",
                    bgcolor: "white",
                    borderColor: "#fca311",
                    "&:hover": {
                      color: "white",
                      bgcolor: "#fca311",
                    },
                  }}
                  variant="outlined"
                  onClick={handleClickSearch}
                  endIcon={<Search />}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card elevation={0} sx={{ mb: 5 }}>
          <CardContent>
            <Stack
              direction="row"
              alignItems="center"
              sx={{ pb: 1 }}
              spacing={1}
            >
              <List fontSize="large" />
              <Typography variant="h6">LIST CAR:</Typography>
            </Stack>
            <Grid container columnSpacing={4} rowSpacing={5}>
              {(loading ? Array.from(new Array(4)) : carsOnCurrentPage).map(
                (item, index) => (
                  <Grid item xs={4} key={index}>
                    {item ? (
                      <Box
                        sx={{
                          border: "0.5px solid #ccc",
                          borderRadius: "10px",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          style={{ width: "100%", height: 210 }}
                          alt={item.title}
                          src={`data:image/jpeg;base64, ${
                            item.files.find(
                              (item) => item.name === "frontImage"
                            ).data
                          }`}
                        />
                      </Box>
                    ) : (
                      <Skeleton
                        variant="rectangular"
                        width={210}
                        height={118}
                      />
                    )}

                    {item ? (
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography gutterBottom variant="subtitle1">
                            {item.brand} {item.model} {item.productionYear}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <Box sx={{ display: "flex" }}>
                              <Typography
                                display="block"
                                variant="body2"
                                color="text.secondary"
                                sx={{ mr: 0.5 }}
                              >
                                Rating:
                              </Typography>
                              <Rating
                                size="small"
                                name="half-rating-read"
                                defaultValue={item.rating}
                                precision={0.5}
                                readOnly
                              />
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              Price: {item.price}
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={6}>
                          <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                              No. of rides: {item.nor}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Status:{" "}
                              <span
                                style={{
                                  color:
                                    item.status === "Booked"
                                      ? "#15616d"
                                      : item.status === "Stopped"
                                      ? "#d00000"
                                      : "#38b000",
                                  fontWeight: "bold",
                                }}
                              >
                                {item.status}
                              </span>
                            </Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography
                            sx={{ pt: 1, pb: 1 }}
                            variant="body2"
                            color="text.secondary"
                          >
                            Location: {item.ward} {item.district}{" "}
                            {item.province}
                          </Typography>
                          <Stack direction="row" spacing={3}>
                            <Button
                              sx={{
                                color: "white",
                                borderColor: "#fca311",
                                "&:hover": {
                                  borderColor: "#fca311",
                                },
                              }}
                              variant="outlined"
                              onClick={() => handleClickViewDetails(item.id)}
                            >
                              View details
                            </Button>
                            <Button
                              sx={{
                                color: "#fca311",
                                borderColor: "#fca311",
                                bgcolor: "white",
                                "&:hover": {
                                  color: "white",
                                  bgcolor: "#fca311",
                                  borderColor: "#fca311",
                                },
                              }}
                              variant="outlined"
                              endIcon={<ArrowForward />}
                              onClick={() => handleClickRentNow(item.id)}
                            >
                              Rent now
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    ) : (
                      <Box sx={{ pt: 0.5 }}>
                        <Skeleton />
                        <Skeleton width="60%" />
                      </Box>
                    )}
                  </Grid>
                )
              )}
            </Grid>
            {cars && cars.length > 0 && (
              <Pagination
                sx={{ display: "flex", justifyContent: "end", mt: 10 }}
                count={totalPages}
                page={currentPage}
                variant="outlined"
                showFirstButton
                showLastButton
                onChange={handlePageChange}
              />
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default HomeCustomer;
