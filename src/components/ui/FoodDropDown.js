import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function FoodDropdown() {
  const [food, setFood] = React.useState('');

  const handleChange = (event) => {
    setFood(event.target.value);
  };

  const categories = [
    "VEGETABLES",
    "FRUITS",
    "MEAT",
    "SNACKS",
    "DRINKS"
  ]

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="food-category-label">Food Category</InputLabel>
        <Select
          labelId="food-category-label"
          id="food-category-label-select"
          value={food}
          label="Food Category"
          onChange={handleChange}
        >
            {categories.map((category) => (
                <MenuItem
                key={category}
                value={category}
                >
                    {category}
                </MenuItem>
            ))}
        </Select>
      </FormControl>
    </Box>
  );
}