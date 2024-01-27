import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, TextField, Button, FormControl, InputLabel, Select, MenuItem, FormHelperText, SelectChangeEvent } from '@mui/material';
import appAxios from '../../services/AppAxios';
import { Category, Subcategory } from '../../utils/types';
import useCreateAd from '../../hooks/useCreateAd';
import { useNavigate } from 'react-router-dom';

interface AdFormData {
  id: string;
  title: string;
  imgUrl: string;
  description: string;
  contact: string;
  category: string;
  subcategory: string;

}

interface FormErrors {
  contact: string;
  category: string;
}

const NewAdForm: React.FC = () => {
  const [formData, setFormData] = useState<AdFormData>({
    id: '',
    title : '',
    imgUrl: '',
    description: '',
    contact: '',
    category: '',
    subcategory: '',

  });

  const [errors, setErrors] = useState<FormErrors>({
    contact: '',
    category: ''
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const { mutate: createAd } = useCreateAd(); 


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await appAxios.get('/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string | undefined; value: unknown }>) => {
    const name = e.target.name as keyof AdFormData;
    const value = e.target.value as string;
    setFormData({ ...formData, [name]: value });

    if (name === 'contact' || name === 'category') {
      setErrors({ ...errors, [name]: '' });
    }

    if (name === 'category') {
      const selectedCategory = categories.find(category => category.name === value);
      setSubcategories(selectedCategory?.subcategories || []);
      setFormData(prevFormData => ({ ...prevFormData, subcategory: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: FormErrors = { contact: '', category: '' };
    let isValid = true;

    if (!formData.contact) {
      newErrors.contact = 'Please add contact information';
      isValid = false;
    }
    if (!formData.category) {
      newErrors.category = 'Please choose a category';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await createAd(formData); 
        navigate('/Home');

        window.location.reload();
      } catch (error) {
        console.error('Error creating ad:', error);
      }
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
      <Card variant="outlined">
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Image URL"
              name="imgUrl"
              value={formData.imgUrl}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
            />
            <TextField
              error={Boolean(errors.contact)}
              fullWidth
              label="Contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              helperText={errors.contact}
            />
            <FormControl fullWidth margin="normal" error={Boolean(errors.category)}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange as unknown as (event: SelectChangeEvent<string>) => void}
                label="Category"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{errors.category}</FormHelperText>
            </FormControl>
            {subcategories.length > 0 && (
              <FormControl fullWidth margin="normal">
                <InputLabel>Subcategory</InputLabel>
                <Select
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleInputChange as unknown as (event: SelectChangeEvent<string>) => void}
                  label="Subcategory"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {subcategories.map((subcategory) => (
                    <MenuItem key={subcategory.id} value={subcategory.name}>{subcategory.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              )}
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              style={{ marginTop: '1rem' }}
            >
              Add Ad
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default NewAdForm;
