import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function Inventory({ assets, setAssets, hasAssets }) {
    const [inventoryVisible, setInventoryVisible] = useState(false);
    const [inventory, setInventory] = useState([{ type: "Raw Materials", frequency: "Weekly", track: "total", fluctuate: true }]);

    const handleHasInventory = (val) => {
        setInventoryVisible(val === "true");
    };

    const handleChange = (index, field, value) => {
        const updatedInventory = [...inventory];
        updatedInventory[index][field] = value;
        setInventory(updatedInventory);
    };

    const handleAddInventory = () => {
        setInventory([
            ...inventory,
            { type: "", frequency: "", track: "", fluctuate: false }
        ]);
    };

    const handleRemoveInventory = (index) => {
        setInventory(inventory.filter((_, i) => i !== index));
    };

    const finished = () => {
        setAssets(prevAssets =>
            prevAssets.map(asset =>
                asset.name === "inventory" ? { ...asset, data: inventory } : asset
            )
        );
    };

    const inventoryCategories = [
        "Raw Materials", "Work-in-progress goods", "Finished Goods",
        "Retail Stock", "Spare Parts & Supplies", "Other inventory type"
    ];

    const purchaseFrequencies = ["Weekly", "Monthly", "Quarterly", "Annually"];

    useEffect(() => {
        console.log(inventory);
    }, [inventory]);

    return (
        <div>
            {hasAssets && (
                <FormControl sx={{ padding: '1rem 0 0 1rem' }}>
                    <Typography component="span">
                        5. Does your business store and sell physical products? 
                        (Raw Materials, Work-in-progress goods, Finished Goods, Retail Stock, Spare Parts & Supplies, other)
                    </Typography>
                    <RadioGroup 
                        row 
                        name="inventory-radio-group" 
                        onChange={(event) => handleHasInventory(event.target.value)} 
                        sx={{ paddingLeft: '1rem' }}
                    >
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
            )}

            {inventoryVisible && (
                <div style={{ padding: '1rem 0 2rem 2rem' }}>
                    <Typography variant="subtitle1" sx={{ color: 'gray' }}>
                        Add as many as you need
                    </Typography>
                    <div>
                        <FormControl fullWidth>
                            {inventory.map((item, index) => (
                                <div 
                                    key={index} 
                                    style={{ display: 'flex', width: '100%', gap: '1rem', alignItems: 'center', padding: '1rem 0' }}
                                >
                                                                        
                                    {/* Type Select */}
                                    <FormControl variant="standard" sx={{ flexBasis: '30%' }}>
                                        <InputLabel>Inventory Type</InputLabel>
                                        <Select
                                            value={item.type}
                                            onChange={(e) => handleChange(index, 'type', e.target.value)}
                                        >
                                            {inventoryCategories.map((option, id) => (
                                                <MenuItem key={id} value={option}>{option}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {/* Frequency Select */}
                                    <FormControl variant="standard" sx={{ flexBasis: '20%' }}>
                                        <InputLabel>Frequency</InputLabel>
                                        <Select
                                            value={item.frequency}
                                            onChange={(e) => handleChange(index, 'frequency', e.target.value)}
                                        >
                                            {purchaseFrequencies.map((freq, id) => (
                                                <MenuItem key={id} value={freq}>{freq}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>

                                    {/* Tracking Select */}
                                    <FormControl variant="standard" sx={{ flexBasis: '20%' }}>
                                        <InputLabel>Track Cost</InputLabel>
                                        <Select
                                            value={item.track}
                                            onChange={(e) => handleChange(index, 'track', e.target.value)}
                                        >
                                            <MenuItem value="per unit">Per Unit</MenuItem>
                                            <MenuItem value="total">Total Cost</MenuItem>
                                        </Select>
                                    </FormControl>

                                    {/* Fluctuation Yes/No */}
                                    <FormControl variant="standard" sx={{ flexBasis: '15%' }}>
                                        <InputLabel>Fluctuates?</InputLabel>
                                        <Select
                                            value={item.fluctuate}
                                            onChange={(e) => handleChange(index, 'fluctuate', e.target.value === "true")}
                                        >
                                            <MenuItem value="true">Yes</MenuItem>
                                            <MenuItem value="false">No</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <DeleteForeverIcon 
                                        onClick={() => handleRemoveInventory(index)} 
                                        style={{ cursor: 'pointer', color: 'red' }} 
                                    />
                                </div>
                            ))}
                        </FormControl>
                    </div>

                    <Button sx={{ paddingLeft: '2rem' }} color="primary" onClick={handleAddInventory}>
                        + Add Inventory Item
                    </Button>  
                    <div style={{ width: '100%', textAlign: 'right' }}>
                        <Button onClick={finished} variant="contained" color="primary" sx={{ marginLeft: 'auto' }}>
                            Set Inventory
                        </Button>
                    </div>   
                </div>    
            )}
        </div>
    );
}

export default Inventory;
