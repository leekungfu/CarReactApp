import { CloudUpload } from "@mui/icons-material";
import { Button, Input, InputLabel, Paper } from "@mui/material";
import React, { useState } from "react";

const DrivingLicense = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div>
      <Input
        id="drivingLicense"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        sx={{ display: "none" }}
      />
      <InputLabel htmlFor="drivingLicense">
        <Button variant="outlined" component="span" >
          <CloudUpload sx={{ mr: 1 }} />
          Upload image
        </Button>
      </InputLabel>
      {selectedImage && (
        <Paper sx={{ mt: 2 }} elevation={0}>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded"
            style={{ maxWidth: "50%", height: "auto", border: "2px solid #fca311", borderRadius: "20px" }}
          />
        </Paper>
      )}
    </div>
  );
};

export default DrivingLicense;
