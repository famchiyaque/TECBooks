import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import EastIcon from '@mui/icons-material/East'
import Property from './AssetInputs.jsx/Property'
import Machinery from './AssetInputs.jsx/Machinery'
import Tech from './AssetInputs.jsx/Tech'
import Inv from './AssetInputs.jsx/Inv'
import HelpIcon from '@mui/icons-material/Help'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

function Assets({ currQuestion, setCurrQuestion, hasAssets, setHasAssets, assets, setAssets }) {

  const handleSetPage4 = () => {
    setCurrQuestion(currQuestion === 4 ? null : 4);
  };

  const handleHasAssets = (val) => {
    const boolVal = val === "true"
    setHasAssets(boolVal)
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '30%',
    minWidth:'300px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Accordion expanded={currQuestion === 4}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          onClick={() => handleSetPage4()}
        >
          <Typography component="span">4. Assets and Inventory</Typography>
          <Typography sx={{ color: 'gray', marginLeft: 'auto', paddingRight: '0.5rem' }}><i>{!hasAssets ? "No Assets" : "Has Assets"}</i></Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: "left", paddingLeft: "5%" }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <FormControl sx={{ flexBasis: '90%' }}>
                <Typography component="span">Does your business depend on, own, rent, lease, or use any physical/digital assets or have inventory?</Typography>
                <RadioGroup row name="row-radio-buttons-group" onChange={(event) => handleHasAssets(event.target.value)}>
                  <FormControlLabel value="true" control={<Radio />} label="Yes" />
                  <FormControlLabel value="false" control={<Radio />} label="No" />
                </RadioGroup>
            </FormControl>
            <div style={{ flexBasis: '10%', paddingTop: '0.5rem' }}>
              <HelpIcon sx={{ cursor: 'pointer' }} onClick={() => setOpen(true)} />
            </div>
          </div>
          

          <Property assets={assets} setAssets={setAssets} hasAssets={hasAssets} />

          <Machinery assets={assets} setAssets={setAssets} hasAssets={hasAssets} />

          <Tech assets={assets} setAssets={setAssets} hasAssets={hasAssets} />

          {/* <Fixtures assets={assets} setAssets={setAssets} hasAssets={hasAssets} /> */}

          <Inv assets={assets} setAssets={setAssets} hasAssets={hasAssets} />

          <div style={{ borderTop: 'solid gray 1px', marginTop: '1rem' }}>
            <button className="learn-more continue-btn" onClick={() => setCurrQuestion(5)}>
              Continue
              <EastIcon className="landing-learn-btn" sx={{ height: "100%", fontSize: "130%", fontWeight: "600" }} />
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
              What's the difference between Owning, Renting, and Leasing with Assets?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <b>Owning</b> is when you outright buy the product or service, and only pay once to use
              that product or service. <br/><br/>
              <b>Renting</b> is when you pay continously to use or have access to the product or service,
              and leasing is the same just for longer terms.
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default Assets