import React, { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EastIcon from '@mui/icons-material/East'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';

function Revenue({ currQuestion, setCurrQuestion, revenue, setRevenue }) {
  const handleSetPage2 = () => {
    setCurrQuestion(currQuestion === 2 ? null : 2)
  }

  const [desc, setDesc] = useState('Incomplete')

  const handleAddRevenue = () => {
    setRevenue([...revenue, { type: "Product", name: "" }])
  }

  const handleRemoveRevenue = (index) => {
    setRevenue(revenue.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    setRevenue(prevRevenue =>
        prevRevenue.map((rev, i) =>
            i === index ? { ...rev, [field]: value } : rev
        )
    );
  }

  useEffect(() => {
      if (revenue.length <= 0) setDesc('Incomplete')
      else setDesc(`${revenue.length} revenue streams`)
  }, [revenue])

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
          <Typography sx={{ color: 'gray', marginLeft: 'auto', paddingRight: '0.5rem' }}><i>{desc}</i></Typography>

        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: 'left', paddingLeft: '10%' }}>
          <div style={{ padding: '0 0 2rem 0' }}>
                <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                    Add all the different products/services you generate income from
                </Typography>
                <div>
                    <FormControl fullWidth>
                        {revenue.map((rev, index) => (
                            <div 
                              key={index} 
                              style={{ display: 'flex', width: '100%', gap: '1rem', alignItems: 'center', padding: '0.8rem 0' }}
                            >
                                <FormControl variant="standard" sx={{ flexBasis: '30%' }}>
                                    <InputLabel>Product or Service</InputLabel>
                                    <Select
                                        value={rev.type}
                                        onChange={(e) => handleChange(index, 'type', e.target.value)}
                                    >
                                        <MenuItem value={"Product"}>Product</MenuItem>
                                        <MenuItem value={"Service"}>Service</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl variant='standard' sx={{ flexBasis: '30%' }}>
                                  {/* <InputLabel>revense</InputLabel> */}
                                  <TextField
                                      label="Name"
                                      type="text"
                                      variant='standard'
                                      value={rev.name}
                                      onChange={(e) => handleChange(index, 'name', e.target.value)}
                                      // sx={{ flexBasis: '20%' }}
                                  />
                                </FormControl>

                                {/* <FormControl variant="standard" sx={{ flexBasis: '20%' }}>
                                    <InputLabel>Track</InputLabel>
                                    <Select
                                        value={rev.track}
                                        onChange={(e) => handleChange(index, 'track', e.target.value)}
                                    >
                                        <MenuItem value={"by unit"}>by unit</MenuItem>
                                        <MenuItem value={"by total"}>by total</MenuItem>
                                    </Select>
                                </FormControl> */}

                                <DeleteForeverIcon 
                                    onClick={() => handleRemoveRevenue(index)} 
                                    style={{ cursor: 'pointer', color: 'red' }} 
                                />
                                </div>
                            ))}
                    </FormControl>
                </div>

                <Button sx={{ paddingLeft: '2rem' }} color="primary" onClick={handleAddRevenue}>
                    + Add Revenue
                </Button>    
            </div>  

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
