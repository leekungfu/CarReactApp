import { CloudUpload } from "@mui/icons-material";
import { Button, Input, InputLabel, Paper } from "@mui/material";
import React, { useState } from "react";

const FrontOfCar = (props) => {
  const { onFrontImageChange } = props;
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    onFrontImageChange(file);
  };

  return (
    <div>
      <Input
        id="frontOfCar"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        sx={{ display: "none" }}
      />
      <InputLabel htmlFor="frontOfCar">
        <Button variant="contained" component="span" sx={{ border: "solid 1px", color: "white", display: "flex", justifyContent: "flex-start" }}>
          <CloudUpload sx={{ mr: 1 }} />
          Upload image
        </Button>
      </InputLabel>
      {selectedImage && (
        <Paper sx={{ mt: 2, p: 1 }}>
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Uploaded"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Paper>
      )}
    </div>
  );
};

export default FrontOfCar;
