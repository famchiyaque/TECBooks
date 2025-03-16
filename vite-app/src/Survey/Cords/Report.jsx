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
import { getExcelData } from '../Excel/getExcel';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom'

function Expenses({ currQuestion, setCurrQuestion, expenses, assets, typeBiz, revenue,
  hasEmployees, numEmployees, empProduction, empAdmin, hasAssets, nameBiz
 }) {
  const navigate = useNavigate()
  const [infoValid, setInfoValid] = useState(false)
  const [startMonth, setStartMonth] = useState('')
  const [showGetExcel, setShowGetExcel] = useState(false)
  const [showFinalModal, setShowFinalModel] = useState(false)

  // Helper function to filter assets by type
  const filterAssetsByType = (type) => {
    return assets.flatMap(asset => 
      asset.data.filter(item => item.type === type)
    );
  };

  const handleSetPage6 = () => {
    setCurrQuestion(currQuestion === 6 ? null : 6);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
    
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    minWidth:'300px',
    maxHeight: '600px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
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
        console.log(revenue)
        console.log(assets)
        console.log(expenses)
    } else {
        setShowGetExcel(false);
    }
  };

  useEffect(() => {
    if (typeBiz !== "Incomplete" && hasEmployees !== null && hasAssets !== null) {
      setInfoValid(true)
    }
  }, [nameBiz, typeBiz, revenue, hasEmployees, numEmployees, empProduction, empAdmin, assets, expenses])

  const getExcel = () => {
    const data = getExcelData(revenue, numEmployees, empProduction, empAdmin, assets, expenses, startMonth);
  
    const workbook = XLSX.utils.book_new();

    // Define sheet names
    const sheetNames = ["Revenue", "Costs", "Expenses"];

    data.forEach((sheetData, index) => {
        const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetNames[index]);
    });

    XLSX.writeFile(workbook, "Business_Financials.xlsx");
    handleOpen()
  }

  // Get rented/leased assets
  const rentedOrLeased = filterAssetsByType("Rented").concat(filterAssetsByType("Leased"));

  // Get owned assets
  const ownedAssets = filterAssetsByType("Owned");

  // Get inventory data
  const inventoryData = assets.find(asset => asset.name === "inventory")?.data || [];

  return (
    <div onClick={() => setCurrQuestion(6)}>
      <Accordion expanded={currQuestion === 6}>
        <AccordionSummary 
          expandIcon={<ExpandMoreIcon />} 
          aria-controls="panel1-content" 
          id="panel1-header"
          onClick={() => handleSetPage6()}
        >
          <Typography component="span">6. Final Report</Typography>
          <Typography sx={{ color: 'gray', marginLeft: 'auto', paddingRight: '0.5rem' }}><i>{showGetExcel ? "Ready for Excel" : "Info not Ready"}</i></Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: "left", paddingLeft: "10%" }}>
          <Typography variant="subtitle1" sx={{ color: 'gray' }}>
            Make sure the following information is correct:
          </Typography>

          <Typography variant='h6'>Name: <span style={{ fontWeight: '400' }}>{nameBiz}</span></Typography>

          <Typography variant='h6'>Business Type: <span style={{ fontWeight: '400' }}>{typeBiz}</span></Typography>

          <Typography variant='h6' sx={{ paddingTop: '0.5rem' }}>Revenue Streams: </Typography>
          <div style={{ paddingLeft: '1rem' }}>
            <ul>
              {revenue.length > 0 ? (
                revenue.map((rev, index) => (
                  <li key={index}>{rev.type}: {rev.name} {rev.track}</li>
                ))

              ) : (
                <li>No revenue streams</li>
              )}
            </ul>
          </div>


          {!hasEmployees ? (
            <Typography variant='h6' sx={{ paddingTop: '0.5rem' }}>No Employees</Typography>
          ) : (
            <div>
                <Typography variant='h6' sx={{ paddingTop: '0.5rem' }}>{numEmployees} Employees</Typography>
                <Typography variant='body1' sx={{ paddingLeft: '1rem' }}>Administrative Employees: {empAdmin}</Typography>
                <Typography variant='body1' sx={{ paddingLeft: '1rem' }}>Production Employees: {empProduction}</Typography>
            </div>
          )}

          {/* Fixed Costs */}
          <Typography variant='h6' sx={{ paddingTop: '0.5rem' }}>Fixed Costs</Typography>
          <div style={{ paddingLeft: '1rem' }}>
            <ul>
              {rentedOrLeased.length > 0 ? (
                rentedOrLeased.map((item, index) => (
                  <li key={index}>{item.name} ({item.count} {item.type} {item.item})</li>
                ))
              ) : (
                <li>No rented or leased assets</li>
              )}
            </ul>
          </div>

          {/* Depreciation Costs */}
          <Typography variant='h6' sx={{ paddingTop: '0.5rem' }}>Depreciation Costs</Typography>
          <div style={{ paddingLeft: '1rem' }}>
            <ul>
              {ownedAssets.length > 0 ? (
                ownedAssets.map((item, index) => (
                  <li key={index}>{item.name} ({item.count} {item.type} {item.item})</li>
                ))
              ) : (
                <li>No owned assets</li>
              )}
            </ul>
          </div>

          {/* Variable Costs */}
          <Typography variant='h6' sx={{ paddingTop: '0.5rem' }}>Variable Costs</Typography>
          <div style={{ paddingLeft: '1rem' }}>
            <ul>
              {inventoryData.length > 0 ? (
                inventoryData.map((item, index) => (
                  <li key={index}>{item.type} ({item.name})</li>
                ))
              ) : (
                <li>No inventory data</li>
              )}
            </ul>
          </div>

          {/* Expenses */}
          <Typography variant='h6' sx={{ padding: '0.5rem 0' }}>Expenses</Typography>
          <div style={{ paddingLeft: '1rem' }}>
            <ul>
              {expenses.length > 0 ? (
                expenses.map((item, index) => (
                  <li key={index}>{item.name} (Frequency: {item.frequency})</li>
                ))
              ) : (
                <li>No other expenses</li>
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
            <div style={{ borderTop: 'solid gray 1px' }}>
              <button className='learn-more continue-btn' onClick={() => getExcel()}>
                Get Excel
                <EastIcon className='landing-learn-btn' sx={{ height: '100%', fontSize: '130%', fontWeight: '600' }} />
              </button>
            </div>
          )}
          
        </AccordionDetails>
      </Accordion>

      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              You have finished the questionnaire!
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Once you finish filling out your custom template, you
              can go back to the home screen and upload your excel!
              <button className='learn-more continue-btn' onClick={() => navigate('/home')}>
                Back to Home
                <EastIcon className='landing-learn-btn' sx={{ height: '100%', fontSize: '130%', fontWeight: '600' }} />
              </button>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Expenses;
