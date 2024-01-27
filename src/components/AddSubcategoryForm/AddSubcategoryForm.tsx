import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Category } from '../../utils/types';
import useCreateSubcategory from '../../hooks/useCreateSubcategory';
import useCategories from '../../hooks/useCategories';

const AddSubcategoryForm: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [subcategory, setSubcategory] = useState<string>('');
  const navigate = useNavigate();
  const { mutate: createSubcategory } = useCreateSubcategory();
  const { data: categories, isLoading, isError } = useCategories();

  useEffect(() => {
    if (isError) { 
      console.error('Error fetching categories');
    }
  }, [isError]);

  const handleAdd = async () => {
    if (selectedCategory && subcategory)
    navigate ('/Home')
    {
      try {
        await createSubcategory({ categoryId: selectedCategory, subcategory: {
          name: subcategory,
          subcategories: undefined,
          id: ''
        } });
        console.log(`Subcategory: ${subcategory} added to Category ID: ${selectedCategory}`);
      } catch (error) {
        console.error('Error adding subcategory:', error);
      }
    }

    setSelectedCategory('');
    setSubcategory('');
  };

  const handleCancel = () => {
    navigate('/Home');
    setSelectedCategory('');
    setSubcategory('');
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as string)}
          displayEmpty
        >
          {isLoading ? (
            <MenuItem disabled>Loading...</MenuItem>
          ) : (
            categories && categories.map((cat: Category) => (
              <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
            ))
          )}
        </Select>
      </FormControl>
      
      <TextField
        label="Subcategory"
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Add
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleCancel}>
        Cancel
      </Button>
    </div>
  );
};

export default AddSubcategoryForm;
