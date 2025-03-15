import * as React from 'react'
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
import FormLabel from '@mui/material/FormLabel'

function TypeBiz({ currQuestion, setCurrQuestion, typeBiz, setTypeBiz }) {
  const handleSetPage1 = () => {
    setCurrQuestion(currQuestion === 1 ? null : 1)
  }

  return (
    <div>
      <Accordion expanded={currQuestion === 1}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          onClick={() => handleSetPage1()}
        >
          <Typography component="span">1. Business Type</Typography>
          <Typography sx={{ color: 'gray', marginLeft: 'auto', paddingRight: '0.5rem' }}><i>{typeBiz}</i></Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: "left", paddingLeft: "10%" }}>

          <FormControl>
          <Typography component="span">Which best describes your business?</Typography>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={typeBiz}
              name="radio-buttons-group"
              sx={{ paddingLeft: '2rem' }}
              onChange={(event) => setTypeBiz(event.target.value)}
            >
              <FormControlLabel value="Sole Proprietor" control={<Radio />} label="Sole Proprietor" sx={{ fontSize: '80%' }} />
              <FormControlLabel value="Service Based" control={<Radio />} label="Service Based" />
              <FormControlLabel value="Product Based/Manufacturing" control={<Radio />} label="Product Based/Manufacturing" />
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
    </div>
  )
}

export default TypeBiz