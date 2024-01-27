/*import React, { useState, useEffect } from 'react';
import { Container, Card, CardContent, TextField, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Ad, Category, Subcategory } from '../utils/types';
import { useUpdateAd } from '../hooks';
import appAxios from '../services/AppAxios';
import { UpdateAd } from '.';

interface NewAdFormProps {
  ad: Ad;
  handleClose: () => void;
}

interface FormErrors {
  contact: string;
  category: string;
}

const NewAdForm: React.FC<NewAdFormProps> = ({ ad, handleClose }) => {
  const navigate = useNavigate();
  const updateAdMutation = useUpdateAd();

  const [imgUrl, setImgUrl] = useState(ad.imgUrl);
  const [title, setTitle] = useState(ad.title);
  const [description, setDescription] = useState(ad.description);
  const [contact, setContact] = useState(ad.contact);
  const [category, setCategory] = useState(ad.category || '');
  const [subcategory, setSubcategory] = useState(ad.subcategory || '');

  const [errors, setErrors] = useState<FormErrors>({
    contact: '',
    category: ''
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await appAxios.get('/categories');
        setCategories(response.data);
        const initialCategory = response.data.find((c: { name: string; }) => c.name === ad.category);
        if (initialCategory) {
          setSubcategories(initialCategory.subcategories);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, [ad.category]);

  const handleInputChange = (name: string, value: string) => {
    switch (name) {
      case 'imgUrl':
        setImgUrl(value);
        break;
      case 'title':
        setTitle(value);
        break;
      case 'description':
        setDescription(value);
        break;
      case 'contact':
        setContact(value);
        setErrors({ ...errors, contact: '' });
        break;
      case 'category':
        setCategory(value);
        setErrors({ ...errors, category: '' });
        const selectedCategory = categories.find(c => c.name === value);
        setSubcategories(selectedCategory?.subcategories || []);
        setSubcategory('');
        break;
      case 'subcategory':
        setSubcategory(value);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { contact: '', category: '' };

    if (!contact) {
      newErrors.contact = 'Please add contact information';
      isValid = false;
    }
    if (!category) {
      newErrors.category = 'Please choose a category';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const updatedAd = {
          ad: {
            id: ad.id,
            imgUrl,
            title,
            description,
            contact,
            category,
            subcategory
          }
        };
        updateAdMutation.mutate(updatedAd, {
          onSuccess: () => {
            handleClose();
            navigate('/Home');
          },
          onError: (error) => {
            console.error('Error updating ad:', error);
          }
        });
      } catch (error) {
        console.error('Error submitting ad:', error);
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
            value={imgUrl}
            onChange={(e) => handleInputChange('imgUrl', e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Title"
            name="title"
            value={title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Description"
            name="description"
            multiline
            rows={4}
            value={description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            margin="normal"
            variant="outlined"
          />
          <TextField
            error={Boolean(errors.contact)}
            fullWidth
            label="Contact"
            name="contact"
            value={contact}
            onChange={(e) => handleInputChange('contact', e.target.value)}
            margin="normal"
            variant="outlined"
            helperText={errors.contact}
          />
          <FormControl fullWidth margin="normal" error={Boolean(errors.category)}>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={category}
              onChange={(e) => handleInputChange('category', e.target.value)}
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
                value={subcategory}
                onChange={(e) => handleInputChange('subcategory', e.target.value)}
                label="Subcategory"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {subcategories.map((sub) => (
                  <MenuItem key={sub.id} value={sub.name}>{sub.name}</MenuItem>
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
            Update Ad
          </Button>
        </form>
      </CardContent>
    </Card>
  </Container>
  );
};

export default NewAdForm;*/
