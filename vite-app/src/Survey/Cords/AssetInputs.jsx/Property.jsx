import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Property({ assets, setAssets, hasAssets }) {
    const [propertyVisible, setPropertyVisible] = useState(false);
    const [properties, setProperties] = useState([
        { type: "Owned", item: "Office Buildings", count: 1 }
    ]);

    const handleHasProperty = (val) => {
        setPropertyVisible(val === "true");
    };

    const handleChange = (index, field, value) => {
        if (field === "count") {
            value = isNaN(value) || value === "" ? 0 : parseInt(value, 10);
        }
        // console.log(value)
        const updatedProperties = [...properties];
        updatedProperties[index][field] = value;
        setProperties(updatedProperties);
    };

    const handleAddProperty = () => {
        setProperties([...properties, { type: "", item: "", count: 1 }]);
    };

    const handleRemoveProperty = (index) => {
        setProperties(properties.filter((_, i) => i !== index));
    };

    const propertyMap = [
        "Office Buildings", "Factories", "Warehouses",
        "Retail Stores", "Land", "Rental Properties", "Other Property Type"
    ];

    const finished = () => {
        setAssets(prevAssets =>
            prevAssets.map(asset =>
                asset.name === "property" ? { ...asset, data: properties } : asset
            )
        );
    };

    return (
        <div>
            {hasAssets && (
                <FormControl sx={{ padding: '1rem 0 0 1rem' }}>
                    <Typography component="span">
                        1. Does your business own, rent, or lease any properties such as the following? 
                        (Office buildings, factories, warehouses, retail stores, land, rental properties, other not mentioned)
                    </Typography>
                    <RadioGroup 
                        row 
                        name="row-radio-buttons-group" 
                        onChange={(event) => handleHasProperty(event.target.value)} 
                        sx={{ paddingLeft: '1rem' }}
                    >
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            )}

            {propertyVisible && (
                <div style={{ padding: '1rem 0 2rem 2rem' }}>
                    <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                        Add as many as you need
                    </Typography>
                    <div>
                        <FormControl fullWidth>
                            {properties.map((prop, index) => (
                                <div 
                                    key={index} 
                                    style={{ display: 'flex', width: '100%', gap: '1rem', alignItems: 'center', padding: '0.8rem 0' }}
                                >
                                    
                                    <FormControl variant="standard" sx={{ flexBasis: '25%' }}>
                                        <InputLabel>Type</InputLabel>
                                        <Select
                                            value={prop.type}
                                            onChange={(e) => handleChange(index, 'type', e.target.value)}
                                        >
                                            <MenuItem value={"Owned"}>Owned</MenuItem>
                                            <MenuItem value={"Rented"}>Rented</MenuItem>
                                            <MenuItem value={"Leased"}>Leased</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl variant='standard' sx={{ flexBasis: '40%' }}>
                                        <InputLabel>Property</InputLabel>
                                        <Select
                                            value={prop.property}
                                            onChange={(e) => handleChange(index, 'item', e.target.value)}
                                        >
                                            {propertyMap.map((option, id) => (
                                                <MenuItem key={id} value={option}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    <TextField
                                        label="Number"
                                        variant='standard'
                                        type="number"
                                        value={prop.count}
                                        onChange={(e) => handleChange(index, 'count', e.target.value)}
                                        sx={{ flexBasis: '20%' }}
                                    />
                                    <DeleteForeverIcon 
                                        onClick={() => handleRemoveProperty(index)} 
                                        style={{ cursor: 'pointer', color: 'red' }} 
                                    />
                                </div>
                            ))}
                        </FormControl>
                    </div>

                    <Button sx={{ paddingLeft: '2rem' }} color="primary" onClick={handleAddProperty}>
                        + Add Property Asset
                    </Button>  

                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <Button onClick={finished} variant="contained" color="primary" sx={{ marginLeft: 'auto' }}>
                            Set Properties
                        </Button>
                    </div>  
                </div>    
            )}
        </div>
    );
}

export default Property;
