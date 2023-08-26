import {
  Box,
  Grid,
  Input,
  OutlinedInput,
  Paper,
  Stack,
  Typography,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Link,
  InputLabel,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import ColorSelection from "../../Select/ColorSelection";
import BrandsSelection from "../../Select/BrandsSelection";
import ModelsSelection from "../../Select/ModelsSelection";
import ProductionYearSelection from "../../Select/ProductionYearSelection";
import NumberOfSeatsSelection from "../../Select/NumberOfSeats";
import RegistrationPaper from "../../UploadFile/RegistrationPaper";
import Certificate from "../../UploadFile/Certificate";
import Insurance from "../../UploadFile/Insurance";

const Basic = () => {
  const [data, setData] = useState({
    plateNumber: "",
    color: "",
    brand: "",
    type: "",
    productionYear: "",
    numberOfSeat: "",
    transmission: "",
    fuel: "",
    documents: "",
  });

  const handleDataChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Fragment>
      <Paper elevation={0}>
        <Grid container rowSpacing={2} columnSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="red">
              Note: Please check your information carefully, you'll not able to
              change the basic details of you car, which is based on the
              registration information.
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" spacing={2}>
              <OutlinedInput
                name="plateNumber"
                value={data.plateNumber}
                onChange={handleDataChange}
                size="small"
                placeholder="Plate Number"
                required
              />
              <ModelsSelection
                name="type"
                onTypeChange={(selectedType) =>
                  setData((prevData) => ({ ...prevData, type: selectedType }))
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" spacing={2}>
              <ColorSelection
                onColorChange={(selectedType) =>
                  setData((prevData) => ({ ...prevData, color: selectedType }))
                }
              />
              <ProductionYearSelection
                onProductionYearChange={(selectedType) =>
                  setData((prevData) => ({
                    ...prevData,
                    productionYear: selectedType,
                  }))
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column" spacing={2}>
              <BrandsSelection
                onBrandChange={(selectedType) =>
                  setData((prevData) => ({ ...prevData, brand: selectedType }))
                }
              />
              <NumberOfSeatsSelection
                onNumberOfSeatChange={(selectedType) =>
                  setData((prevData) => ({
                    ...prevData,
                    numberOfSeat: selectedType,
                  }))
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <RadioGroup
              name="transmission"
              value={data.transmission}
              onChange={handleDataChange}
            >
              <InputLabel required>Transmission</InputLabel>
              <FormControlLabel
                control={<Radio value="automatic" color="primary" />}
                label="Automatic"
              />
              <FormControlLabel
                control={<Radio value="manual" color="primary" />}
                label="Manual"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={4}>
            <RadioGroup
              name="fuel"
              value={data.fuel}
              onChange={handleDataChange}
            >
              <InputLabel required>Fuel</InputLabel>
              <FormControlLabel
                control={<Radio value="gasoline" color="primary" />}
                label="Gasoline"
              />
              <FormControlLabel
                control={<Radio value="diesel" color="primary" />}
                label="Diesel"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={12}>
            <InputLabel required>Documents</InputLabel>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column">
              <Typography variant="subtitle2" fontWeight={600}>
                Registration paper
              </Typography>
              <RegistrationPaper
                onRegistrationPaperChange={(selectedType) =>
                  setData((prevData) => ({
                    ...prevData,
                    registrationPaper: selectedType,
                  }))
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column">
              <Typography variant="subtitle2" fontWeight={600}>
                Certificate of inspection
              </Typography>
              <Certificate
                onCertificateChange={(selectedType) =>
                  setData((prevData) => ({
                    ...prevData,
                    certificate: selectedType,
                  }))
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={4}>
            <Stack direction="column">
              <Typography variant="subtitle2" fontWeight={600}>
                Insurance
              </Typography>
              <Insurance
                onInsuranceChange={(selectedType) =>
                  setData((prevData) => ({
                    ...prevData,
                    insurance: selectedType,
                  }))
                }
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Fragment>
  );
};

export default Basic;
