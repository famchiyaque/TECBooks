import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import Loader from "../HomePage/Comps/Loader";

function ExcelDropzone() {
  const [isValidating, setIsValidating] = useState(false);
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    setIsValidating(true);
    const file = acceptedFiles[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        console.log("Parsed Excel Data:", jsonData);

        // Validation
        if (jsonData.length > 10000) {
          alert("File is too large!");
          setIsValidating(false);
          return;
        }

        setTimeout(() => {
          // Navigate to TECBooks and pass the Excel data
          navigate("/tecbooks", { state: { excelData: jsonData } });
        }, 2500)
      };

      reader.readAsArrayBuffer(file);
    }
  }, [navigate]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
      "application/vnd.ms-excel": [],
    },
    multiple: false,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed #073a5a",
        borderRadius: "20px",
        padding: 4,
        width: "30%",
        minWidth: '200px',
        height: "40%",
        minHeight: '200px',
        textAlign: "center",
        cursor: "pointer",
        margin: "0 auto",
        backgroundColor: isDragActive ? "#f0f8ff" : "transparent",
      }}
    >
      <input {...getInputProps()} />
      {isValidating ? <Loader /> : <img src={"/imgs/cloud_landing.png"} style={{ width: "40%", margin: "0 auto" }} />}
      <Typography>
        {isValidating ? "Making sure the excel file matches the given template..." : "Drag or drop your Excel file here.."}
        {/* {isDragActive ? "Drop your Excel file here..." : "Drag & drop an Excel file, or click to select one"} */}
      </Typography>
    </Box>
  );
}

export default ExcelDropzone;
