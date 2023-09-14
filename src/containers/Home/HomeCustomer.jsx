import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Rating,
  Select,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowForward,
  ArrowForwardIosOutlined,
  Label,
  List,
  Search,
} from "@mui/icons-material";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "rsuite";
import { useTheme } from "@mui/material/styles";
import subVn from "sub-vn";
import { Link } from "react-router-dom";
import axiosInstance from "../../shared/configs/axiosConfig";
import { useSnackbar } from "../../components/Hooks/useSnackBar";

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
  const [rateValue, setRateValue] = useState(4.5);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const provinces = subVn.getProvinces();
  const provinceArray = provinces.map((province) => province.name);
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };

  const fromTime = new Date();
  fromTime.setHours(0, 0, 0, 0);
  const toTime = new Date();
  toTime.setHours(23, 59, 59, 999);
  const [startTime, setStartTime] = useState(fromTime);
  const [endTime, setEndTime] = useState(toTime);
  const [cars, setCars] = useState([]);
  const token = localStorage.getItem("jwtToken");
  const handleClickSearch = async () => {
    const response = await axiosInstance.get("/customer/searchCar", {
      params: {
        selectedProvince,
        startTime,
        endTime,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    if (response.data.isSuccess === true) {
      setCars(response.data.cars);
      console.log("Cars: ", response.data.cars);
      createSnack(response.data.message, { severity: "success" });
    }
    else {
      createSnack(response.data.message, { severity: "error" });
    }
  };

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
                <DateRangePicker
                  format={"yyyy-MM-dd HH:mm:ss"}
                  value={[new Date(startTime), new Date(endTime)]}
                  onChange={(values) => {
                    setStartTime(values[0].toJSON());
                    setEndTime(values[1].toJSON());
                  }}
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
              {(loading ? Array.from(new Array(4)) : cars).map(
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
                          src={item.src}
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
                            {item.name}
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
                            Location: {item.location}
                          </Typography>
                          <Stack direction="row" spacing={3}>
                            <Link to="/viewcardetails">
                              <Button
                                fullWidth
                                sx={{
                                  color: "white",
                                  borderColor: "#fca311",
                                  "&:hover": {
                                    borderColor: "#fca311",
                                  },
                                }}
                                variant="outlined"
                              >
                                View details
                              </Button>
                            </Link>
                            <Link to="/rentnow">
                              <Button
                                fullWidth
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
                                // onClick={handleClickOpenConfirmPayment}
                                endIcon={<ArrowForward />}
                              >
                                Rent now
                              </Button>
                            </Link>
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
            <Pagination
              sx={{ display: "flex", justifyContent: "end", mt: 10 }}
              count={10}
              variant="outlined"
              showFirstButton
              showLastButton
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default HomeCustomer;
