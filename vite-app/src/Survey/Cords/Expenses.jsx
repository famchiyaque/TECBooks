import React, { useState, useEffect } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import EastIcon from '@mui/icons-material/East'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';


function Expenses({ currQuestion, setCurrQuestion, expenses, setExpenses }) {

    const handleSetPage5 = () => {
        setCurrQuestion(currQuestion === 5 ? null : 5);
    };

    const [desc, setDesc] = useState('Incomplete')

    const handleAddExpense = () => {
        setExpenses([...expenses, { name: "", frequency: "" }])
    }

    const handleRemoveExpense = (index) => {
        setExpenses(expenses.filter((_, i) => i !== index));
    };

    const handleChange = (index, field, value) => {
        setExpenses(prevExpenses =>
            prevExpenses.map((exp, i) =>
                i === index ? { ...exp, [field]: value } : exp
            )
        );
    }

    useEffect(() => {
        if (expenses.length <= 0) setDesc('Incomplete')
        else setDesc(expenses.length + ' expenses')
    }, [expenses])

    
  return (
    <div>
      <Accordion expanded={currQuestion === 5}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          onClick={() => handleSetPage5()}
        >
          <Typography component="span">5. Expenses</Typography>
          <Typography sx={{ color: 'gray', marginLeft: 'auto', paddingRight: '0.5rem' }}><i>{desc}</i></Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ textAlign: "left", paddingLeft: "10%" }}>

            <Typography component="span">
                Not including salaries, assets, or inventories, what are you business's expenses?
            </Typography>

            <div style={{ padding: '1rem 0 2rem 2rem' }}>
                    <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                        Add all you expenses here
                    </Typography>
                    <div>
                        <FormControl fullWidth>
                            {expenses.map((exp, index) => (
                                <div 
                                    key={index} 
                                    style={{ display: 'flex', width: '100%', gap: '1rem', alignItems: 'center', padding: '0.8rem 0' }}
                                >
                                    <FormControl variant='standard' sx={{ flexBasis: '40%' }}>
                                        {/* <InputLabel>Expense</InputLabel> */}
                                        <TextField
                                            label="Expense"
                                            type="text"
                                            variant='standard'
                                            value={exp.name}
                                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                                            // sx={{ flexBasis: '20%' }}
                                        />
                                    </FormControl>

                                    <FormControl variant="standard" sx={{ flexBasis: '40%' }}>
                                        <InputLabel>Frecuency</InputLabel>
                                        <Select
                                            value={exp.frequency}
                                            onChange={(e) => handleChange(index, 'frequency', e.target.value)}
                                        >
                                            <MenuItem value={"Weekly"}>Weekly</MenuItem>
                                            <MenuItem value={"Monthly"}>Monthly</MenuItem>
                                            <MenuItem value={"Quarterly"}>Quarterly</MenuItem>
                                            <MenuItem value={"Annually"}>Annually</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <DeleteForeverIcon 
                                        onClick={() => handleRemoveExpense(index)} 
                                        style={{ cursor: 'pointer', color: 'red' }} 
                                    />
                                </div>
                            ))}
                        </FormControl>
                    </div>

                    <Button sx={{ paddingLeft: '2rem' }} color="primary" onClick={handleAddExpense}>
                        + Add Expense
                    </Button>    
            </div>  

          <div style={{ borderTop: 'solid gray 1px', marginTop: '1rem' }}>
            <button className='learn-more continue-btn' onClick={() => setCurrQuestion(6)}>
              Continue
              <EastIcon className='landing-learn-btn' sx={{ height: '100%', fontSize: '130%', fontWeight: '600' }} /> 
            </button>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default Expenses