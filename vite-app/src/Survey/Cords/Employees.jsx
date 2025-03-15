import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import EastIcon from "@mui/icons-material/East";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import EngineeringIcon from "@mui/icons-material/Engineering";

function Employees({
  currQuestion,
  setCurrQuestion,
  hasEmployees,
  setHasEmployees,
  numEmployees,
  setNumEmployees,
  empProduction,
  setEmpProduction,
  empAdmin,
  setEmpAdmin,
}) {
  const handleSetPage3 = () => {
    setCurrQuestion(currQuestion === 3 ? null : 3);
  };

  const [desc, setDesc] = useState("");

  // Ensure numeric values
  const numericNumEmployees = Number(numEmployees);
  const numericEmpAdmin = Number(empAdmin);
  const numericEmpProduction = Number(empProduction);

  // Handle description update
  useEffect(() => {
    if (!hasEmployees) {
      setDesc("No employees");
    } else if (numericEmpAdmin === 0 && numericEmpProduction === 0) {
      setDesc("Incomplete");
    } else if (numericEmpAdmin + numericEmpProduction !== numericNumEmployees) {
      setDesc("Wrong # Employees");
    } else {
      setDesc(`${numEmployees} employees`);
    }
  }, [hasEmployees, numericNumEmployees, numericEmpAdmin, numericEmpProduction]);

  const handleHasEmployees = (val) => {
    const boolVal = val === "true";
    setHasEmployees(boolVal);
  };

  return (
    <div>
      <Accordion expanded={currQuestion === 3}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          onClick={handleSetPage3}
        >
          <Typography component="span">3. Employees</Typography>
          <Typography sx={{ color: "gray", marginLeft: "auto", paddingRight: "0.5rem" }}>
            <i>{desc}</i>
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: "left", paddingLeft: "10%" }}>
          
          <FormControl>
            <Typography component="span">Do you have employees?</Typography>
            <RadioGroup row name="row-radio-buttons-group" onChange={(event) => handleHasEmployees(event.target.value)}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>

          {hasEmployees && (
            <Box sx={{ "& > :not(style)": { m: 1 } }}>
              <TextField
                id="input-with-icon-textfield"
                label="How Many?"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <EngineeringIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                variant="standard"
                type="number"
                inputProps={{ min: 0 }}
                onChange={(event) => setNumEmployees(Number(event.target.value))}
              />
            </Box>
          )}

          {numericNumEmployees > 0 && (
            <div>
              {/* Admin Employees Slider */}
              <Typography component="span">How many of your employees are administrative?</Typography>
              <Box sx={{ width: "80%", display: "flex", alignItems: "center" }}>
                <Typography sx={{ minWidth: 30 }}>0</Typography>
                <Slider
                  min={0}
                  max={numericNumEmployees - numericEmpProduction}
                  value={numericEmpAdmin}
                  onChange={(event, value) => setEmpAdmin(value)}
                  aria-label="Admin Employees"
                  valueLabelDisplay="auto"
                />
                <Typography sx={{ minWidth: 30, paddingLeft: '1rem' }}>{numericNumEmployees - numericEmpProduction}</Typography>
              </Box>

              {/* Production Employees Slider */}
              <Typography component="span">How many of your employees are in production?</Typography>
              <Box sx={{ width: "80%", display: "flex", alignItems: "center" }}>
                <Typography sx={{ minWidth: 30 }}>0</Typography>
                <Slider
                  min={0}
                  max={numericNumEmployees - numericEmpAdmin}
                  value={numericEmpProduction}
                  onChange={(event, value) => setEmpProduction(value)}
                  aria-label="Production Employees"
                  valueLabelDisplay="auto"
                />
                <Typography sx={{ minWidth: 30, paddingLeft: '1rem' }}>{numericNumEmployees - numericEmpAdmin}</Typography>
              </Box>
            </div>
          )}

          <div style={{ borderTop: 'solid gray 1px', marginTop: '1rem' }}>
            <button className="learn-more continue-btn" onClick={() => setCurrQuestion(4)}>
              Continue
              <EastIcon className="landing-learn-btn" sx={{ height: "100%", fontSize: "130%", fontWeight: "600" }} />
            </button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default Employees;
