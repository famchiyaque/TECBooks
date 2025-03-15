import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import EastIcon from '@mui/icons-material/East'

function Revenue({ currQuestion, setCurrQuestion, revenue, setRevenue }) {
  const handleSetPage2 = () => {
    setCurrQuestion(currQuestion === 2 ? null : 2)
  }

  // Mapping full descriptions to their shorter versions
  const revenueMap = {
    "Direct sales to customers (retail, e-commerce, B2C)": "B2C",
    "Contract-based work (consulting, B2B services)": "B2B",
    "Subscription model (SaaS, memberships)": "SaaS/Subs",
    "Advertising revenue (AdSense, affiliates)": "Ads",
    "Other": "Other"
  }

  const revenueOptions = Object.keys(revenueMap)

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target
    setRevenue((prev) => 
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    )
  }

  return (
    <div>
      <Accordion expanded={currQuestion === 2}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          onClick={() => handleSetPage2()}
        >
          <Typography component="span">2. Revenue Streams</Typography>
          <Typography sx={{ color: 'gray', marginLeft: 'auto', paddingRight: '0.5rem' }}>
            <i>{revenue.length > 0 ? revenue.map((item) => revenueMap[item]).join(", ") : "Incomplete"}</i>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'left', paddingLeft: '10%' }}>
          <Typography variant="subtitle1" sx={{ color: 'gray' }}>
            Check all that apply
          </Typography>
          <FormGroup>
            {revenueOptions.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    value={option}
                    checked={revenue.includes(option)}
                    onChange={handleCheckboxChange}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>

          <div style={{ borderTop: 'solid gray 1px', marginTop: '1rem' }}>
            <button className='learn-more continue-btn' onClick={() => setCurrQuestion(3)}>
              Continue
              <EastIcon className='landing-learn-btn' sx={{ height: '100%', fontSize: '130%', fontWeight: '600' }} /> 
            </button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Revenue
