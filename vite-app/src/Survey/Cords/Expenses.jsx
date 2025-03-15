import React, { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EastIcon from '@mui/icons-material/East';
import * as XLSX from "xlsx";
import TextField from '@mui/material/TextField';
import FormControl from "@mui/material/FormControl";

function Expenses({ currQuestion, setCurrQuestion, expenses, setExpenses, assets, setAssets, typeBiz, revenue,
  hasEmployees, numEmployees, empProduction, empAdmin, hasAssets
 }) {
  const [infoValid, setInfoValid] = useState(false)
  const [startMonth, setStartMonth] = useState('')
  const [showGetExcel, setShowGetExcel] = useState(false)

  // Helper function to filter assets by type
  const filterAssetsByType = (type) => {
    return assets.flatMap(asset => 
      asset.data.filter(item => item.type === type)
    );
  };

  const handleSetPage5 = () => {
    setCurrQuestion(currQuestion === 5 ? null : 5);
  };

  const handleStartMonth = (event) => {
    const value = event.target.value; // Get selected value in "YYYY-MM" format
    setStartMonth(value); // Update state

    const selectedDate = new Date(value + "-01"); // Convert to full date (1st of the month)
    const currentDate = new Date();

    // Calculate min (1 month ago) and max (10 years ago) valid dates
    const minDate = new Date();
    minDate.setMonth(currentDate.getMonth() - 1);

    const maxDate = new Date();
    maxDate.setFullYear(currentDate.getFullYear() - 10);

    // Validate if the selected date is within the allowed range
    if (selectedDate >= maxDate && selectedDate <= minDate) {
        setShowGetExcel(true);
    } else {
        setShowGetExcel(false);
    }
  };

  useEffect(() => {
    if (typeBiz !== "Incomplete" && hasEmployees !== null && hasAssets !== null) {
      console.log("making button visible")
      setInfoValid(true)
    }
  }, [typeBiz, revenue, hasEmployees, numEmployees, empProduction, empAdmin, assets])

  const getExcel = () => {
    console.log("generating excel")
    const data = [
      ["Category", "Item", "Estimated Amount", "Actual Amount"], // Header
      ...assets.flatMap(asset =>
        asset.data.map(item => [
          asset.name, 
          item.item || item.type, 
          item.count || "-", 
          "" // Empty for them to fill
        ])
      )
    ];
  
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Business Data");
  
    XLSX.writeFile(workbook, "Business_Financials.xlsx");
  }

  // Get rented/leased assets
  const rentedOrLeased = filterAssetsByType("Rented").concat(filterAssetsByType("Leased"));

  // Get owned assets
  const ownedAssets = filterAssetsByType("Owned");

  // Get inventory data
  const inventoryData = assets.find(asset => asset.name === "inventory")?.data || [];

  return (
    <div onClick={() => setCurrQuestion(5)}>
      <Accordion expanded={currQuestion === 5}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />} 
          aria-controls="panel1-content" 
          id="panel1-header"
          onClick={() => handleSetPage5()}
        >
          <Typography component="span">5. Expenses</Typography>
          <Typography sx={{ color: 'gray', marginLeft: 'auto', paddingRight: '0.5rem' }}><i>{showGetExcel ? "Ready for Excel" : "Info not Ready"}</i></Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: "left", paddingLeft: "10%" }}>
          <Typography variant="subtitle1" sx={{ color: 'gray' }}>
            Make sure the following information is correct:
          </Typography>

          <Typography variant='h6'>Business Type: <span style={{ fontWeight: '400' }}>{typeBiz}</span></Typography>

          <Typography variant='h6'>Revenue Streams: </Typography>
          <div style={{ paddingLeft: '1rem' }}>
            <ul>
              {revenue.length > 0 ? (
                revenue.map((rev, index) => (
                  <li key={index}>{rev}</li>
                ))
              ) : (
                <li>No revenue streams</li>
              )}
            </ul>
          </div>


          {!hasEmployees ? (
            <Typography variant='h6'>No Employees</Typography>
          ) : (
            <div>
                <Typography variant='h6'>{numEmployees} Employees</Typography>
                <Typography variant='body1' sx={{ paddingLeft: '1rem' }}>Administrative Employees: {empAdmin}</Typography>
                <Typography variant='body1' sx={{ paddingLeft: '1rem' }}>Production Employees: {empProduction}</Typography>
            </div>
          )}

          {/* Fixed Costs */}
          <Typography variant='h6'>Fixed Costs</Typography>
          <div style={{ paddingLeft: '1rem' }}>
            <ul>
              {rentedOrLeased.length > 0 ? (
                rentedOrLeased.map((item, index) => (
                  <li key={index}>{item.item} ({item.type})</li>
                ))
              ) : (
                <li>No rented or leased assets</li>
              )}
            </ul>
          </div>

          {/* Depreciation Costs */}
          <Typography variant='h6'>Depreciation Costs</Typography>
          <div style={{ paddingLeft: '1rem' }}>
            <ul>
              {ownedAssets.length > 0 ? (
                ownedAssets.map((item, index) => (
                  <li key={index}>{item.item} ({item.type})</li>
                ))
              ) : (
                <li>No owned assets</li>
              )}
            </ul>
          </div>

          {/* Variable Costs */}
          <Typography variant='h6'>Variable Costs</Typography>
          <div style={{ paddingLeft: '1rem' }}>
            <ul>
              {inventoryData.length > 0 ? (
                inventoryData.map((item, index) => (
                  <li key={index}>{item.type} (Frequency: {item.frequency}, Track: {item.track})</li>
                ))
              ) : (
                <li>No inventory data</li>
              )}
            </ul>
          </div>

          {infoValid ? (
            <FormControl sx={{ padding: '2rem 0' }}>
              <Typography variant='body1'>Last Question:</Typography>
              <Typography component="span" sx={{ marginBottom: '0.5rem' }}>
                What was the start month of your business? (month/year)
              </Typography>
              <TextField
                label="Month/Year"
                type="month"
                value={startMonth}
                onChange={handleStartMonth}
              />
            </FormControl>
          ) : (
            <div style={{ padding: '1.5rem', marginTop: '1rem', borderTop: 'solid black 1px', borderBottom: 'solid black 1px' }}>
              <Typography variant='body1'>
                <b>Please fill out all the necessary information in order to get your excel template</b>
              </Typography>
            </div>
          )}

          {showGetExcel && (
            <div style={{ borderTop: 'solid gray 1px', marginTop: '4rem' }}>
              <button className='learn-more continue-btn' onClick={() => getExcel()}>
                Get Excel
                <EastIcon className='landing-learn-btn' sx={{ height: '100%', fontSize: '130%', fontWeight: '600' }} />
              </button>
            </div>
          )}
          
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Expenses;
