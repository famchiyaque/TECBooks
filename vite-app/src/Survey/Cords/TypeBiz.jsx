import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EastIcon from '@mui/icons-material/East'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField';
import HelpIcon from '@mui/icons-material/Help'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function TypeBiz({ currQuestion, setCurrQuestion, typeBiz, setTypeBiz, nameBiz, setNameBiz }) {
  const handleSetPage1 = () => {
    setCurrQuestion(currQuestion === 1 ? null : 1)
  }

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

  return (
    <div>
      <Accordion expanded={currQuestion === 1}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          onClick={() => handleSetPage1()}
        >
          <Typography component="span">1. Your Business</Typography>
          <Typography sx={{ color: 'gray', marginLeft: 'auto', paddingRight: '0.5rem' }}><i>{typeBiz}</i></Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: "left", paddingLeft: "10%" }}>

          <FormControl>
            <Typography component="span">What's your business called?</Typography>
            <TextField
              label="Name"
              type="text"
              variant='standard'
              value={nameBiz}
              onChange={(e) => setNameBiz(e.target.value)}
              sx={{ marginBottom: '1.5rem' }}
            />
          </FormControl>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', width: '100%' }}>
              <div style={{ flexBasis: '90%' }}>
                <Typography component="span">Which best describes your business?</Typography>
              </div>
              <div style={{ flexBasis: '10%', paddingTop: '0.5rem' }}>
                <HelpIcon sx={{ cursor: 'pointer' }} onClick={() => setOpen(true)} />
              </div>
            </div>

          <FormControl>

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={typeBiz}
              name="radio-buttons-group"
              sx={{ paddingLeft: '2rem' }}
              onChange={(event) => setTypeBiz(event.target.value)}
            >
              <FormControlLabel value="Product Based" control={<Radio />} label="Product Based" sx={{ fontSize: '80%' }} />
              <FormControlLabel value="Service Based" control={<Radio />} label="Service Based" />
              <FormControlLabel value="Rental Based" control={<Radio />} label="Rental Based" />
              <FormControlLabel value="Hybrid" control={<Radio />} label="Hybrid" />
              <FormControlLabel value="Other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>

          <div style={{ borderTop: 'solid gray 1px', marginTop: '1rem' }}>
            <button className='learn-more continue-btn' onClick={() => setCurrQuestion(2)}>
              Continue
              <EastIcon className='landing-learn-btn' sx={{ height: '100%', fontSize: '130%', fontWeight: '600' }} /> 
            </button>
          </div>
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
              What's the difference between a Product-Based, Service-Based, and Rental type business?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <b>Product based</b> means you offer a physical product that a customer
              can buy and keep forever. You had to either buy that same product
              or manufacture it yourself with raw materials. <br/><br/>
              <b>Service based</b> means there's no physical exchange of goods, but you're 
              rather giving someone something intangible that you didn't have to 
              physically create, like access to an online platform, or tax advice, 
              a unique experience like a massage, or fixing something for someone. <br/><br/>
              <b>Rental based</b> means you do work with physical items, but you only lend these
              to your customer, so you never really lose your iventory.
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default TypeBiz